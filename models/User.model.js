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
      enum: ["user", "admin","business"],
      default: "user",
    },
    couponAvail: {
      type: Boolean,
      default: false,
    },
    token:{
      type: String,
    },
    availedCoupons: {
      type: [String], // Define availedCoupons as an array of strings
      default: [], // Initialize it with an empty array by default
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema, "users");
