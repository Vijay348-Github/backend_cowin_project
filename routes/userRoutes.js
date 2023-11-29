// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// User registration route
router.post('/register', authController.registerUser);

// User login route
router.post('/login', authController.userLogin);

// View available time slots route
router.get('/slots', userController.viewAvailableSlots);

// Register for vaccine dose route
router.post('/register-slot', userController.registerForSlot);

// Update registered slot route
router.put('/update-slot/:userId', userController.updateRegisteredSlot);

module.exports = router;

