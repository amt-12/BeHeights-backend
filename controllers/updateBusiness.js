const BusinessAll = require("../models/BuisnessAll.model");
const { businessValidation } = require("../services/validation_schema");

const updateBusiness = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const business = await businessValidation.validateAsync(req.body);
    const {
      businessName,
      typeOfBusiness,
      location,
      typeOfFood,
      cost,
      tableTime,
      buffetPrice,
      isActive,
      images,
      businessOff,
      offerTitle,
      offerPrice,
      offerDetail,
      validTill,
      validFor,
    } = business;

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

    if (businessName && businessName !== existingBusiness.businessName) {
      const businessWithNameExists = await BusinessAll.findOne({ businessName });
      if (businessWithNameExists) {
        return res.status(400).json({
          success: false,
          message: 'Business name already exists',
        });
      }
    }

    existingBusiness.businessName = businessName || existingBusiness.businessName;
    existingBusiness.typeOfBusiness = typeOfBusiness || existingBusiness.typeOfBusiness;
    existingBusiness.location = location || existingBusiness.location;
    existingBusiness.typeOfFood = typeOfFood || existingBusiness.typeOfFood;
    existingBusiness.cost = cost || existingBusiness.cost;
    existingBusiness.tableTime = tableTime || existingBusiness.tableTime;
    existingBusiness.buffetPrice = buffetPrice || existingBusiness.buffetPrice;
    existingBusiness.isActive = isActive || existingBusiness.isActive;
    existingBusiness.images = images || existingBusiness.images;
    existingBusiness.businessOff = businessOff || existingBusiness.businessOff;
    existingBusiness.offerTitle = offerTitle || existingBusiness.offerTitle;
    existingBusiness.offerPrice = offerPrice || existingBusiness.offerPrice;
    existingBusiness.offerDetail = offerDetail || existingBusiness.offerDetail;
    existingBusiness.validTill = validTill || existingBusiness.validTill;
    existingBusiness.validFor = validFor || existingBusiness.validFor;

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