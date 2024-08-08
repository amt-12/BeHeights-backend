const { Schema, model } = require("mongoose");

const UserUpdateSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserUpdateSchema, "usersUpdate");
