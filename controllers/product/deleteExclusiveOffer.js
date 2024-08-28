const { exclusiveOfferValidation } = require("../../services/validation_schema");
const ExclusiveOfferModel = require("../../models/ExclusiveOffer.model");

const deleteExclusiveOffer = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the product ID from the URL parameter

    // Find the product by ID
    const product = await ExclusiveOfferModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "ExclusiveOfferModel not found",
      });
    }

    // Delete the product
    await product.remove();

    res.json({
      success: true,
      status: 200,
      message: "Exclusive offer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteExclusiveOffer;