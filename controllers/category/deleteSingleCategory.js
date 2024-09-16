const Category = require("../../models/Category.model");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const deleteSingleCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { subCategoryName } = req.body;

    // Find the category by id
    const category = await Category.findById(categoryId);

    if (!category) {
      throw createError(404, "Category not found");
    }

    // Find the subcategory by name
    const subCategoryIndex = category.subCategories.findIndex((subCategory) => subCategory === subCategoryName);
// console.log(subCategoryIndex)
    if (subCategoryIndex === -1) {
      throw createError(404, "Subcategory not found");
    }

    // Remove the subcategory from the category
    category.subCategories.splice(subCategoryIndex, 1);

    // Save the updated category
    await category.save();

    res.json({
      success: true,
      status: 200,
      message: "Sub-Category Deleted Successfully",
    });  } catch (error) {
    next(error);
  }
};

module.exports = deleteSingleCategory;
