const mongoose = require('mongoose');

const otpDirectSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, expires: 300 } // expires in 5 minutes
});

const Otp = mongoose.model('Otp', otpDirectSchema);

module.exports = otpDirectSchema;