const mongoose = require('mongoose');

const businessCouponSchema = new mongoose.Schema({
  businessOff: {
    type: Number,
  },
  offerTitle: {
    type: String,
  },
  offerPrice: {
    type: Number,
  },
  offerDetail: {
    type: String,
  },
  validTill: {
    type: Date,
  },
  validFor: {
    type: String,
  },
  coupon: {
    type: [String],
  },
});

const BusinessCoupon = mongoose.model('BusinessCoupon', businessCouponSchema);

module.exports = BusinessCoupon;