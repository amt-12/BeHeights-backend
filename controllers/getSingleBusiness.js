const BusinessAll = require("../models/BuisnessAll.model");

const getSingleBusiness = async (req, res, next) => {
  try {
    const { id } = req.params;
    const business = await BusinessAll.findById(id);

    if (!business) {
      return next(createError(404, "Business not found"));
    }

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

module.exports = getSingleBusiness;