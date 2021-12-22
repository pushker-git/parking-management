const db = require("../models");
const ParkingLot = db.parkinglot;
const { ValidationError, CustomError } = require('../error/error');
const SpotStatusEnum = require('../constaint/spotStatusEnum');

async function createParking(parkingLotData) {

    let transaction;
    try {

        transaction = await db.sequelize.transaction();

        parkingLotData.level = 1; // Can be used for multi-level parking

        // Create Parking Lot
        const newParkingLot = await db.parkinglot.create(parkingLotData, {
            transaction: transaction
        });

        //Create Parking Levels
        const parkingLevelDetails = {
            parkinglotId: newParkingLot.id,
            level: 1,
            capacity: parkingLotData.capacity
        };
        const newParkingLevel = await db.parkinglevel.create(parkingLevelDetails, {
            transaction: transaction
        });

        // Create Parking Spots
        let parkingSpots = [];
        for (let i = 0; i < parkingLotData.capacity; i++) {
            parkingSpots.push({
                parkingId: newParkingLevel.id,
                label: `${newParkingLot.id} - ${newParkingLevel.id}-${newParkingLevel.level}-${i+1}`,
                status: SpotStatusEnum.Available
            })
        }

        await db.spots.bulkCreate(parkingSpots, {
            transaction: transaction
        });

        await transaction.commit()

        return newParkingLot.get();

    } catch (error) {
        if (transaction) {
            await transaction.rollback()
        }
        // HANDLE THE ERROR AS YOU MANAGE IN YOUR PROJECT
        console.error('Error', error);
        throw new CustomError(`Something went wrong, unable to create Parking lot`);

    }
}

module.exports = {
    createParking
}
