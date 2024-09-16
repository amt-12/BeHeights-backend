const createError = require("http-errors");
const BusinessAll = require("../models/BuisnessAll.model");

const getDropDown = async (req, res, next) => {
  try {
    const businesses = await BusinessAll.find().select('businessName');

    const dropdownOptions = businesses.map((business) => ({
      label: business.businessName,
      value: business.businessName,
    }));
console.log(dropdownOptions)
    res.json({
      success: true,
      status: 200,
      message: "Businesses fetched successfully",
      options: dropdownOptions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getDropDown;

