const SpotService = require('../services/parkingspot.service');
const { SearlizeError } = require('../error/error');
async function updateStatus(req, res, next) {
    try {
        const newParkingSpotStatus = req.body.status;
        const spotId = req.params.spotId;

        const response = await SpotService.changeStatus(spotId, newParkingSpotStatus);
        // Return a response to client.
        return res.json({ status: response });
    } catch (ex) {
        return res.status(400).send(SearlizeError.getMessage(ex));
    }
}

async function getAvailableSpot(req, res, next) {
    try {
        const parkingId = req.params.parkingId;

        const spot = await SpotService.getAvailableSpot(parkingId);

        // Return a response to client.
        return res.json({ ...spot });
    } catch (ex) {
        return res.status(400).send(SearlizeError.getMessage(ex));
    }
}

// reserve a next available parking slot by parkingId and vechile Id
async function reserveSpot(req, res, next) {
    try {
        const parkingId = req.params.parkingId;
        const vehicleId = req.body.vehicleId;

        const  newTransaction  = await SpotService.reserveSpot(parkingId, vehicleId);

        // Return a response to client.
        return res.json({ ...newTransaction });
    } catch (ex) {
        return res.status(400).send(SearlizeError.getMessage(ex));
    }
}

// release a parking slot if reserved by vechileId, spotId
async function releaseSpot(req, res, next) {
    try {
        const vehicleId = req.body.vehicleId;

        const bookingRecord = await SpotService.releaseSpot(vehicleId);

        // Return a response to client.
        return res.json({ ...bookingRecord });
    } catch (ex) {
        return res.status(400).json(SearlizeError.getMessage(ex));
    }
}


module.exports = {
    updateStatus,
    releaseSpot,
    reserveSpot,
    getAvailableSpot
};