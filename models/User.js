// models/User.js
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    },
  age: Number,
  pincode: Number,
  aadharNo: String,
  password: {
    type: String,
    required: true,
    // Hash the password before saving it to the database
    set: (value) => bcrypt.hashSync(value, 10),
  },
  firstDoseStatus: {
    type: String,
    default: 'none', // Setting default value as needed
  },
  secondDoseStatus: {
    type: String,
    default: 'none', // Setting default value as needed
  },
});

module.exports = mongoose.model('User', userSchema);

