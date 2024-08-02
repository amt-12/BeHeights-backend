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
    // let config = {
    //   service: "gmail",
    //   auth: {
    //     user: "amrit0207232@gmail.com",
    //     pass: "qxozxptvbhkddbyc",
    //   },
    // };
    // let transporter = nodemailer.createTransport(config);
    // let message = {
    //   from: "amrit0207232@gmail.com",
    //   to: email, // Send to the user's email instead of a fixed email
    //   subject: "Your OTP",
    //   text: `Your OTP is: ${otp}`,
    //   html: `<b>Your OTP is: ${otp}</b>`,
    // };
    // transporter
    //   .sendMail(message)
    //   .then(() => {
    //     return  res.status(200).json({
    //       msg: "OTP sent to your email successfully!",
    //       email: email, // include the user's email in the response
    //       success: true,
    //     });
    //   })
    //   .catch((error) => {
    //     return res.status(500).json({ error });
    //   });
    await resetotp.save();
    const user = new User({
      name,
      phone,
      email,
      otp,
      password: hashedPassword,
    });
    await user.save();
  } catch (error) {
    next(error);
  }
};

module.exports = register;