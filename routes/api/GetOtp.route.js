const router = require('express').Router();

const {getbill } = require('../../controllers/appController.js')


/** HTTP Reqeust */
router.post('/getotp', getbill);


module.exports = router;