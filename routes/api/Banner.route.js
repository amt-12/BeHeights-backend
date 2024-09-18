const router = require('express').Router();

const addBanner = require('../../controllers/addBanner.js');
const addBusinessBanner = require('../../controllers/addBusinessBanner.js');
const deleteBanner = require('../../controllers/deleteBanner.js');
const deleteBusinessBanner = require('../../controllers/deleteBusinessBanner.js');
const getAllBanner = require('../../controllers/getAllBanner.js');
const getAllBusinessBanner = require('../../controllers/getAllBusinessBanner.js');
const getBusinessByMail = require('../../controllers/getBusinessByMail.js');


/** HTTP Reqeust */
router.post('/add', addBanner);
router.post('/addBusiness', addBusinessBanner);
router.get('/getAllBanners', getAllBanner);
router.get('/getAllBusinessBanner', getAllBusinessBanner);
router.delete('/deleteBanners/:id', deleteBanner);
router.delete('/deleteBusinessBanners/:id', deleteBusinessBanner);



module.exports = router;