const express = require('express');
const router = express.Router();
const parkingLotController = require('../controller/parkinglot.controller');
const { verifyToken } = require("../middleware/auth.middleware");



router.post('/', verifyToken, parkingLotController.create);


module.exports = router