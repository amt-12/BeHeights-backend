const express = require('express');
const BusinessAll = require('../models/BuisnessAll.model');

const getBusinessByMail = async (req, res, next) => {
  try {
    const { businessEmail } = req.params;
    console.log(businessEmail)
    const business = await BusinessAll.findOne({businessEmail});

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (error) {
    next(error);
  }
};

module.exports = getBusinessByMail;