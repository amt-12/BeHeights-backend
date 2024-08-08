const express = require('express');
const Banner = require("../models/Banner.model");

const router = express.Router();

const addBanner = async (req, res, next) => {
  try {
    const { quote, specialOffer } = req.body;
    if (!quote || !specialOffer) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both quote and special offer',
      });
    }

    // Save banner details to database (e.g., MongoDB)
    const banner = await Banner.create({ quote, specialOffer });

    res.status(201).json({
      success: true,
      message: 'Banner details added successfully',
      data: banner,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addBanner;