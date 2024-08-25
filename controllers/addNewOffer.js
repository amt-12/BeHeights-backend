const BusinessAll = require("../models/BuisnessAll.model");
const { businessValidation } = require("../services/validation_schema");

const addNewOffer = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const newOffer = req.body.offer;
    const newSubOffer = req.body.subOffer;

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the business ID",
      });
    }

    if (!newOffer || !newSubOffer) {
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

    await BusinessAll.findByIdAndUpdate(businessId, {
      $push: {
        coupon: { offer: newOffer, subOffer: newSubOffer }
      }
    });

    res.status(200).json({
      success: true,
      message: "New offer and sub offer added successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNewOffer;

