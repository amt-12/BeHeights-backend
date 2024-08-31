const { Schema, model } = require("mongoose");

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
  },
  subCategories: [{ 
    type: String 
  }]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", Category, "categories");
