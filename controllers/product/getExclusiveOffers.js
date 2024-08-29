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

    // Calculate days left for each product
    exclusive.forEach((product) => {
      const today = new Date();
      const validTillDate = new Date(product.validTill); 
      const timeDiff = validTillDate.getTime() - today.getTime();
      const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); 

      if (daysLeft === 0) {
        product.daysLeft = `Today`;
      } else {
        product.daysLeft = daysLeft;
      }
    });

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