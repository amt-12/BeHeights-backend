const nodemailer = require("nodemailer");
const crypto = require("crypto");

const getbill = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }
  const generateOTP = () => {
    var digits = "0123456789";
    var otpLength = 4;
    var otp = "";
    for (let i = 1; i <= otpLength; i++) {
      var index = Math.floor(Math.random() * digits.length);
      otp = otp + digits[index];
    }
    return otp;
  };
    const otp = generateOTP();

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
      return  res.status(200).json({
        msg: "OTP sent to your email successfully!",
        email: email, // include the user's email in the response
        success: true,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  getbill,
};
