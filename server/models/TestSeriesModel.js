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

// Define Test Series Schema
const TestSeriesSchema = new Schema({
    title: { type: String, required: true },
    isApproved: {type:Boolean, default: false},
    questions: [QuestionSchema], 
    reviews: {
        title: { type: String },
        reviewValues: { type: Number, min: 1, max: 5 }, 
        comments: [{ type: String }] 
    },
    price: {type: Number, required: true},
    teacherEmail: {type: String},
    purchasedBy: [{ type: String }], 
    attempted: [{ type: String }] 
}, { timestamps: true });

// Define the TestSeries model
const TestSeries = mongoose.model('TestSeries', TestSeriesSchema);
module.exports = TestSeries;
