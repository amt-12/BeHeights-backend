const addBusiness = require('../../controllers/addBusiness');
const getAllBusiness = require('../../controllers/getAllBusiness');
const getAllBusinessLocation = require('../../controllers/getAllBusinessLocation');
const getByTableTime = require('../../controllers/getByTableTime');
const getByTypeOfBusiness = require('../../controllers/getByTypeOfBusiness');
const uploadImage = require('../../controllers/uploadImage');

const router = require('express').Router();




router.post('/add', addBusiness);
router.get('/get', getAllBusiness);
router.get('/getByLocation', getAllBusinessLocation);
router.get('/getByTypeOfBusiness', getByTypeOfBusiness);
router.get('/getByTableTime', getByTableTime);
router.post('/images', uploadImage)



module.exports = router;