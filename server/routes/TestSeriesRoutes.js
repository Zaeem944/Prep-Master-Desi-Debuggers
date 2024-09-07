const express = require('express');
const router = express.Router();
const {  createTestSeries, sendUnapproved , sendApproved, checkPurchased, purchaseTest, approveTest, getTestDetails , submitTest, addReview} = require('../controllers/TestSeriesController');

router.post('/createTest', createTestSeries);

router.get('/sendUnapproved', sendUnapproved);

router.get('/sendApproved', sendApproved);

router.post('/checkPurchased' ,checkPurchased);

router.post('/purchaseTest', purchaseTest);

router.put('/approveTest/:title', approveTest);

router.post('/getTestDetails', getTestDetails);

router.post('/submitTest', submitTest);

router.post('/addReview', addReview);

module.exports = router;