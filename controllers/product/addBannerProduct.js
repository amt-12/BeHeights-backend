const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");

const addBannerProduct = async (req, res, next) => {
  try {
    const { offer, subOffer, resturantName, validTill, addDetails } = req.body;
    const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    console.log(req.body)

    const result = await productValidation.validateAsync({
      offer,
      subOffer,
      resturantName,
      uniqueCode,
      validTill, 
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

module.exports = addBannerProduct;