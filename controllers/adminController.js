// controllers/adminController.js
const Admin = require("../models/Admin");
const Slot = require("../models/Slot");
const User = require("../models/User");

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Admin logged in successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
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
        res.status(500).json({ message: "Internal Server Error" });
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
        res.status(500).json({ message: "Internal Server Error" });
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
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.addSlot = async (req, res) => {
  try {
      const { date, startTime, endTime, availableDoses } = req.body;

      // Validate input
      if (!isValidDateFormat(date) || !isValidTimeFormat(startTime) || !isValidTimeFormat(endTime) || availableDoses < 0) {
          return res.status(400).json({ message: 'Invalid input format' });
      }

      // Create a new slot
      const newSlot = new Slot({
          date,
          startTime,
          endTime,
          availableDoses,
      });

      await newSlot.save();
      res.status(201).json({ message: 'Slot added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Example date and time format validation functions
function isValidDateFormat(date) {
  // Add your date format validation logic
  return true;
}

function isValidTimeFormat(time) {
  // Add your time format validation logic
  return true;
}

