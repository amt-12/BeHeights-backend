const { Schema, model } = require("mongoose");

const ProductMedia = new Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

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
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema, "products");
