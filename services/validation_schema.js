const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(50),
  role: Joi.string(),
  couponAvail: Joi.boolean(),
  gender:Joi.string(),
  confirmPassword:Joi.string().required()

});
const businessValidation = Joi.object({
  businessName: Joi.string().required(),
  businessRegistration: Joi.string().required(),
  businessEmail: Joi.string().email().required(),
  businessDescription: Joi.string().required(),
  businessAddress: Joi.string().required(),
  ownerName: Joi.string().required(),
  phone: Joi.string().required(),
  websiteUrl: Joi.string().optional(),
  instagramUrl: Joi.string().optional(),
  faceBookUrl: Joi.string().optional(),
  customerServiceContact: Joi.string().required(),
  businessCity: Joi.string().required(),
  pinCode: Joi.number().required(),
  businessOff: Joi.number().required(),
  businessOption: Joi.string().required(),
  businessOption: Joi.string().required(),
  openingTime: Joi.string().required(),
  closingTime: Joi.string().required(),
  isActive: Joi.boolean().required(),
  location: Joi.string().required(),
  offerDetail: Joi.string().required(),
  offerPrice: Joi.number().required(),
  offerTitle: Joi.string().required(),
  validTill: Joi.date().required(),
  businessgst:Joi.string(),
  image:Joi.string(),
  locationUrl: Joi.string().required(),

});
const businessUpdateValidation = Joi.object({
  businessName: Joi.string(),
  businessRegistration: Joi.string(),
  businessEmail: Joi.string().email(),
  businessDescription: Joi.string(),
  businessAddress: Joi.string(),
  ownerName: Joi.string(),
  phone: Joi.string(),
  websiteUrl: Joi.string().optional(),
  instagramUrl: Joi.string().optional(),
  faceBookUrl: Joi.string().optional(),
  customerServiceContact: Joi.string(),
  businessCity: Joi.string(),
  pinCode: Joi.number(),
  businessOff: Joi.number(),
  businessOption: Joi.string(),
  businessOption: Joi.string(),
  openingTime: Joi.string(),
  closingTime: Joi.string(),
  isActive: Joi.boolean(),
  location: Joi.string(),
  offerDetail: Joi.string(),
  offerPrice: Joi.number(),
  offerTitle: Joi.string(),
  validTill: Joi.date(),
  businessgst:Joi.string(),
  image:Joi.string(),
  locationUrl: Joi.string(),

});
const businessCouponValidation = Joi.object({
  offerName: Joi.string(),
  offerDescription: Joi.string(),
  offerDiscount: Joi.number(),
});
const updateValidation = Joi.object({
  email: Joi.string().email().required(),
  newEmail: Joi.string().email().required(),
});
const bannerValidation = Joi.object({
  images: Joi.string(),
  businessName: Joi.string(),
});
const OtpValidation = Joi.object({
  email: Joi.string().email().required(),
});
const updateProspectValidation = Joi.object({
  status: Joi.string().required(),
  rejectionCause: Joi.string().allow(""),
  role: Joi.string().allow(""),
});
const paymentValidation = Joi.object({
  totalAmount: Joi.number().required(),
  modeOfPayment: Joi.string().required(),
  paymentType: Joi.string().required(),
  partiallyPaidAmount: Joi.number().allow(""),
  dueDate: Joi.number().allow(""),
  chequeDate: Joi.date().allow(""),
  notes: Joi.string().allow(""),
});
const categoryValidation = Joi.object({
  name: Joi.string(),
  tax: Joi.number().allow(""),
  parent: Joi.string(),
});
const productValidation = Joi.object({
  restaurantName:Joi.string(),
  offer:Joi.string().required(),
  subOffer:Joi.string().required(),
  uniqueCode:Joi.string().required(),
  validTill:Joi.date().required(),
  role:Joi.string(),
  userEmail:Joi.string(),
  limit:Joi.number(),
});
const businessProductValidation = Joi.object({
  offer:Joi.string().required(),
  subOffer:Joi.string().required(),
  uniqueCode:Joi.string().required(),
  validTill:Joi.date().required(),
  role:Joi.string(),
  userEmail:Joi.string(),
});
const productBannerValidation = Joi.object({
  title:Joi.string().required(),
  offer:Joi.string().required(),
  subOffer:Joi.string().required(),
  uniqueCode:Joi.string().required(),
  validTill:Joi.date().required(),
  role:Joi.string(),
  userEmail:Joi.string(),
});
const exclusiveOfferValidation = Joi.object({
  businessName:Joi.string(),
  location:Joi.string(),
  offer:Joi.string(),
  subOffer:Joi.string(),
  uniqueCode:Joi.string(),
  location:Joi.string(),
  validTill:Joi.date(),
});
const CouponValidation = Joi.object({
  uniqueCode:Joi.string().required(),
  userId:Joi.string().required(),
});
const orderValidation = Joi.object({
  productData: Joi.array().required(),
  paymentmethod: Joi.string().allow(""),
  taxValue: Joi.number().allow(""),
  subTotalValue: Joi.number().allow(""),
  type: Joi.string(),
  address: Joi.object({
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    city: Joi.string(),
    country_code: Joi.string(),
    postal_code: Joi.string(),
    state_code: Joi.string(),
    state: Joi.string(),
  }),
});

