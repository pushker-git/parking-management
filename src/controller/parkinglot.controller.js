const ParkingService = require('../services/parkinglot.service');
const { SearlizeError } = require('../error/error');


async function create(req, res, next) {
  try {
    const parkingLotDTO = req.body;

    console.log('parkingLotDTO', req.body)

    const result = await ParkingService.createParking(parkingLotDTO);

    // Return a response to client.
    return res.json({ ...result });
  } catch (ex) {
    return res.status(400).send(SearlizeError.getMessage(ex));
  }
}


module.exports = {
  create
};