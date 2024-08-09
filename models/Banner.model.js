const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    specialOffer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Banner", bannerSchema, "banners");
