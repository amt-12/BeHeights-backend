const { Schema, model } = require("mongoose");


const ExclusiveOffer = new Schema(
  {
    offer: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    subOffer: {
      type: String,
      required: true,
    },
    uniqueCode: {
      type: String,
      required: true,
    },
    isAvail: {
      type: Boolean,
      default: false,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    location:{
      type:String,
      required:true
    },
    validTill: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ExclusiveOffer", ExclusiveOffer, "ExclusiveOffer");
