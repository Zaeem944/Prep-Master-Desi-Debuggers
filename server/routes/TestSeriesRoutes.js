const express = require('express');
const router = express.Router();
const {  createTestSeries, sendUnapproved , sendApproved, checkPurchased, purchaseTest } = require('../controllers/TestSeriesController');

router.post('/createTest', createTestSeries);

router.get('/sendUnapproved', sendUnapproved);

router.get('/sendApproved', sendApproved);

router.get('/checkPurchased' ,checkPurchased);

router.post('/purchaseTest', purchaseTest);

module.exports = router;