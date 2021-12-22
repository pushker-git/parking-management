const parkingLot = require('./parkinglot.routes');
const parkingSpot = require('./parkingspot.routes');

var router = require('express').Router();

// split up route handling
router.use('/v1/parkinglot', parkingLot);
router.use('/v1/parking', parkingSpot);

module.exports = router;