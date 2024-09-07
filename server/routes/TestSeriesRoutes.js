const express = require('express');
const router = express.Router();
const {  createTestSeries, sendUnapproved , sendApproved, checkPurchased, purchaseTest, approveTest, getTestDetails } = require('../controllers/TestSeriesController');

router.post('/createTest', createTestSeries);

router.get('/sendUnapproved', sendUnapproved);

router.get('/sendApproved', sendApproved);

router.post('/checkPurchased' ,checkPurchased);

router.post('/purchaseTest', purchaseTest);

router.put('/approveTest/:title', approveTest);

router.post('/getTestDetails', getTestDetails);

module.exports = router;