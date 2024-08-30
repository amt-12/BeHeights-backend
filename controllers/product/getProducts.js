const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const { ObjectId } = require("mongoose").Types;

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).lean(); // Sort by createdAt in descending order

    // Calculate days left for each product
    products.forEach((product) => {
      const today = new Date();
      const validTillDate = new Date(product.validTill);
      const timeDiff = validTillDate.getTime() - today.getTime();
      const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));

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