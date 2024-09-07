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

module.exports = { createTestSeries };