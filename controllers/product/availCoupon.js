const Product = require("../../models/Product.model");
const User = require("../../models/User.model"); // Import the User model
const { CouponValidation } = require("../../services/validation_schema");

const availCoupon = async (req, res, next) => {
  try {
    const couponCode = await CouponValidation.validateAsync(req.body);
    console.log(couponCode);
    const { uniqueCode } = couponCode;
    const userEmail = req.body.userId; // Assuming the userId is actually an email address

    async function updateAvailedCoupons() {
      const users = await User.find({ availedCoupons: { $type: "bool" } });
      for (const user of users) {
        user.availedCoupons = [];
        await user.save();
      }
    }

    updateAvailedCoupons();

    const userCoupon = await Product.findOne({ uniqueCode });
    console.log(userCoupon?.restaurantName)

    if (userCoupon) {
      if (userCoupon.isAvail) {
        throw new Error(`${uniqueCode} Already Redeemed!`);
      }
      if (userCoupon.redeemedCount >= userCoupon.limit) {
        throw new Error(`Coupon ${uniqueCode} has exceeded its redemption limit!`);
      }
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the coupon code already exists in the user's availedCoupons array
    if (user.availedCoupons.includes(uniqueCode)) {
      throw new Error(`You have already redeemed coupon ${uniqueCode}`);
    }

    // Update the user's availed coupons
    const userUpdate = await User.findOneAndUpdate(
      { email: userEmail }, // Find user by email
      {
        $push: {
          availedCoupons: {
            uniqueCode,
            restaurantName: userCoupon?.restaurantName,
            offer: userCoupon?.offer,
          },
        },
        couponAvail: true,
      },
      { new: true }
    );
    

    // Update the coupon's redeemed count
    const couponUpdate = await Product.findOneAndUpdate(
      { uniqueCode },
      { $inc: { redeemedCount: 1 } },
      { new: true }
    );

    // Return the availed coupon information
    res.status(200).json({
      message: "Coupon Redeemed",
      success: true,
      statusText: "OK",
      coupon: {
        uniqueCode,
        redeemedCount: couponUpdate.redeemedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = availCoupon;