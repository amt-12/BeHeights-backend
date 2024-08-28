const BusinessAll = require("../models/BuisnessAll.model");
const { businessValidation } = require("../services/validation_schema");

const updateBusinessCoupon = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const newCoupon = req.body.newCoupon; 
    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the business ID",
      });
    }

    if (!newCoupon || !Array.isArray(newCoupon)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid new coupon with offer and sub offer",
      });
    }
    
    for (const coupon of newCoupon) {
      if (!coupon.offer || !coupon.subOffer) {
        return res.status(400).json({
          success: false,
          message: "Please provide both offer and sub offer",
        });
      }
    }

    const existingBusiness = await BusinessAll.findById(businessId);
    if (!existingBusiness) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    if (existingBusiness.coupon) {
      existingBusiness.coupon.push(...newCoupon);
    } else {
      existingBusiness.coupon = newCoupon;
    }

    await existingBusiness.save();

    res.status(200).json({
      success: true,
      message: "Business Details updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBusinessCoupon;

