const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
    images:{
      type: String,
      required: true,
    },
    businessName: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Banner", bannerSchema, "banners");
