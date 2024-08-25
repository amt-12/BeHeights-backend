const express = require('express');
const Banner = require("../models/Banner.model");
const { businessValidation } = require('../services/validation_schema');
const BusinessAll = require('../models/BuisnessAll.model');

const router = express.Router();

const addBusiness = async (req, res, next) => {
  try {
    const business = await businessValidation.validateAsync(req.body);
    const { businessName, typeOfBusiness, location, typeOfFood,cost,tableTime,buffetPrice,isActive,images, businessOff,offerTitle,offerPrice,offerDetail,validTill,validFor } = business ;

    if (!businessName || !typeOfBusiness || !location  || !cost || !images) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all the required fields',
      });
    }

    const existingBusiness = await BusinessAll.findOne({ businessName });
    if (existingBusiness) {
      return res.status(400).json({
        success: false,
        message: 'Business name already exists',
      });
    }

    const businessData = new BusinessAll({
      businessName,
      typeOfBusiness,
      location,
      typeOfFood,
      cost,
      tableTime,
      buffetPrice,
      isActive,
      images,
      businessOff,
      offerTitle,
      offerPrice,
      offerDetail,
      validTill,
      validFor,
    });
    await businessData.save();

    res.status(201).json({
      success: true,
      message: 'Business Details added successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addBusiness;