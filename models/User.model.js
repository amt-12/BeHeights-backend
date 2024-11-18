const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "business"],
      default: "user",
    },
    couponAvail: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    availedCoupons: [
      {
        uniqueCode: String,
        restaurantName: String,
        offer: String,
      },
    ],
    gender: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema, "users");
