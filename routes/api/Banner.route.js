const router = require('express').Router();

const addBanner = require('../../controllers/addBanner.js');
const deleteBanner = require('../../controllers/deleteBanner.js');
const getAllBanner = require('../../controllers/getAllBanner.js');


/** HTTP Reqeust */
router.post('/add', addBanner);
router.get('/getAllBanners', getAllBanner);
router.delete('/deleteBanners/:id', deleteBanner);

module.exports = router;