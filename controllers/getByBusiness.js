const BusinessAll = require("../models/BuisnessAll.model");

const getAllBusiness = async (req, res, next) => {
  try {
    const searchQuery = req.query.search;
    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Please provide a search query",
      });
    }

    const restaurants = await BusinessAll.aggregate([
      {
        $match: {
          businessName: { $regex: `^${searchQuery}`, $options: "i" },
        },
      },
      {
        $facet: {
          data: [],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);

    if (restaurants[0].count[0].total === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No business found matching the search query",
      });
    }

    res.json({
      success: true,
      status: 200,
      message: "Businesses fetched successfully",
      count: restaurants[0].count[0].total,
      restaurants: restaurants[0].data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBusiness;