const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;