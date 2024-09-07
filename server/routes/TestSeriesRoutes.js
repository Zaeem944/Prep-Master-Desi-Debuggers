const express = require('express');
const router = express.Router();
const {  createTestSeries, sendUnapproved , sendApproved, checkPurchased } = require('../controllers/TestSeriesController');

router.post('/createTest', createTestSeries);

router.get('/sendUnapproved', sendUnapproved);

router.get('/sendApproved', sendApproved);

router.get('/checkPurchased' ,checkPurchased);

module.exports = router;