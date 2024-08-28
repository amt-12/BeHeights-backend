const ExclusiveOfferModel = require("../../models/ExclusiveOffer.model");
const mongoose = require("mongoose");

const getExclusiveOffers = async (req, res, next) => {
  try {
    const { query } = req;
    console.log(query)
    let matchStage = {};

    if (query.location) {
      matchStage.location = query.location;
    } else {
      // If no location is provided, match all documents
      matchStage = {};
    }

    const exclusive = await ExclusiveOfferModel.aggregate([
      {
        $match: matchStage,
      },
    ]);
    res.json({
      success: true,
      status: 200,
      message: "Exclusive Offers retrieved successfully",
      exclusive,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getExclusiveOffers;