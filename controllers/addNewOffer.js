const BusinessAll = require("../models/BuisnessAll.model");
const { businessValidation } = require("../services/validation_schema");
const { v4: uuidv4 } = require('uuid');

const addNewOffer = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const newOffer = req.body.offer;
    const newSubOffer = req.body.subOffer;
    const newPrice = req.body.price;
    const newValidFor = req.body.validFor;
    const newValidTill = req.body.validTill;

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the business ID",
      });
    }

    if (!newOffer || !newSubOffer || !newPrice || !newValidFor || !newValidTill) {
      return res.status(400).json({
        success: false,
        message: "Please provide both new offer and sub offer",
      });
    }

    const existingBusiness = await BusinessAll.findById(businessId);
    if (!existingBusiness) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    const uniqueCode = uuidv4().slice(0, 8).toUpperCase(); // Generate a unique 8-character code

    await BusinessAll.findByIdAndUpdate(businessId, {
      $push: {
        coupon: { 
          code: uniqueCode,
          offer: newOffer, 
          subOffer: newSubOffer, 
          price: newPrice,
          validFor: newValidFor, 
          validTill: newValidTill
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "New offer and sub offer added successfully",
      code: uniqueCode
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNewOffer;