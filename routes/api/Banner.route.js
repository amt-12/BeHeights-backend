const router = require('express').Router();

const addBanner = require('../../controllers/addBanner.js');
const addBusinessBanner = require('../../controllers/addBusinessBanner.js');
const deleteBanner = require('../../controllers/deleteBanner.js');
const deleteBusinessBanner = require('../../controllers/deleteBusinessBanner.js');
const getAllBanner = require('../../controllers/getAllBanner.js');
const getAllBusinessBanner = require('../../controllers/getAllBusinessBanner.js');
const getBusinessByMail = require('../../controllers/getBusinessByMail.js');
const checkAuth = require("../../middlewares/check-auth")


/** HTTP Reqeust */
router.post('/add',checkAuth, addBanner);
router.post('/addBusiness',checkAuth, addBusinessBanner);
router.get('/getAllBanners', getAllBanner);
router.get('/getAllBusinessBanner',checkAuth, getAllBusinessBanner);
router.delete('/deleteBanners/:id',checkAuth, deleteBanner);
router.delete('/deleteBusinessBanners/:id',checkAuth, deleteBusinessBanner);



module.exports = router;