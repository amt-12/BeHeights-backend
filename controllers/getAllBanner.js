const express = require('express');
const Banner = require("../models/Banner.model");
const createError = require("http-errors");
const { bannerValidation } = require("../services/validation_schema");

const getAllBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find().exec();
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBanners;