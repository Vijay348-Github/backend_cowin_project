// controllers/userController.js
const Slot = require('../models/Slot');
const User = require('../models/User');

exports.viewAvailableSlots = async (req, res) => {
    try {
      const { date } = req.params;
  
      // Validate date format (example)
      if (!isValidDateFormat(date)) {
        return res.status(400).json({ success: false, message: 'Invalid date format' });
      }
  
      // Logic to get available time slots
      const availableSlots = await Slot.find({ date, availableDoses: { $gt: 0 } });
  
      res.json({ success: true, data: { availableSlots } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
  // Example date format validation function
  function isValidDateFormat(date) {
    // Add your date format validation logic
    return true;
  }
  

exports.registerForSlot = async (req, res) => {
  try {
    const { userId, slotId } = req.body;

    // Logic to register user for a vaccine slot
    // Find user and slot
    const user = await User.findById(userId);
    const slot = await Slot.findById(slotId);

    // Check if user and slot exist
    if (!user || !slot) {
      return res.status(404).json({ message: 'User or slot not found' });
    }

    // Check if there are available doses in the slot
    if (slot.availableDoses === 0) {
      return res.status(400).json({ message: 'No available doses in this slot' });
    }

    // Update user's registered slot and decrement available doses
    user.registeredSlot = slotId;
    slot.availableDoses -= 1;

    // Save changes to the database
    await user.save();
    await slot.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateRegisteredSlot = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newSlotId } = req.body;

    // Logic to update the registered slot for a user

    // Find user and new slot
    const user = await User.findById(userId);
    const newSlot = await Slot.findById(newSlotId);

    // Check if user and new slot exist
    if (!user || !newSlot) {
      return res.status(404).json({ message: 'User or new slot not found' });
    }

    // Increment available doses in the old slot
    const oldSlot = await Slot.findById(user.registeredSlot);
    if (oldSlot) {
      oldSlot.availableDoses += 1;
      await oldSlot.save();
    }

    // Update user's registered slot to the new slot
    user.registeredSlot = newSlotId;

    // Decrement available doses in the new slot
    newSlot.availableDoses -= 1;

    // Save changes to the database
    await user.save();
    await newSlot.save();


    res.json({ message: 'Slot updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
