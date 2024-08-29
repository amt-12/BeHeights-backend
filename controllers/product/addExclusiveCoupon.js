const ExclusiveOfferModel = require("../../models/ExclusiveOffer.model");
const { exclusiveOfferValidation } = require("../../services/validation_schema");

const addExclusiveCoupon = async (req, res, next) => {
  try {
    const { offer, subOffer, resturantName,location,validTill } = req.body;

    // Input validation for req.body properties
    if (!offer || !subOffer || !resturantName || !location || !validTill ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();

    // Check the number of existing offers
    const existingOffers = await ExclusiveOfferModel.countDocuments();
    if (existingOffers >= 10) {
      return res.json({
        success: false,
        status: 400,
        message: "Maximum number of offers reached",
      });
    }

    let result; // Define result variable here
    try {
      result = await exclusiveOfferValidation.validateAsync({
        offer,
        subOffer,
        resturantName,
        uniqueCode,
        location,
        validTill
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
      });
    }

    if (!result) { // Check if result is defined
      return res.status(400).json({
        success: false,
        message: "Validation error",
      });
    }

    const exclusiveOffer = new ExclusiveOfferModel({ ...result, code: uniqueCode });
    try {
      await exclusiveOffer.save();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating exclusive offer",
      });
    }

    res.json({
      success: true,
      status: 200,
      message: "Exclusive Offer created successfully",
      exclusiveOffer,
      location
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addExclusiveCoupon;