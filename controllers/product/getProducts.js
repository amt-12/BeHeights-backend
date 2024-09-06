const Product = require("../../models/Product.model");

const getProducts = async (req, res, next) => {
  try {
    const user = req.user;

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    products.forEach(async (product) => {
      const today = new Date();
      const validTillDate = new Date(product.validTill);
      const timeDiff = validTillDate.getTime() - today.getTime();
      const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
      console.log(daysLeft);
      if (daysLeft < 0) {
        product.daysLeft = `Expired`;
        // Delete the expired coupon from the database
        await Product.findByIdAndRemove(product._id);
      } else if (daysLeft === 0) {
        product.daysLeft = `Expires today`;
      } else if (daysLeft === 1) {
        product.daysLeft = `Expires in 1 day`;
      } else {
        product.daysLeft = `${daysLeft}`;
      }

      // Check if user has availed the coupon
      if (user && user.availedCoupons.includes(product.uniqueCode)) {
        product.message = "Coupon already availed";
      } else if (product.daysLeft === "Expired") {
        product.message = "Coupon has expired";
      }
    });

    res.json({ success: true, status: 200, products });
  } catch (error) {
    res.json({ success: false, status: 500, error: error.message });
  }
};

module.exports = getProducts;


