// controllers/adminController.js
const Admin = require('../models/Admin');
const Slot = require('../models/Slot');
const User = require('../models/User');

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Admin logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTotalUsers = async (req, res) => {
  try {
    // Logic to get total users based on optional filters
    const { age, pincode, vaccinationStatus } = req.query;
    const filter = {};

    if (age) filter.age = age;
    if (pincode) filter.pincode = pincode;
    if (vaccinationStatus) {
      filter.$or = [
        { firstDoseStatus: vaccinationStatus },
        { secondDoseStatus: vaccinationStatus },
      ];
    }

    const totalUsers = await User.countDocuments(filter);

    res.json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTotalSlots = async (req, res) => {
  try {
    // Logic to get total vaccine slots for a given day
    const { date } = req.query;
    const totalSlots = await Slot.countDocuments({ date });

    res.json({ totalSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getSlotDetails = async (req, res) => {
  try {
    const { slotId } = req.params;

    // Logic to get details of a specific vaccine slot
    const slotDetails = await Slot.findById(slotId);

    res.json({ slotDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
