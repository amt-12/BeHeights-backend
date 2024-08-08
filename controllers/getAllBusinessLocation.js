const BusinessAll = require("../models/BuisnessAll.model");

const getRestaurants = async (req, res, next) => {
  try {
    const { query } = req;
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;

    const restaurants = await BusinessAll.aggregate([
      {
        $match: {
          typeOfFood: "Snacks",
        },
      },
      {
        $facet: {
          data: [
            { $skip: startIndex },
            { $limit: parseInt(viewSize) },
          ],
          count: [
            {
              $count: "total",
            },
          ],
        },
      },
    ]);

    res.json({
      success: true,
      status: 200,
      message: "Restaurants fetched successfully",
      count: restaurants?.[0]?.count?.[0]?.total,
      restaurants: restaurants?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getRestaurants;