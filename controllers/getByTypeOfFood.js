const BusinessAll = require("../models/BuisnessAll.model");

const getByTypeOfBusiness = async (req, res, next) => {
  try {
    const { query } = req;
    console.log(query)
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;

    let matchStage = {};

    if (query.typeFood) {
      matchStage.typeFood = query.typeFood;
    } else {
      matchStage = {}; // explicitly set matchStage to an empty object
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
module.exports = getByTypeOfBusiness;