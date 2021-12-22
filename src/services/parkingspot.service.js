const db = require("../models");
const parkingSpotDB = db.spots;
const { ValidationError, CustomError } = require('../error/error');
const SpotStatusEnum = require('../constaint/spotStatusEnum');
const { status } = require("express/lib/response");
const spotStatusEnum = require("../constaint/spotStatusEnum");
const { pricePerHouse } = require('../constaint/priceStructure');



function calculateParkingCharge(startTime, endTime = new Date()) {
    let hours = (endTime.getTime() - startTime.getTime()) / 3600000;
    return Math.ceil(hours) * pricePerHouse;
}

/*
    Public methods
*/
async function changeStatus(spotId, newStatus) {

    try {
        if (newStatus === SpotStatusEnum.Booked) {
            throw new CustomError('Cant set status to booked');
        }
        let spot = await db.spots.findOne({ where: { id: spotId } });

        if (!spot) {
            throw new CustomError('Spot is not present');
        } else if (spot.status === SpotStatusEnum.Booked) {
            throw new CustomError('Spot is in reserved state, please try later');
        }
        return await db.spots.update({
            status: SpotStatusEnum[newStatus]
        }, {
            where: { id: spotId }
        });

    } catch (error) {
        // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
        console.error('Error', error);
        throw error;
    }
}


async function getAvailableSpot(parkingId) {

    try {
        let spot = await db.spots.findOne({
            where: {
                parkingId: parkingId, status: SpotStatusEnum.Available,

            },
            order: ['id']
        });
        return spot ? spot.get() : null;

    } catch (error) {
        // HANDLE THE ERROR , logging
        console.error('Error', error);
        throw error;
    }
}


async function reserveSpot(parkingId, vehicleId) {

    let bookingRecord = await db.reservation.findOne({ where: { vehicleId: vehicleId, exitDateTime: null }, order: ['id'] });

    if (bookingRecord) {
        throw new CustomError('this vehicleId is already parked')
    }

    let transaction;
    try {
        transaction = await db.sequelize.transaction();

        let avilableSpot = await db.spots.findOne({
            where: {
                parkingId: parkingId, status: SpotStatusEnum.Available
            },
            transaction: transaction,
            order: ['id']
        });

        if (!avilableSpot) {
            throw new CustomError('No spots available');
        }
        avilableSpot.status = spotStatusEnum.Booked;
        await avilableSpot.save();

        let reservationData = {
            spotId: avilableSpot.id,
            vehicleId: vehicleId,
            entryDateTime: new Date()
        }
        // Create a entry in reservation table
        const newTransaction = await db.reservation.create(reservationData, { transaction: transaction });
        await transaction.commit();

        //TODO  Emit Events to handle Globale Available Parking spot, reduce the count

        return newTransaction.get();

    } catch (error) {
        if (transaction) {
            await transaction.rollback()
        }
        // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
        console.error('Error', error);
        throw error;

    }
}


async function releaseSpot(vehicleId) {
    let bookingRecord = await db.reservation.findOne({ where: { vehicleId: vehicleId, exitDateTime: null }, order: ['id'] });

    if (!bookingRecord) {
        throw new CustomError(`there no booking active for this vehicle id`);
    }

    let transaction;
    try {

        transaction = await db.sequelize.transaction();

        bookingRecord.exitDateTime = new Date();
        bookingRecord.fee = calculateParkingCharge(bookingRecord.entryDateTime, bookingRecord.exitDateTime);

        await bookingRecord.save();

        //Update parking spot status to booked
        await db.spots.update({ status: spotStatusEnum.Available }, { where: { id: bookingRecord.spotId } }, {
            transaction: transaction
        });

        await transaction.commit();

        //TODO  Emit Events to handle Globale Available Parking spot -- Increase  the count

        return bookingRecord.get();

    } catch (error) {
        if (transaction) {
            await transaction.rollback()
        }
        // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
        console.error('Error', error);
        throw new CustomError(`Something went wrong, unable to release a spot`);

    }
}


module.exports = {
    changeStatus,
    getAvailableSpot,
    reserveSpot,
    releaseSpot
}