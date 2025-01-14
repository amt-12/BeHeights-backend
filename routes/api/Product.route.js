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
const checkAuth = require("../../middlewares/check-auth");
const getAvailedCoupons = require("../../controllers/product/getAvailedCoupons");

const router = require("express").Router();

router.post("/addProduct",checkAuth, addProduct);
router.post("/addBannerProduct",checkAuth, addBannerProduct);
router.post("/addBusinessProduct",checkAuth, addBusinessProduct);
router.post("/addExclusiveCoupon",checkAuth, addExclusiveCoupon);
router.post("/addLoversCategory", checkAuth,addLoversCategory);// currently working
router.post("/updateExclusiveCoupon/:id",checkAuth, updateExclusiveCoupon);
router.delete("/deleteExclusiveCoupon/:id",checkAuth, deleteExclusiveOffer);
router.get('/exclusive-offers', checkAuth,getExclusiveOffers);
router.put("/:id/status", checkAuth,statusChange);
router.get("/stats/count", checkAuth,statusCount);
router.put("/:id", checkAuth,updateProduct);
router.put("/updateValid/:id",checkAuth, updateValidDate);
router.delete("/:id",checkAuth, deleteProduct);
router.get("/",checkAuth, getProducts);
router.get("/getBusinessProducts",checkAuth, getBusinessProducts);
router.get("/:id",checkAuth, getSingleProducts);
router.post("/avail", checkAuth,availCoupon);
router.get('/availedCoupons/:email',checkAuth, getAvailedCoupons);
router.get("/checkCouponAvail", checkAuth,checkAvailCoupon);
router.post("/availExclusiveOffer",checkAuth, availExclusiveOffer);

router.delete("/:productId/:imageId",checkAuth, deleteImage);
module.exports = router;
