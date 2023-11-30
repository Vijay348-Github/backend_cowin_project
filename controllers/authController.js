// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, age, pincode, aadharNo, password } = req.body;

    // Validate input data 
    if (!isValidPhoneNumber(phoneNumber) || !isValidAge(age)) {
      return res.status(400).json({ success: false, message: 'Invalid input data' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);


    

    // Create a new user
    const newUser = new User({
      name,
      phoneNumber,
      age,
      pincode,
      aadharNo,
      password: hashedPassword,
      firstDoseStatus: 'none',
      secondDoseStatus: 'none',
    });

    await newUser.save();
    res.status(201).json({ success: true, data: { message: 'User registered successfully' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Example input validation functions
function isValidPhoneNumber(phoneNumber) {
  // Add your phone number validation logic
  return true;
}

function isValidAge(age) {
  // Add your age validation logic
  return true;
}



exports.userLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Find user by phone number
    const user = await User.findOne({ phoneNumber });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid phone number or password' });
    }

    // At this point, the login is successful
    res.json({ success: true, data: { message: 'Login successful' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

