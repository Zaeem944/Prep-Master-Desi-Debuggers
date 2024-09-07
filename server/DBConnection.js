const mongoose = require('mongoose');

async function connectMongoDB(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error Connecting to mongodb: ${error}`);
    }
}

module.exports = connectMongoDB;