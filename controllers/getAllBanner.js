const express = require('express');
const Banner = require("../models/Banner.model");
const createError = require("http-errors");
const { bannerValidation } = require("../services/validation_schema");

const getBanners = async (req, res, next) => {
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
      searchCriteria = {
        ...searchCriteria,
        isActive: status === "true" ? true : false,
      };
    }

    const banners = await Banner.aggregate([
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

    const totalCount = await Banner.countDocuments();

    res.json({
      success: true,
      status: 200,
      message: "Only one banner kept in the database",
      count: banners?.[0]?.count?.[0]?.total,
      activeCount:
        !!banners?.[0]?.activeCount?.[0]?.active === false
          ? 0
          : banners?.[0]?.activeCount?.[0]?.active,
      inActiveCount:
        !!banners?.[0]?.inactiveCount?.[0]?.inactive === false
          ? 0
          : banners?.[0]?.inactiveCount?.[0]?.inactive,
      banners: banners?.[0]?.data,
      totalCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getBanners;