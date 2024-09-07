const express = require('express');
const router = express.Router();
const {  createTestSeries } = require('../controllers/TestSeriesController');

router.post('/createTest', createTestSeries);


module.exports = router;