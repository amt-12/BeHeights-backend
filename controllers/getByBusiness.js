const { debounce } = require("lodash");
const BusinessAll = require("../models/BuisnessAll.model");

const getByBusiness = debounce(async (req, res, next) => {
  try {
    const { query } = req;
    console.log(query);
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;
    const businessName = query.businessName;

    let pipeline = [];

    // Only add the match stage if businessName is provided
    if (businessName) {
      const matchStage = {
        $match: {
          businessName: { $regex: businessName, $options: 'i' }
        }
      };
      pipeline.push(matchStage);
    }

    pipeline.push({
      $facet: {
        data: [
          { $skip: startIndex },
          { $limit: parseInt(viewSize) }
        ],
        count: [
          {
            $count: "total"
          }
        ]
      }
    });

    const restaurants = await BusinessAll.aggregate(pipeline);

    res.json({
      success: true,
      status: 200,
      message: "Restaurants fetched successfully",
      count: restaurants?.[0]?.count?.[0]?.total,
      restaurants: restaurants?.[0]?.data
    });
  } catch (error) {
    next(error);
  }
}, 500); // debounce for 500ms

module.exports = getByBusiness;