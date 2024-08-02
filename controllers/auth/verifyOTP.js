const ResetPassword = require("../../models/ResetPassword.model");
const User = require("../../models/User.model");
const sendEmail = require("../../services/sendEmail");
const createError = require("http-errors");

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const resetotp = await ResetPassword.findOne({
      email,
      otp,
    });
    console.log(resetotp?.otp);
    if (resetotp?.otp === otp) {
      res.status(200).json({
        message: "OTP Verified Successfully, please Login !",
        success: true,
        statusText: "OK",
      });
    } else if (resetotp?.otp !== otp) {
      res.status(500).json({
        message: "Invalid OTP !",
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = verifyOtp;
