// models/Slot.js
// models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value instanceof Date && !isNaN(value),
      message: 'Invalid date format',
    },
  },
  time: {
    type: String,
    required: true,
    
  },
  doseType: {
    type: String,
    required: true,
    
  },
  availableDoses: {
    type: Number,
    required: true,
    min: 0,
    
    default: 10,
  },
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Slot', slotSchema);
