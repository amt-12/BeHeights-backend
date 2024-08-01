const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");

const addProduct = async (req, res, next) => {
  try {
    const { price, name, cost, description } = req.body;

    // Validate the incoming data
    const result = await productValidation.validateAsync({
      price,
      name,
      cost,
      description,
    });

    // Handle file upload here if needed
    // For simplicity, assuming no file upload in this example

    // Create a new Product instance
    const product = new Product(result);

    // Save the product to the database
    await product.save();

    // Send success response
    res.json({
      success: true,
      status: 200,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addProduct;
