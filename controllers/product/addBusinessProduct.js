const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");

const addBusinessProduct = async (req, res, next) => {
  try {
    const { offer, subOffer, resturantName, validTill,role } = req.body;

    if (req.body.role !== 'business') {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Forbidden: Only business users can create coupons"
      });
    }

    const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();

    const result = await productValidation.validateAsync({
      offer,
      subOffer,
      resturantName,
      uniqueCode, 
      validTill,
      role
    });
    const product = new Product({ ...result, code: uniqueCode });
    await product.save();
    res.json({
      success: true,
      status: 200,
      message: "Business Coupon created successfully",
      product,
      validTill,
      role
    });
  } catch (error) {
    next(error);
  }
};

// Add auth middleware to the route
module.exports = addBusinessProduct