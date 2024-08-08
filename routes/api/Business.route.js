const addBusiness = require('../../controllers/addBusiness');
const getAllBusiness = require('../../controllers/getAllBusiness');
const getAllBusinessLocation = require('../../controllers/getAllBusinessLocation');

const router = require('express').Router();




/** HTTP Reqeust */
router.post('/add', addBusiness);
router.get('/get', getAllBusiness);
router.get('/getByLocation', getAllBusinessLocation);



module.exports = router;