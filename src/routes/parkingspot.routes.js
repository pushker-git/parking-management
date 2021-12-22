const express = require('express');
const router = express.Router();
const parkingSpotController = require('../controller/parkingspot.controller');


// Book a parking spot if available , by parking Id & vechileId
router.post('/:parkingId/reserve', parkingSpotController.reserveSpot);

// release a parking spot if booked , by vechileId
router.post('/:parkingId/relese', parkingSpotController.releaseSpot);

// return available spot in a parking
router.get('/:parkingId/spot', parkingSpotController.getAvailableSpot);

// Change the status of parking to available, maintaince mode
router.put('/:parkingId/spot/:spotId', parkingSpotController.updateStatus);




module.exports = router
