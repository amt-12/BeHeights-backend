const AddProductName = require("../../models/AddProductName.model");
const createError = require("http-errors");
const formidable = require("formidable");
const { productValidation } = require("../../services/validation_schema");

const addProductDetails = async (req, res, next) => {
  try {
    const { name,price,description } = req.body;
    const result = await productValidation.validateAsync({
      price,
      name
    });

    const findProductName = await AddProductName.findOne({ name });
    if (findProductName) {
      throw createError.NotFound("Product name already exists.");
    }
    const product = new AddProductName({ name ,price,description});
    await product.save();

    res.json({
      success: true,
      status: 200,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addProductDetails;
