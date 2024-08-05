const Product = require("../../models/Product.model");
const { CouponValidation } = require("../../services/validation_schema");

const availCoupon = async (req, res, next) => {
  try {
    const couponCode = await CouponValidation.validateAsync(req.body);
    const { uniqueCode } = couponCode;
    const userCoupon = await Product.findOne({
        uniqueCode,
        
      });
    if (couponCode !== userCoupon ) {
        throw new Error(`${uniqueCode} Already Redeem !`);
      }
  
    const couponUpdate = await Product.findOneAndUpdate(
      { uniqueCode },
      { isAvail: true },
      { new: true }
    );

    if (!couponUpdate) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({
      message: "Coupon Redeem",
      success: true,
      statusText: "OK",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = availCoupon;