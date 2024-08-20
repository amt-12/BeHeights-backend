const createError = require("http-errors");
const BusinessAll = require("../models/BuisnessAll.model");

const getAllBusinesses = async (req, res, next) => {
  try {
    const { name, keyword, status } = req.query;
    const { query } = req;
    const startIndex = (query.startIndex && parseInt(query.startIndex)) || 0;
    const viewSize = (query.viewSize && parseInt(query.viewSize)) || 10;
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

    const businesses = await BusinessAll.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $facet: {
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },
            { $skip: startIndex },
            { $limit: parseInt(viewSize) },
          ],
          count: [
            {
              $count: "total",
            },
          ],
          activeCount: [
            {
              $match: {
                $and: [searchCriteria, { isActive: true }],
              },
            },
            {
              $count: "active",
            },
          ],
          inactiveCount: [
            {
              $match: {
                $and: [searchCriteria, { isActive: false }],
              },
            },
            {
              $count: "inactive",
            },
          ],
        },
      },
    ]);

    res.json({
      success: true,
      status: 200,
      message: "Businesses fetched successfully",
      count: businesses?.[0]?.count?.[0]?.total,
      activeCount:
        !!businesses?.[0]?.activeCount?.[0]?.active === false
          ? 0
          : businesses?.[0]?.activeCount?.[0]?.active,
      inActiveCount:
        !!businesses?.[0]?.inactiveCount?.[0]?.inactive === false
          ? 0
          : businesses?.[0]?.inactiveCount?.[0]?.inactive,
      businesses: businesses?.[0]?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllBusinesses;