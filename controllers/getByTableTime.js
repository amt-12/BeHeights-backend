const BusinessAll = require("../models/BuisnessAll.model");

const getByTableTime = async (req, res, next) => {
  try {
    const { query } = req;
    console.log(query)
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;

    let matchStage = {};

    if (query.tableTime && query.location) {
      matchStage = {
        $and: [
          { tableTime: { $eq: query.tableTime } },
          { location: { $eq: query.location } }
        ]
      };
    } else if (query.tableTime) {
      matchStage.tableTime = { $eq: query.tableTime };
    } else if (query.location) {
      matchStage.location = { $eq: query.location };
    }

    const restaurants = await BusinessAll.aggregate([
      {
        $match: matchStage,
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

module.exports = getByTableTime;