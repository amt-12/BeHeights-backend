const Otp = require("../../models/Otp.model");
const User = require("../../models/User.model"); // Import User model
const UserOtpModel = require("../../models/UserOtp.model");

const verifyDirectOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const resetotp = await Otp.findOne({
      email,
      otp,
    });
    
    console.log(resetotp?.otp);
    if (resetotp?.otp === otp) {
      // Update User model with isVerified set to true and role set to "user"
      const user = await Otp.findOneAndUpdate({ email }, { isVerified: true, role: "user" }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "OTP Verified Successfully, please Login !",
        success: true,
        statusText: "OK",
        user:{
          email: user.email,
          role: user.role,
        }
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
module.exports = verifyDirectOTP;