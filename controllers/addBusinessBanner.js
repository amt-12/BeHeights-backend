const Banner = require("../models/Banner.model");
const BusinessBannerModel = require("../models/BusinessBanner.model");
const { bannerValidation } = require('../services/validation_schema');

const addBusinessBanner = async (req, res, next) => {
  try {
    const AddSwiper = await bannerValidation.validateAsync(req.body);
    const { images } = AddSwiper ;

    if (!images) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the required fields',
      });
    }

    // Check the existing number of banners
    const existingBanners = await BusinessBannerModel.countDocuments();
    if (existingBanners >= 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum number of swiper reached (5)',
      });
    }

    const SwiperData = new BusinessBannerModel({
      
      images,
    
    });
    await SwiperData.save();

    res.status(201).json({
      success: true,
      message: 'Swiper added successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addBusinessBanner;