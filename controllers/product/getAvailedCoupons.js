const User = require("../../models/User.model");

const getAvailedCoupons = async (req, res, next) => {
  try {
    const userEmail = req.params.email; // Get email from URL parameters
    console.log("Email received:", userEmail); // Log the received email

    if (!userEmail) {
      return res.status(400).json({
        message: "Email parameter is required",
        success: false,
      });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        message: "User  not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Availed Coupons Retrieved",
      success: true,
      coupons: user.availedCoupons,
    });
  } catch (error) {
    console.error("Error retrieving availed coupons:", error); // Log the error
    next(error);
  }
};

module.exports = getAvailedCoupons;