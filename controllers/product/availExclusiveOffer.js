const ExclusiveOfferModel = require("../../models/ExclusiveOffer.model");
const { exclusiveOfferValidation } = require("../../services/validation_schema");
const UserModel = require("../../models/User.model"); // assuming you have a User model

const availExclusiveOffer = async (req, res, next) => {
  try {
    const couponExclusiveCode = await exclusiveOfferValidation.validateAsync(req.body);
    console.log(couponExclusiveCode);
    const { uniqueCode } = couponExclusiveCode;
    const user = req.user; // assuming you have a middleware to authenticate the user
    const userId = user._id;

    const userCoupon = await ExclusiveOfferModel.findOne({ uniqueCode, userId });

    if (userCoupon && userCoupon.isAvail) {
      throw new Error(`${uniqueCode} Already Redeemed by you!`);
    }

    const couponUpdate = await ExclusiveOfferModel.findOneAndUpdate(
      { uniqueCode, userId: null }, // update only if userId is null
      { $set: { userId, isAvail: true } },
      { new: true }
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

module.exports = availExclusiveOffer;