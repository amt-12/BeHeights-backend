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

const router = require('express').Router();




router.post('/add', addBusiness);
router.get('/get', getAllBusiness);
router.get('/get/:id', getSingleBusiness);
router.get('/getByLocation', getAllBusinessLocation);
router.get('/getByTypeOfBusiness', getByTypeOfBusiness);
//search by food
router.get('/getByTypeOfFood', getByTypeOfFood);
router.get('/getByTableTime', getByTableTime);
router.post('/images', uploadImage)
router.post('/businesses/:id', updateBusiness);
router.post('/addBusinessCoupon/:id', addBusinessCoupon)
//this api is adding new field coupon and sub offers in it 
router.patch('/addNewOffer/:id', addNewOffer);
router.delete('/businesses/:id', deleteBusiness);



module.exports = router;
