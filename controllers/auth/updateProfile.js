const User = require("../../models/User.model"); 
const UserOtpModel = require("../../models/UserOtp.model");
const { updateValidation } = require("../../services/validation_schema");

const updateProfile = async (req, res, next) => {
  try {
    const updateDetails = await updateValidation.validateAsync(req.body);
    const { email, newEmail } = updateDetails;
    console.log(updateDetails)
    const userExistingEmail = await User.findOne({
      email,
    });
    if (userExistingEmail) { // Check if user exists
      const resetEmail = await User.findOneAndUpdate({ email: email },{ email: newEmail });
      console.log(resetEmail)
      res.status(200).json({
        message: "Email updated Successfully!",
        success: true,
        statusText: "OK",
      });
    } else {
      res.status(404).json({
        message: "User not found!",
        success: false,
        statusText: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = updateProfile;