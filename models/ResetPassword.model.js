const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // expires in 1 hour
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);

module.exports = ResetPassword;