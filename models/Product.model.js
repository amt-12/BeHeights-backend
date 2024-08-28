const { Schema, model } = require("mongoose");


const ProductSchema = new Schema(
  {
    offer: {
      type: String,
      required: true,
    },
    resturantName: {
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
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema, "products");
