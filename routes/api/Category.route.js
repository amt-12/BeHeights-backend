const router = require("express").Router();

const addCategory = require("../../controllers/category/addCategory");
const getAllCategory = require("../../controllers/category/getAllCategory");
const updateCategory = require("../../controllers/category/updateCategory");
const deleteCategory = require("../../controllers/category/deleteCategory");
const addSubCategory = require("../../controllers/category/addSubCategory");
const getSingleCategory = require("../../controllers/category/getSingleCategory");
const deleteSubCategory = require("../../controllers/category/deleteSubCategory");
const getSingleCategoryDetails = require("../../controllers/category/getSingleCategoryDetails");
const getSubCategories = require("../../controllers/category/getSubCategories");
const deleteSingleCategory = require("../../controllers/category/deleteSingleCategory");
const checkAuth = require("../../middlewares/check-auth");

router.post("/add",checkAuth, addCategory);
router.post("/categories/:categoryId/subcategories",checkAuth, getSubCategories);
router.delete("/categories/:categoryId",checkAuth, deleteSingleCategory);
router.get("/getAllCategory",getAllCategory);
router.delete("/:id",checkAuth, deleteCategory);
router.put("/:id",checkAuth, updateCategory);
router.get("/:id",checkAuth, getSingleCategory);
router.get("/getSingleCategoryDetails/:id", checkAuth,getSingleCategoryDetails);
router.post("/:categoryId",checkAuth, addSubCategory);



router.delete("/subCategory/:id", deleteSubCategory);

module.exports = router;
