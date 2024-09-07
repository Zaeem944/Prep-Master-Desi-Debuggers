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


const purchaseTest = async (req, res) => {
    const { email, title } = req.body;

    try {
        const updatedTestSeries = await TestSeries.findOneAndUpdate(
            { title: title }, // Query to find the test series by title
            { $addToSet: { purchasedBy: email } }, // Update operation to add email to purchasedBy
            { new: true } // Return the updated document
        );

        if (!updatedTestSeries) {
            return res.status(404).json({ message: 'Test series not found' });
        }


        
        res.status(200).json(updatedTestSeries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const approveTest = async (req, res) => {
    console.log("req is: ", req.params);
    const { title } = req.params;

    try {
        // Find the test series by ID and update the isApproved field
        console.log("title", title);
        const updatedTestSeries = await TestSeries.findOne({ title: title });
        if (!updatedTestSeries) {
            return res.status(404).json({ message: 'Test series not found' });
        }

        updatedTestSeries.isApproved = true;
        await updatedTestSeries.save();

        
        res.status(200).json(updatedTestSeries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getTestDetails = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        // Find the test series by title
        const data = await TestSeries.findOne({ title: title });

        if (!data) {
            return res.status(404).json({ message: 'Test series not found' });
        }

        // Map the necessary fields (title and reviews)
        const result = {
            title: data.title,
            reviews: data.reviews
        };

        // Return the mapped data
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const submitTest = async (req, res) => {
    try {
        const { title, attempted } = req.body;
        
        const updatedTest = await TestSeries.findOneAndUpdate(
            { title: title },
            { 
                $push: { attempted: attempted }
            },
            { new: true, runValidators: true }
        );

        if (!updatedTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json(updatedTest);
    } catch (error) {
        console.error('Error submitting test:', error);
        res.status(500).json({ message: "Error submitting test", error: error.message });
    }
};


const addReview = async (req, res) => {
    const { title, review } = req.body; // Extract title and review from the request body

    if (!title || !review) {
        return res.status(400).json({ message: 'Title and review are required' });
    }

    try {
        const updatedTestSeries = await TestSeries.findOneAndUpdate(
            { title: title }, // Query to find the test series by title
            { $push: { reviews: review } }, // Add the new review to the reviews array
            { new: true } // Return the updated document
        );

        if (!updatedTestSeries) {
            return res.status(404).json({ message: 'Test series not found' });
        }

        res.status(200).json(updatedTestSeries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTestSeries, sendUnapproved , sendApproved, checkPurchased, purchaseTest, approveTest, getTestDetails, submitTest, addReview};