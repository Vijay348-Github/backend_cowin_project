// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.adminLogin);

// Get total users route (with optional filters)
router.get('/total-users', adminController.getTotalUsers);

// Get total slots route
router.get('/total-slots', adminController.getTotalSlots);

// Get slot details route
router.get('/slot/:slotId', adminController.getSlotDetails);

module.exports = router;
