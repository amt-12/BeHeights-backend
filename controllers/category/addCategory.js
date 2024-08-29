const Category = require("../../models/Category.model");
const createError = require("http-errors");
const formidable = require("formidable");
const uploadFiles = require("../../services/upload-files");

const addCategory = async (req, res, next) => {
  try {
    const { name,images } = req.body;
    const findCategory = await Category.findOne({ name });

    if (findCategory) {
      return res.status(404).json({ message: 'Category already exists.' });
    }
    if (!images || !name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all the required fields',
      });
    }
    const category = new Category({ name,images });
    await category.save();

    res.json({ success: true, status: 201, message: 'Category created successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = addCategory;
