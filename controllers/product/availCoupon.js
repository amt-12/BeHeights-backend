const Product = require("../../models/Product.model");
const { CouponValidation } = require("../../services/validation_schema");

const availCoupon = async (req, res, next) => {
  try {
    const couponCode = await CouponValidation.validateAsync(req.body);
    console.log(couponCode);
    const { uniqueCode } = couponCode;
    const userCoupon = await Product.findOne({ uniqueCode });

    if (userCoupon && userCoupon.isAvail) {
      throw new Error(`${uniqueCode} Already Redeemed!`);
    }

    const couponUpdate = await Product.findOneAndUpdate(
      { uniqueCode },
      { isAvail: true },
      { new: true },

    );
    const couponUpdate1 = await Product.findOneAndUpdate(
      { uniqueCode },
      { isExpired: true },
      
      { new: true },

    );

    if (!couponUpdate) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({
      message: "Coupon Redeemed",
      success: true,
      statusText: "OK",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = availCoupon;
