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
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: email,
          pass: password,
        },
      });

      const mailOptions = {
        from: email,
        to: recipients.join(','),
        subject,
        html: template,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    } catch (error) {
      return reject(error);
    }
  });
};

const generateOTP = () => {
  var digits = "0123456789";
  var otpLength = 6;
  var otp = "";
  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
};

module.exports = { sendEmail, generateOTP };