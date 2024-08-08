
const User = require("../../models/User.model"); 
const UserOtpModel = require("../../models/UserOtp.model");
const { updateValidation } = require("../../services/validation_schema");

const updateProfile = async (req, res, next) => {
  try {
    const updateDetails = await updateValidation.validateAsync(req.body);
    const { email, newEmail } = updateDetails;

    const userExistingEmail = await User.findOne({
      email,
    });
    if (userExistingEmail === email) {
      const resetEmail = await User.findOneAndUpdate({ email},{new:newEmail});
      console.log(resetEmail)
    }

  
  //   if (resetEmail?.otp === otp) {
  //     // Update User model with isVerified set to true
  //     const userDirect = await UserOtpModel.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
  //     if (!userDirect) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     res.status(200).json({
  //       message: "OTP Verified Successfully, please Login !",
  //       success: true,
  //       statusText: "OK",
  //     });
  //   } else if (resetotp?.otp !== otp) {
  //     res.status(500).json({
  //       message: "Invalid OTP !",
  //     });
  //   }
  // } catch (error) {
  //   next(error);
  // }
  res.status(200).json({
       message: "OTP Verified Successfully, please Login !",
        success: true,
    statusText: "OK",
       });
  }
  catch (error) {
    next(error);
  }
};
module.exports = updateProfile;