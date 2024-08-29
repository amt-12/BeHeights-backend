const Category = require("../../models/Category.model");

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().exec();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};


module.exports = getAllCategory;
