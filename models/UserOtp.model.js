const { Schema, model } = require("mongoose");

const UserModelSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin","business"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("UserOtp", UserModelSchema, "usersOtp");
