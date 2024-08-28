const { exclusiveOfferValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const ExclusiveOfferModel = require("../../models/ExclusiveOffer.model");

const updateExclusiveCoupon = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the product ID from the URL parameter
    const { offer, subOffer, resturantName, location } = req.body;

    // Find the product by ID
    const product = await ExclusiveOfferModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "ExclusiveOfferModel not found",
      });
    }

    // Validate the updated data
    const result = await exclusiveOfferValidation.validateAsync({
      offer,
      subOffer,
      resturantName,
      location,
    });

    // Update the product
    product.offer = result.offer;
    product.subOffer = result.subOffer;
    product.resturantName = result.resturantName;
    product.location = result.location;
    await product.save();

    res.json({
      success: true,
      status: 200,
      message: "Coupon updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateExclusiveCoupon;