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

const router = require("express").Router();

router.post("/addProduct", addProduct);
router.post("/addExclusiveCoupon/:location", addExclusiveCoupon);
router.get('/exclusive-offers', getExclusiveOffers);
router.put("/:id/status", statusChange);
router.get("/stats/count", statusCount);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProducts);
router.post("/avail", availCoupon);
router.delete("/:productId/:imageId", deleteImage);
module.exports = router;
