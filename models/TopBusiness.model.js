const mongoose = require('mongoose');

const TopBusinessSchema = new mongoose.Schema({
  businessName: {
    type: String,
    
  },
  businessOff: {
    type: Number,
   
  },
  businessType: {
    type: String,
   
  },
  costPerPerson: {
    type: Array,
    default: []
  },
  coupon: {
    type: Array,
    default: []
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  isAvailed: {
    type: String,
  },
  isChecked: {
    type: Boolean,
  },
  location: {
    type: String,
  },
  offerDetail: {
    type: String,
  },
  offerPrice: {
    type: Number,
  },
  offerTitle: {
    type: String,
  },
  tableTime: {
    type: Array,
    default: []
  },
  typeFood: {
    type: Array,
    default: []
  },
  uniqueCode: {
    type: String,
  },
  validFor: {
    type: String,
  },
  validTill: {
    type: Date,
  }
});

const TopBusiness = mongoose.model('TopBusiness', TopBusinessSchema);

module.exports = TopBusiness;