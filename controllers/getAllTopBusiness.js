const TopBusiness = require("../models/TopBusiness.model");

const getAllTopBusinesses = async (req, res, next) => {
  try {
    const topBusinesses = await TopBusiness.find().exec();
    res.status(200).json(topBusinesses);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getAllTopBusinesses;