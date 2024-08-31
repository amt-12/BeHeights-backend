const Category = require("../../models/Category.model");
const createError = require("http-errors");

const addSubCategories = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { subCategories } = req.body;

    // Validate if subCategories is an object
    if (typeof subCategories !== 'object') {
      throw createError(400, "Subcategories must be an object");
    }

    // Convert subCategories object to array
    const subCategoriesArray = Object.values(subCategories);

    // Find the category by id
    const category = await Category.findById(categoryId);

    if (!category) {
      throw createError(404, "Category not found");
    }

    // Ensure category.subCategories is an array
    category.subCategories = category.subCategories || [];

    // Add subcategories to the category
    category.subCategories = [...category.subCategories, ...subCategoriesArray];

    // Save the updated category
    await category.save();

    res.json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = addSubCategories;