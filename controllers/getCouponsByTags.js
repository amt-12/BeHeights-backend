const BusinessAll = require("../models/BuisnessAll.model");
const getCouponsByTags = async (req, res, next) => {
  try {
    const tags = req.query.tags; // Get tags from the query string

    if (!tags) {
      return res.status(400).json({
        success: false,
        message: "Please provide tags to search for",
      });
    }

    const businesses = await BusinessAll.find({
      coupon: {
        $elemMatch: {
          tags: { $in: tags.split(',') } // Match tags in the coupon array
        }
      }
    });

    if (!businesses || !businesses.length) {
      return res.status(404).json({
        success: false,
        message: "No businesses found with the specified tags",
      });
    }

    res.status(200).json({
      success: true,
      message: "Businesses found",
      businesses: businesses.map(business => ({
        _id: business._id,
        businessName: business.businessName,
        businessEmail: business.businessEmail,
        businessgst: business.businessgst,
        businessRegistration: business.businessRegistration,
        businessDescription: business.businessDescription,
        businessAddress: business.businessAddress,
        ownerName: business.ownerName,
        phone: business.phone,
        websiteUrl: business.websiteUrl,
        instagramUrl: business.instagramUrl,
        faceBookUrl: business.faceBookUrl,
        customerServiceContact: business.customerServiceContact,
        businessCity: business.businessCity,
        pinCode: business.pinCode,
        businessOption: business.businessOption,
        openingTime: business.openingTime,
        closingTime: business.closingTime,
        location: business.location,
        isActive: business.isActive,
        image: business.image,
        businessOff: business.businessOff,
        offerTitle: business.offerTitle,
        offerPrice: business.offerPrice,
        offerDetail: business.offerDetail,
        validTill: business.validTill,
        coupon: business.coupon.find(coupon => coupon.tags.some(tag => tags.includes(tag)))
      }))
    });
  } catch (error) {
    next(error);
  }
};
  
  module.exports = getCouponsByTags;
  