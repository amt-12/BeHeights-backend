const nodemailer = require('nodemailer');
const { email, password } = require('../config/keys').nodemailer;

/**
 * Sends email address
 * @param {Array} recipients - Array of recipient email addresses
 * @param {String} subject - Subject line of the email
 * @param {String} template - Email body in html with inline styles
 */
const sendEmail = (recipients, subject, template) => {
  return new Promise((resolve, reject) => {
    try {
  const otp = generateOTP();

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
    } catch (error) {
      return reject(error);
    }
  });
};


module.exports = { sendEmail };