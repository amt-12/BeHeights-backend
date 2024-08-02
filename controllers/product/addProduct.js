const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");

const addProduct = async (req, res, next) => {
  try {
    const { price, name, description } = req.body;

    const result = await productValidation.validateAsync({
      price,
      name,
      description,
    });
    const product = new Product(result);
    await product.save();
    res.json({
      success: true,
      status: 200,
      message: "Coupon created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addProduct;
