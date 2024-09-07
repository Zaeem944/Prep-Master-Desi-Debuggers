const Users = require('../models/UserModel');

const createUser = async (req, res) => {
    const { id, name, email, password, role, isVerified, imageUrl } = req.body;
    const newUser = new Users({
        id,
        name,
        email,
        password,
        role,
        isVerified,
        imageUrl,
    });
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await Users.findOne({ email: email });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { createUser, getUserByEmail, getAllUsers };

