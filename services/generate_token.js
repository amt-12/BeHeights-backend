const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const crypto = require("crypto");

const { accessSecret, refreshSecret } = require("../config/keys").jwt;

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, accessSecret);
  if (!token) return createError.InternalServerError();
  return token;
};

const generateRefreshToken = (payload, ) => {
  const token = jwt.sign(payload, refreshSecret);
  if (!token) return createError.InternalServerError();
  return token;
};

const generateCryptoKey = () => crypto.randomBytes(32).toString("hex");

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateCryptoKey,
};
