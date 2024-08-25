const BusinessAll = require("../models/BuisnessAll.model");

const deleteBusiness = async (req, res, next) => {
  try {
    const businessId = req.params.id;

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

    await existingBusiness.remove();

    res.status(200).json({
      success: true,
      message: 'Business deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteBusiness;