const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const User = require("../../models/User.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/generate_token");
const { loginValidation } = require("../../services/validation_schema");
const { accessSecret } = require("../../config/keys").jwt;

const loginUser = async (req, res, next) => {
  try {
    const result = await loginValidation.validateAsync(req.body);
    const { email, password } = result;

    const userLogin = await User.findOne({ email, isVerified: true });
    if (!userLogin)
      throw createError.BadRequest("Email is not registered or not verified");
    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      throw createError.BadRequest("Incorrect password. Please try again.");
    }
    const payload = {
      name: userLogin.name,
      _id: userLogin._id,
      phone: userLogin.phone,
      email: userLogin.email,
      role: userLogin.role,
      gender:userLogin.gender
    };

    const accessToken = generateAccessToken(payload, accessSecret);
    // const accessToken = generateRefreshToken(payload, refreshTokenLife);

    if (accessToken) {
      userLogin.accessToken = accessToken; // add accessToken to userLogin
      await userLogin.save(); // save the userLogin document

      res.cookie("auth", accessToken, { httpOnly: true });

      res.status(200).json({
        message: "Login successful !!",
        success: true,
        accessToken,
        user: payload,
      });
    }
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = loginUser;