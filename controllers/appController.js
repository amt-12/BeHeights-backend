const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Otp = require("../models/Otp.model");



const getbill = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  
  const otp = generateOTP();
console.log(otp);
  const otpDoc = new Otp({ email, otp });
  otpDoc.save((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save OTP' });
    }

    let config = {
      service: "gmail",
      auth: {
        user: "amrit0207232@gmail.com",
        pass: "rdouazscqsinlxlh",
      },
    };
    let transporter = nodemailer.createTransport(config);
    let message = {
      from: "amrit0207232@gmail.com",
      to: email, 
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`,
      html: `<b>Your OTP is: ${otp}</b>`,
    };
   
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(200).json({
          msg: "OTP sent to your email successfully!",
          email: email, 
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
      
  });

  res.status(200).json({
    msg: "OTP sent to your email successfully!",
    email: email, 
    success: true,
  });
};

module.exports = {
  getbill,
};