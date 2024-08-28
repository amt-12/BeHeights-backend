const ExclusiveOfferModel = require("../../models/ExclusiveOffer.model");

const getExclusiveOffers = async (req, res, next) => {
    try {
      const exclusiveOffers = await ExclusiveOfferModel.find().exec();
  
      if (!exclusiveOffers || exclusiveOffers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No exclusive offers found",
        });
      }
  
      res.json({
        success: true,
        status: 200,
        message: "Exclusive Offers retrieved successfully",
        exclusiveOffers,
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = getExclusiveOffers;