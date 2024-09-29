const BusinessAll = require("../models/BuisnessAll.model");
const { createError } = require("http-errors");
const getSingleBusinessName = async (req, res, next) => {
  try {
    const { businessName } = req.params;
    console.log(businessName);
    const business = await BusinessAll.findOne({ businessName: businessName });
    if (!business) {
      throw new Error("Business not found");
    }
    console.log(business);
    res.json({
      success: true,
      status: 200,
      message: "Business fetched successfully",
      business,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleBusinessName;
