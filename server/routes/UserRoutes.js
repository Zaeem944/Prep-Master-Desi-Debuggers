const express = require('express');
const router = express.Router();
const { createUser, UserVerified, getUserByEmail, getAllUsers, LoginUser, GetUnverifiedUsers } = require('../controllers/UserController');

router.post('/create', createUser);
router.put('/verify/:email', UserVerified);
router.get('/get/:email', getUserByEmail);
router.get('/getAll', getAllUsers);
router.post('/login', LoginUser);
router.get('/getUnverified', GetUnverifiedUsers);

module.exports = router;