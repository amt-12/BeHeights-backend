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

const router = require('express').Router();




router.post('/add', addBusiness);
router.post('/addTopBusiness', addTopBusiness);
router.get('/getAllTopBusiness', getAllTopBusinesses);
router.delete('/deleteTopBusiness/:id', deleteTopBusiness);
router.get('/get', getAllBusiness);
router.get('/getDropDown', getDropDown);
router.get('/get/:id', getSingleBusiness);
router.get('/addLocation', addLocation);
router.get('/getByLocation', getAllBusinessLocation);
router.get('/getByTypeOfBusiness', getByTypeOfBusiness);
//search by food
router.get('/getByTypeOfFood', getByTypeOfFood);
router.get('/getByBusiness', getByBusiness);
router.get('/getByTableTime', getByTableTime);
router.post('/images', uploadImage)
router.post('/businesses/:id', updateBusiness);
router.post('/addBusinessCoupon/:id', addBusinessCoupon)
//this api is adding new field coupon and sub offers in it and this api is to add sub offers under business
router.patch('/addNewOffer/:id', addNewOffer);
router.get('/getCouponsByTags', getCouponsByTags);
router.delete('/businesses/:id', deleteBusiness);

router.get('/getBusinessByMail/:businessEmail', getBusinessByMail);



module.exports = router;
