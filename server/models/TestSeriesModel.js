const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Question Schema
const QuestionSchema = new Schema({
    question: { type: String, required: true },
    op1: { type: String, required: true },
    op2: { type: String, required: true },
    op3: { type: String, required: true },
    op4: { type: String, required: true },
    isCorrect: { type: String, required: true } // This will store the correct option (e.g., 'op1', 'op2', etc.)
});

// Define Test Series Schema
const TestSeriesSchema = new Schema({
    title: { type: String, required: true },
    questions: [QuestionSchema], // Array of questions
    reviews: {
        title: { type: String },
        reviewValues: { type: Number, min: 1, max: 5 }, // Review value out of 5
        comments: [{ type: String }] // Array of review comments
    },
    price: {type: Number, required: true},
    teacherEmail: {type: String},
    purchasedBy: { type: String, required: true } // String representing who purchased the test series
}, { timestamps: true });

// Define the TestSeries model
const TestSeries = mongoose.model('TestSeries', TestSeriesSchema);
module.exports = TestSeries;
