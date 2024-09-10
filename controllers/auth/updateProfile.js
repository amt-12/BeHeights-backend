const User = require("../../models/User.model"); 
const UserOtpModel = require("../../models/UserOtp.model");
const { updateValidation } = require("../../services/validation_schema");

const updateProfile = async (req, res, next) => {
  try {
    const { phone, name, email } = req.body;


    // Find the user by ID (assuming req.user is set by middleware)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    user.phone = phone;
    user.name = name;
    user.email = email;

    // Save the updated user
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateProfile;
