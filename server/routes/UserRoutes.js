const express = require('express');
const router = express.Router();
const { createUser, getUserByEmail, getAllUsers } = require('../controllers/UserController');

router.post('/create', createUser);
router.get('/get/:email', getUserByEmail);
router.get('/getAll', getAllUsers);

module.exports = router;