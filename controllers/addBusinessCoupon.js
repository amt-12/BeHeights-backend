const BusinessAll = require("../models/BuisnessAll.model");
const {
  businessValidation,
  businessCouponValidation,
} = require("../services/validation_schema");

const addBusinessCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const businesss = await businessCouponValidation.validateAsync(req.body);
    const { offerName} = businesss;
    if (!offerName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all the required fields',
      });
    }
    const business = await BusinessAll.findById(id);

    if (!business) {
      return next(createError(404, "Business not found"));
    }

    // Push the new item to the tableTimes array
    business.tableTimes.push(businesss.tableTime);

    // Save the updated business document
    await business.save();

    res.status(200).json({
      success: true,
      message: "Business Details updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = addBusinessCoupon;