const skuValidation = Joi.object({
  sku: Joi.string().required(),
  price: {
    wholesaler_price: Joi.number().required(),
    retailer_price: Joi.number().required(),
    distributor_price: Joi.number().required(),
    myPrice: Joi.number().required(),
  },
  attributesVal: Joi.string().required(),
  // inventory: Joi.number().required(),
  barcode: Joi.string().required(),
  volume: Joi.allow(""),
});

const contactUsValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  description: Joi.string().required(),
});

const cartValidation = Joi.object({
  items: {
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  },
});

const wishlistValidation = Joi.object({
  items: {
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  },
});

const updateUserPrivacyValidation = Joi.object({
  is_private: Joi.boolean(),
});

const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(2).required(),
});
const loginAdminValidation = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().min(2).required(),
});

const emailValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const passwordValidation = Joi.object({
  password: Joi.string().min(2).required(),
});

const createPostValidation = Joi.object({
  name: Joi.string().allow("").optional(),
  price: Joi.number(),
  mentions: Joi.string(),
  media_type: Joi.string().valid("image", "video", "audio", "text").required(),
  type: Joi.string().valid("open", "subscription", "premium").required(),
  is_highlight: Joi.boolean(),
  thumbnail: Joi.any(),
});

const postRatingValidation = Joi.object({
  rating: Joi.number().greater(0).less(6).required(),
});

const createMessageGroupValidation = Joi.object({
  usersList: Joi.array(),
  type: Joi.string().valid("single", "group").required(),
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(2).max(1000),
});

const createFollowRequestUpdateValidation = Joi.object({
  status: Joi.string().valid("accepted", "rejected").required(),
});

const getMessageGroupValidation = Joi.object({
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const getPostsStatsValidation = Joi.object({
  id: Joi.string().required(),
});

const newMessageValidation = Joi.object({
  conversationId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  type: Joi.string().valid("image", "video", "audio", "text").required(),
  message: Joi.string().required(),
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const newNotificationValidation = Joi.object({
  actor: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  verb: Joi.string()
    .valid(
      "post",
      "rate",
      "comment",
      "follow-request",
      "follow-accept",
      "post-mention"
    )
    .required(),
  object: Joi.string().required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const createGiftValidation = Joi.object({
  name: Joi.string().required(),
  cost: Joi.number().required(),
});
const paymentTypeValidation = Joi.object({
  type: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = {
  registerValidation,
  loginValidation,
  updateProspectValidation,
  bannerValidation,
  categoryValidation,
  productValidation,
  wishlistValidation,
  contactUsValidation,
  orderValidation,
  skuValidation,
  paymentValidation,
  loginAdminValidation,
  OtpValidation,
  CouponValidation,
  updateValidation,
  businessValidation,
  businessCouponValidation,
  businessProductValidation,
  exclusiveOfferValidation,
  productBannerValidation,
  businessUpdateValidation
};
