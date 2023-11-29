// models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: Date,
  time: String,
  doseType: String,
  availableDoses: Number,
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Slot', slotSchema);