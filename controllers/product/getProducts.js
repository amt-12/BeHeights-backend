const createError = require("http-errors");
const Product = require("../../models/Product.model");
const User = require("../../models/User.model"); // Import User model
const { productValidation } = require("../../services/validation_schema");
const uploadFiles = require("../../services/upload-files");
const formidable = require("formidable");
const { ObjectId } = require("mongoose").Types;

const getProducts = async (req, res, next) => {
  try {
    // Fetch the user data
    const user = req.user; // Assuming you have middleware to fetch user data

    // Fetch products
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    // Calculate days left for each product
    products.forEach((product) => {
      const today = new Date();
      const validTillDate = new Date(product.validTill);
      const timeDiff = validTillDate.getTime() - today.getTime();
      const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));

      if (daysLeft < 0) {
        product.daysLeft = `Expired`;
        // Delete the coupon after 2 days if it's expired
        setTimeout(async () => {
          await Product.findByIdAndRemove(product._id);
        }, 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
        throw createError(500, "Coupon has expired"); // Throw error with status 500
      } else if (daysLeft === 0) {
        product.daysLeft = `Last day`;
      } else {
        product.daysLeft = daysLeft;
      }

      // Check if user has availed the coupon
      if (user && user.availedCoupons.includes(product.uniqueCode)) {
        product.message = "Coupon already availed";
      }
    });

    res.json({ success: true, status: 200, products });
  } catch (error) {
    res.json({ success: false, status: error.status || 500, error: error.message });
  }
};

module.exports = getProducts;

