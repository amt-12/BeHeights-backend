const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, expires: 300 } // expires in 5 minutes
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;