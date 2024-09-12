const Otp = require("../../models/Otp.model");
const User = require("../../models/User.model"); // Import User model
const UserOtpModel = require("../../models/UserOtp.model");
const jwt = require("jsonwebtoken"); // Add this line to import jwt
const { accessTokenLife, refreshTokenLife } = require("../../config/keys").jwt;

const verifyDirectOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const resetotp = await Otp.findOne({
      email,
      otp,
    });
    
    console.log(req.body);
    if (resetotp?.otp === otp) {
      // Update User model with isVerified set to true and role set to "user"
      const user = await Otp.findOneAndUpdate({ email }, { isVerified: true, role: "user" }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const payload = {
        name: user.name,
        _id: user._id,
        phone: user.phone,
        email: user.email,
        role: user.role,
      };
  
      // Generate access token and refresh token
      const accessToken = generateAccessToken(payload, accessTokenLife);
      const token = generateRefreshToken(payload, refreshTokenLife);
      if (accessToken && token) {
        user.token = token; // add token to user
        await user.save(); // save the user document
  
        res.cookie("auth", token, { httpOnly: true });
  
        res.status(200).json({
          message: "OTP Verified Successfully, please Login !",
          success: true,
          statusText: "OK",
          accessToken,
      user:payload
        });
      }
     
    } else if (resetotp?.otp !== otp) {
      res.status(500).json({
        message: "Invalid OTP !",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Function to generate access token
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m", // Token expires in 15 minutes
  });
};

// Function to generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1y", // Token expires in 1 year
  });
};

module.exports = verifyDirectOTP;