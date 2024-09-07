const Users = require('../models/UserModel');

const createUser = async (req, res) => {
    const { id, name, email, password, role } = req.body;
    try {
    let isVerified = false;
    console.log(`data recieved: ${id} ${name} ${email} ${password} ${role}`);
    if (role === 'student') {
        isVerified = true;
    } else if (role === 'teacher') {
        isVerified = false;
    } else {
        throw new Error('Invalid role');
    }
    const newUser = new Users({ id, name, email, password, role, isVerified });
    await newUser.save();
    res.status(201).json(newUser);
    console.log('User created successfully');
    } catch (error) {
        console.log('Error creating user:', error.message);
        res.status(409).json({ message: error.message });
    }
}

const UserVerified = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await Users.findOne({ email: email });
        user.isVerified = true;
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
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

module.exports = { createUser, UserVerified, getUserByEmail, getAllUsers };

