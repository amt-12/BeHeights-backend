const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");

const addProduct = async (req, res, next) => {
  try {
    const { offer, subOffer, restaurantName, validTill, limit } = req.body;
    const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    console.log(req.body)

    const result = await productValidation.validateAsync({
      offer,
      subOffer,
      restaurantName,
      uniqueCode,
      validTill, 
      limit
    });

    const product = new Product({ ...result, code: uniqueCode });
    await product.save();

    res.json({
      success: true,
      status: 200,
      message: "Coupon created successfully",
      product,
      validTill
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addProduct;