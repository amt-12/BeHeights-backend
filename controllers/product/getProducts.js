const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const { ObjectId } = require("mongoose").Types;

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).lean(); // Use lean() to get plain JavaScript objects

    // Calculate days left for each product
    products.forEach((product) => {
      const today = new Date();
      const validTillDate = new Date(product.validTill); // Note: I assume the field is named "validTill" not "validtill"
      const timeDiff = validTillDate.getTime() - today.getTime();
      const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

      if (daysLeft === 0) {
        product.daysLeft = `Today`;
      } else {
        product.daysLeft = daysLeft;
      }
    });

    res.json({ success: true, status: 200, products });
  } catch (error) {
    res.json({ success: false, status: 500, error: error.message });
  }
};

module.exports = getProducts;