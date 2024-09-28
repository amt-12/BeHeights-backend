const BusinessAll = require("../models/BuisnessAll.model");
const {  businessUpdateValidation } = require("../services/validation_schema");

const updateBusiness = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const business = await businessUpdateValidation.validateAsync(req.body);

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the business ID',
      });
    }

    const existingBusiness = await BusinessAll.findById(businessId);
    if (!existingBusiness) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }

    // Update fields dynamically based on req.body
    existingBusiness.$set(business);

    await existingBusiness.save();

    res.status(200).json({
      success: true,
      message: 'Business Details updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBusiness;