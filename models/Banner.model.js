const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
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

module.exports = model("Banner", bannerSchema, "banners");
