const BannerModel = require("../models/Banner.model");

const deleteBanner = async (req, res, next) => {
    try {
      const bannerId = req.params.id;
      if (!bannerId) {
        return res.status(400).json({
          success: false,
          message: 'Please provide the banner ID',
        });
      }
  
      const banner = await BannerModel.findById(bannerId);
      if (!banner) {
        return res.status(404).json({
          success: false,
          message: 'Banner not found',
        });
      }
  
      await banner.remove();
  
      res.status(200).json({
        success: true,
        message: 'Banner deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = deleteBanner;