const express = require('express');
const router = express.Router();
const { createUser, UserVerified, getUserByEmail, getAllUsers } = require('../controllers/UserController');

router.post('/create', createUser);
router.put('/verify/:email', UserVerified);
router.get('/get/:email', getUserByEmail);
router.get('/getAll', getAllUsers);

module.exports = router;