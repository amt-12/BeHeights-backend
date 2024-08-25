const router = require("express").Router();

const register = require("../../controllers/auth/register");
const loginUser = require("../../controllers/auth/login");
const resetPassword = require("../../controllers/auth/resetPassword");
const verifyOtp = require("../../controllers/auth/verifyOTP");
const sendOtp = require("../../controllers/auth/sendOtp");
const registerOtp = require("../../controllers/auth/registerOtp");
const verifyDirectOTP = require("../../controllers/auth/verifyDirectOTP");
const updateProfile = require("../../controllers/auth/updateProfile");
const updatePassword = require("../../controllers/user/updatePassword");


router.post("/register", register);
router.post("/registerOtp", registerOtp);
router.post("/update", updateProfile);
router.post("/updatePassword", updatePassword);
router.post("/login", loginUser);
router.post("/sendOtp", sendOtp);
router.post("/resetPassword/:token", resetPassword);
router.post("/verifyOtp", verifyOtp);
router.post("/verifyDirectOtp", verifyDirectOTP);


module.exports = router;
