const addBusiness = require('../../controllers/addBusiness');
const addBusinessCoupon = require('../../controllers/addBusinessCoupon');
const deleteBusiness = require('../../controllers/deleteBusiness');
const getAllBusiness = require('../../controllers/getAllBusiness');
const getAllBusinessLocation = require('../../controllers/getAllBusinessLocation');
const getByTableTime = require('../../controllers/getByTableTime');
const getByTypeOfBusiness = require('../../controllers/getByTypeOfBusiness');
const getSingleBusiness = require('../../controllers/getSingleBusiness');
const updateBusiness = require('../../controllers/updateBusiness');
const updateBusinessCoupon = require('../../controllers/updateBusinessCoupon');
const uploadImage = require('../../controllers/uploadImage');
const addNewOffer = require('../../controllers/addNewOffer');
const getByTypeOfFood = require('../../controllers/getByTypeOfFood');
const getByBusiness = require('../../controllers/getByBusiness');
const addLocation = require('../../controllers/addLocation');
const addTopBusiness = require('../../controllers/addTopBusiness');
const getAllTopBusinesses = require('../../controllers/getAllTopBusiness');
const deleteTopBusiness = require('../../controllers/deleteTopBusiness');
const getDropDown = require('../../controllers/getDropDown');
const getBusinessByMail = require('../../controllers/getBusinessByMail');
const getCouponsByTags = require('../../controllers/getCouponsByTags');
const checkAuth = require("../../middlewares/check-auth");
const getSingleBusinessName = require('../../controllers/getSingleBusinessName');

const router = require('express').Router();




router.post('/add',checkAuth, addBusiness);
router.post('/addTopBusiness', checkAuth,addTopBusiness);
router.get('/getAllTopBusiness',checkAuth, getAllTopBusinesses);
router.delete('/deleteTopBusiness/:id',checkAuth, deleteTopBusiness);
router.get('/get', getAllBusiness);
router.get('/getDropDown',checkAuth, getDropDown);
router.get('/get/:id', checkAuth,getSingleBusiness);
router.get('/getBusinessName/:businessName', checkAuth,getSingleBusinessName);
router.get('/addLocation', checkAuth,addLocation);
router.get('/getByLocation',checkAuth, getAllBusinessLocation);
router.get('/getByTypeOfBusiness',checkAuth, getByTypeOfBusiness);
//search by food
router.get('/getByTypeOfFood',checkAuth, getByTypeOfFood);
router.get('/getByBusiness', checkAuth,getByBusiness);
router.get('/getByTableTime', checkAuth,getByTableTime);
router.post('/images', checkAuth,uploadImage)
router.put('/businesses/:id', checkAuth,updateBusiness);
router.post('/addBusinessCoupon/:id',checkAuth, addBusinessCoupon)
//this api is adding new field coupon and sub offers in it and this api is to add sub offers under business
router.patch('/addNewOffer/:id', checkAuth,addNewOffer);
router.get('/getCouponsByTags', checkAuth,getCouponsByTags);
router.delete('/businesses/:id',checkAuth, deleteBusiness);

router.get('/getBusinessByMail/:businessEmail',checkAuth, getBusinessByMail);



module.exports = router;
