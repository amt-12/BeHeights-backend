const express = require("express");
const Banner = require("../models/Banner.model");
const { businessValidation } = require("../services/validation_schema");
const BusinessAll = require("../models/BuisnessAll.model");

const router = express.Router();

const addBusiness = async (req, res, next) => {
  try {
    const business = await businessValidation.validateAsync(req.body);
    const uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
console.log(req.body)
    const {
      businessName,
      businessType,
      location,
      typeOfFood,
      cost,
      tableTime,
      buffetPrice,
      isActive,
      image,
      businessOff,
      offerTitle,
      offerPrice,
      offerDetail,
      validTill,
      validFor,
    } = business;

    const existingBusiness = await BusinessAll.findOne({ businessName });
    if (existingBusiness) {
      return res.status(400).json({
        success: false,
        message: "Business name already exists",
      });
    }

    const businessData = new BusinessAll({
      businessName,
      businessType,
      location,
      typeOfFood,
      cost,
      tableTime,
      buffetPrice,
      isActive,
      image,
      businessOff,
      offerTitle,
      offerPrice,
      offerDetail,
      validTill,
      validFor,
      uniqueCode,
    });
    await businessData.save();
    console.log(businessData);
    res.status(201).json({
      businessData,

      success: true,
      message: "Business Details added successfully",
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details,
      });
    }
    next(error);
  }
};

module.exports = addBusiness;
