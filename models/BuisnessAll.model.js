const mongoose = require("mongoose");

const businessAllSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,

  },
  businessType: {
    type: String,

  },

  
  location: {
    type: String,
    required: true,
    trim: true,
  },
  typeFood: {
    type: [String],
  },
  costPerPerson: {
    type: [Number],
    required: true,
  },
  tableTime: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
  },
  buffetPrice: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isAvailed: {
    type: String,
    default: false,
  },
  image: {
    type: String,
  },
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
  offer: {
    type: String,
  },
  subOffer: {
    type: String,
  },
  coupon: {
    type: {
      offer: String,
      subOffer: String,
    },
  },

  uniqueCode: {
    type: String,
  },
});

const BusinessAll = mongoose.model("BusinessAll", businessAllSchema);

module.exports = BusinessAll;
