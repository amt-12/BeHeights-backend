const createError = require("http-errors");
const Product = require("../../models/Product.model");
const { ObjectId } = require("mongoose").Types;

const getSingleProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uniqueCode = req.query.uniqueCode; // assuming the unique code is passed as a query parameter

    const product = await Product.aggregate([
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "addProductName",
          localField: "productNameId",
          foreignField: "_id",
          as: "productName",
        },
      },
      {
        $unwind: {
          path: "$productName",
          preserveNullAndEmptyArrays: true,
        },
      },
      // ... other lookup and unwind stages ...
      {
        $addFields: {
          isVerified: {
            $eq: ["$uniqueCode", uniqueCode],
          },
        },
      },
      // ... other addFields stages ...
    ]);

    if (product[0].isVerified) {
      // update the product document to set isVerified to true
      await Product.updateOne({ _id: ObjectId(id) }, { $set: { isVerified: true } });
    }

    res.json({
      success: true,
      status: 200,
      message: "Product fetched successfully",
      product: product[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getSingleProducts;