const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Otp = require("../models/Otp.model");


const generateOTP = () => {
  // Generate a 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
};


const getbill = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }

  const otp = generateOTP();

  // Save OTP to database
  const otpDoc = new Otp({ email, otp });
  otpDoc.save((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save OTP' });
    }

    // Send OTP via email
    let config = {
      service: "gmail",
      auth: {
        user: "amrit0207232@gmail.com",
        pass: "qxozxptvbhkddbyc",
      },
    };
    let transporter = nodemailer.createTransport(config);
    let message = {
      from: "amrit0207232@gmail.com",
      to: email, // Send to the user's email instead of a fixed email
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
      html: `<b>Your OTP is: ${otp}</b>`,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          msg: "OTP sent to your email successfully!",
          email: email, // include the user's email in the response
          otp: otp, // include the OTP in the response (optional)
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  });
};
module.exports = {
  getbill,
};