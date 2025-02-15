const addProduct = require("../../controllers/product/addProduct");
const updateProduct = require("../../controllers/product/updateProduct");
const deleteProduct = require("../../controllers/product/deleteProduct");
const getProducts = require("../../controllers/product/getProducts");
const getSingleProducts = require("../../controllers/product/getSingleProducts");
const deleteImage = require("../../controllers/product/deleteImage");
const statusCount = require("../../controllers/product/productStats");
const validateAccessToken = require("../../middlewares/jwtValidation");
const statusChange = require("../../controllers/product/productStatus");
const availCoupon = require("../../controllers/product/availCoupon");
const addExclusiveCoupon = require("../../controllers/product/addExclusiveCoupon");
const getExclusiveOffers = require("../../controllers/product/getExclusiveOffers");
const updateExclusiveCoupon = require("../../controllers/product/updateExclusiveCoupon");
const deleteExclusiveOffer = require("../../controllers/product/deleteExclusiveOffer");
const availExclusiveOffer = require("../../controllers/product/availExclusiveOffer");
const addBusinessProduct = require("../../controllers/product/addBusinessProduct");
const checkAvailCoupon = require("../../controllers/product/checkAvailCoupon");
const updateValidDate = require("../../controllers/product/updateValidDate");
const addBannerProduct = require("../../controllers/product/addBannerProduct");
const addLoversCategory = require("../../controllers/product/addLoversCategory");
const getBusinessProducts = require("../../controllers/product/getBuinessProducts");
const getAvailedCoupons = require("../../controllers/product/getAvailedCoupons");

const router = require("express").Router();

router.post("/addProduct", addProduct);
router.post("/addBannerProduct", addBannerProduct);
router.post("/addBusinessProduct", addBusinessProduct);
router.post("/addExclusiveCoupon", addExclusiveCoupon);
router.post("/addLoversCategory", addLoversCategory);// currently working
router.post("/updateExclusiveCoupon/:id", updateExclusiveCoupon);
router.delete("/deleteExclusiveCoupon/:id", deleteExclusiveOffer);
router.get('/exclusive-offers', getExclusiveOffers);
router.put("/:id/status", statusChange);
router.get("/stats/count", statusCount);
router.put("/:id", updateProduct);
router.put("/updateValid/:id", updateValidDate);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);
router.get("/getBusinessProducts", getBusinessProducts);
router.get("/:id", getSingleProducts);
router.post("/avail", availCoupon);
router.get('/availedCoupons/:email', getAvailedCoupons);
router.get("/checkCouponAvail", checkAvailCoupon);
router.post("/availExclusiveOffer", availExclusiveOffer);

router.delete("/:productId/:imageId", deleteImage);
module.exports = router;
