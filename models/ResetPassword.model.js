const { Schema, model } = require("mongoose");

const resetPasswordSchema = new Schema({
  email: {
    type: String,
    required: true
  },

});



module.exports = model("ResetPassword", resetPasswordSchema, "resetpasswords");

