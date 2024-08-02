const { Schema, model } = require("mongoose");

const resetPasswordSchema = new Schema({
  otp: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});



module.exports = model("ResetPassword", resetPasswordSchema, "resetpasswords");

