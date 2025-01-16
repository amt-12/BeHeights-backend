const router = require("express").Router();
const authRoutes = require("./Auth.route");
const userRoutes = require("./User.route");
const categoryRoutes = require("./Category.route");
const contactUs = require("./Contact.route");
const cartRoutes = require("./Cart.route");
const wishListRoutes = require("./WishList.route");
const productRoutes = require("./Product.route");
const addProductNameRoutes = require("./AddProductName.route");
const feebackRoutes = require("./Feedback.route");
const ResponseRoutes = require("./Response.route");
const getbill = require("./GetOtp.route");
const getbanner = require("./Banner.route");
const addBusiness = require("./Business.route");

const checkAuth = require("../../middlewares/check-auth");



router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product",checkAuth, productRoutes);
router.use('/verify', getbill);
router.use('/banner', getbanner);
router.use('/addBusiness', addBusiness);


router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
