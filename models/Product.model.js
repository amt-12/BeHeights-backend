const { Schema, model } = require("mongoose");


const ProductSchema = new Schema(
  {
    offer: {
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
    validTill: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
  },
  limit:{
    type:String,
    // required:true
  },
  restaurantName:{
    type:String
  },
  redeemedCount: { type: Number, default: 0 }, 

  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema, "products");
