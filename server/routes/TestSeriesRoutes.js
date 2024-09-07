const express = require('express');
const router = express.Router();
const {  createTestSeries, sendUnapproved } = require('../controllers/TestSeriesController');

router.post('/createTest', createTestSeries);

router.get('/sendUnapproved', sendUnapproved);


module.exports = router;