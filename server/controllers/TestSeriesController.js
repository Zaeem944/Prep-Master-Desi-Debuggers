const TestSeries = require('../models/TestSeriesModel'); // Adjust the path to your model

// Controller function to create a new test series
const createTestSeries = async (req, res) => {
    const { title, questions, price, purchasedBy } = req.body;

    // Create a new instance of the TestSeries model
    const newTestSeries = new TestSeries({
        title,
        questions,
        price,
        purchasedBy,
    });

    try {
        // Save the new test series to the database
        await newTestSeries.save();
        res.status(201).json(newTestSeries); // Send success response with the created test series
    } catch (error) {
        res.status(409).json({ message: error.message }); // Send error response if there's a problem
    }
};


const sendUnapproved = async (req, res) => {
    try {
        // Fetch all TestSeries documents where isApproved is false
        const unapprovedTestSeries = await TestSeries.find({ isApproved: false });
        
        // Send the result back to the client
        res.status(200).json(unapprovedTestSeries);
    } catch (error) {
        // Handle errors
        console.error('Error fetching unapproved test series:', error);
        res.status(500).json({ message: 'Failed to fetch unapproved test series' });
    }
};
const sendApproved = async (req, res) => {
    try {
        // Fetch all TestSeries documents where isApproved is false
        const unapprovedTestSeries = await TestSeries.find({ isApproved: true });
        
        // Send the result back to the client
        res.status(200).json(unapprovedTestSeries);
    } catch (error) {
        // Handle errors
        console.error('Error fetching unapproved test series:', error);
        res.status(500).json({ message: 'Failed to fetch unapproved test series' });
    }
};

const checkPurchased = async (req, res) => {
    const { email } = req.body; // Extract the name from the request body

    if (!email) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        // Query for TestSeries where purchasedBy contains the given name
        const purchasedTestSeries = await TestSeries.find({ purchasedBy: email });
        
        // Send the result back to the client
        res.status(200).json(purchasedTestSeries);
    } catch (error) {
        // Handle errors
        console.error('Error fetching purchased test series:', error);
        res.status(500).json({ message: 'Failed to fetch purchased test series' });
    }
};
module.exports = { createTestSeries, sendUnapproved , sendApproved, checkPurchased};