const { Schema, model } = require("mongoose");

const BusinessBannerSchema = new Schema(
  {
    images:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("BusinessBanner", BusinessBannerSchema, "BusinessBanner");
