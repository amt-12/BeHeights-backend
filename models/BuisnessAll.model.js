const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: String,
  offer: String,
  subOffer: String,
  price: Number,
  validFor: String,
  validTill: Date,
  tags: [{ type: String }]
});

const businessAllSchema = new mongoose.Schema({
  businessName: {
    type: String,
    
  },
  businessRegistration: {
    type: String,
    
  },
  businessEmail: {
    type: String,
    
  },
  businessDescription: {
    type: String,
    
  },
  businessAddress: {
    type: String,
    
  },
  ownerName: {
    type: String,
    
  },
  phone: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  instagramUrl: {
    type: String,
  },
  faceBookUrl: {
    type: String,
  },
  customerServiceContact: {
    type: String,
  },
  businessCity: {
    type: String,
  },
  pinCode: {
    type: Number,
  },
  businessOff: {
    type: Number,
  },
  businessOption: {
    type: String,
  },
  openingTime: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  isActive: {
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
  validTill: {
    type: Date,
  },
  businessgst: {
    type: String,
  },
  image: {
    type: String,
  },
  locationUrl: {
    type: String,
  },
  coupon: [couponSchema]
});

businessAllSchema.pre('save', function(next) {
  this.businessEmail = this.businessEmail.toLowerCase();
  next();
});

const BusinessAll = mongoose.model("BusinessAll", businessAllSchema);

module.exports = BusinessAll;