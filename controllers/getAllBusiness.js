const createError = require("http-errors");
const BusinessAll = require("../models/BuisnessAll.model");

const getAllBusinesses = async (req, res, next) => {
  try {
    const { name, keyword, status } = req.query;
    let searchCriteria = {};

    if (keyword) {
      searchCriteria["$or"] = [
        {
          name: { $regex: `${keyword}`, $options: "i" },
        },
        {
          description: { $regex: `${keyword}`, $options: "i" },
        },
      ];
    }

    if (status) {
      if (status === "false") {
        searchCriteria = {
          ...searchCriteria,
          isActive: false,
        };
      } else {
        searchCriteria = {
          ...searchCriteria,
          isActive: true,
        };
      }
    }

    const businesses = await BusinessAll.find(searchCriteria);

    res.json({
      success: true,
      status: 200,
      message: "Businesses fetched successfully",
      count: businesses.length,
      businesses: businesses,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBusinesses;