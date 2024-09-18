const express = require('express');

const BusinessBannerModel = require('../models/BusinessBanner.model');

const getAllBusinessBanner = async (req, res, next) => {
  try {
    const banners = await BusinessBannerModel.find().exec();
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBusinessBanner;