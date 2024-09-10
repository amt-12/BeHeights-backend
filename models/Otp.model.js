const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true }, 
  role: {
    type: String,
    enum: ["user", "admin","business"],
    default: "user",
  },
});

module.exports = mongoose.model('Otp', otpSchema);