// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: { type: String, unique: true },
  age: Number,
  pincode: Number,
  aadharNo: String,
  password: String,
  firstDoseStatus: String,
  secondDoseStatus: String,
});

module.exports = mongoose.model('User', userSchema);


