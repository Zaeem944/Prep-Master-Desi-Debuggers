const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Question Schema
const QuestionSchema = new Schema({
    question: { type: String, required: true },
    op1: { type: String, required: true },
    op2: { type: String, required: true },
    op3: { type: String, required: true },
    op4: { type: String, required: true },
    isCorrect: { type: String, required: true } 
});

// Define Review Schema
const ReviewSchema = new Schema({
    title: { type: String },
    reviewValues: { type: Number, min: 1, max: 5 }, // Review value out of 5
    comments: [{ type: String }] // Array of review comments
});

// Define Test Series Schema
const TestSeriesSchema = new Schema({
    title: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    questions: [QuestionSchema], 
    reviews: [ReviewSchema], // Array of reviews
    price: { type: Number, required: true },
    teacherEmail: { type: String },
    purchasedBy: [{ type: String }], 
    attempted: [{
        email: { type: String, required: true },
        highestMarks: { type: Number, required: true }
    }] 
}, { timestamps: true });

// Define the TestSeries model
const TestSeries = mongoose.model('TestSeries', TestSeriesSchema);
module.exports = TestSeries;
