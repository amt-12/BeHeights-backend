const createError = require("http-errors");
const ResetPassword = require("../../models/ResetPassword.model");
const sendEmail = require("../../services/sendEmail");

const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../../services/validation_schema");
const nodemailer = require("nodemailer");

const register = async (req, res, next) => {
  try {
    const result = await registerValidation.validateAsync(req.body);
    const { name, phone, email, password } = result;

    const userExistingEmail = await User.findOne({
      email,
    });
    const userExistingPhone = await User.findOne({
      phone,
    });
    if (userExistingPhone) {
      throw new Error(`${phone} is already exist. Please login.`);
    }

    if (userExistingEmail) {
      throw new Error(`${email} is already exist. Please login.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const otp = Math.floor(100000 + Math.random() * 900000); // generate a 6-digit OTP
    const resetotp = new ResetPassword({
      otp,
      email,
    });
    await resetotp.save();
    const user = new User({
      name,
      phone,
      email,
      otp,
      password: hashedPassword,
    });

    
    await user.save();

    res.status(200).json({
      message: " User created successfully",
      success: true,
      otp,
      statusText: "OK",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;