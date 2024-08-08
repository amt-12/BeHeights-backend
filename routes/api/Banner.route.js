const router = require('express').Router();

const addBanner = require('../../controllers/addBanner.js');
const getAllBanner = require('../../controllers/getAllBanner.js');


/** HTTP Reqeust */
router.post('/update', addBanner);
router.get('/get', getAllBanner);



module.exports = router;