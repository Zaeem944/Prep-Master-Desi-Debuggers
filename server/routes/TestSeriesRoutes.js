const express = require('express');
const router = express.Router();
const {  createTestSeries, sendUnapproved , sendApproved, checkPurchased, purchaseTest, approveTest } = require('../controllers/TestSeriesController');

router.post('/createTest', createTestSeries);

router.get('/sendUnapproved', sendUnapproved);

router.get('/sendApproved', sendApproved);

router.get('/checkPurchased' ,checkPurchased);

router.post('/purchaseTest', purchaseTest);

router.put('/approveTest/:title', approveTest);

module.exports = router;