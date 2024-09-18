const mongoose = require("mongoose");

const businessAllSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessRegistration: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => {
    //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid email!`,
    // },
  },
  businessDescription: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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
    required: true,
  },
  
  businessCity: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  businessOff: {
    type: Number,
    required: true,
  },
  businessOption: {
    type: String,
    required: true,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  offerDetail: {
    type: String,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  offerTitle: {
    type: String,
    required: true,
  },
  validTill: {
    type: Date,
    required: true,
  },
  businessgst: {
    type: String,
  },
  image: {
    type: String,
  },
  coupon: {
    type: {
      offer: String,
      subOffer: String,
    },
  },
  
});

const BusinessAll = mongoose.model("BusinessAll", businessAllSchema);

module.exports = BusinessAll;