const User = require("../../models/User.model"); // Import the User model

const checkAvailCoupon = async (req, res, next) => {
  try {
    const userEmail = req.query.userEmail;
    const couponCode = req.query.couponCode;
    console.log(userEmail);
    console.log(couponCode);
    // const user = await User.findOne({ email: userEmail });

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // if (user.availedCoupons.includes(couponCode)) {
    //   return res.status(200).json({
    //     message: `Coupon ${couponCode} has been availed and is no longer valid`,
    //     success: false,
    //     statusText: "Expired",
    //   });
    // }

    res.status(200).json({
      message: "Coupon Redeemed",
      success: true,
      statusText: "OK",
    });
    } catch (error) {
    next(error);
  }
};

module.exports = checkAvailCoupon;
