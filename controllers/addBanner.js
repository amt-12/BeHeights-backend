const express = require('express');
const Banner = require("../models/Banner.model");
const { bannerValidation } = require('../services/validation_schema');

const router = express.Router();

const addBanner = async (req, res, next) => {
  try {
    const updateBanner = await bannerValidation.validateAsync(req.body);
    const { quote, specialOffer,code } = updateBanner;
    if (!updateBanner) {
      return res.status(400).json({
        success: false,
        message: 'Please provide banner details',
      });
    }
    const banner = new Banner({
      quote,
      specialOffer,
      code
    });
    await banner.save();
    res.status(200).json({
      success: true,
      message: 'Banner details added successfully',
      quote:quote,
      specialOffer:specialOffer,
      code:code
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addBanner;