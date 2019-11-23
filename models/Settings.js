const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  field: {
    type: Number,
    default: 5
  },
  delay: {
    type: Number,
    default: 1000
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
