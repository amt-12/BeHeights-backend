const Product = require("../../models/Product.model");

const updateValidDate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { validDate } = req.body;
    console.log(id);
    console.log(req.body);
    
    // Find one product by id and update its coupon code and valid date
    const product = await Product.findOneAndUpdate(
      { _id: id},
      { $set: { "validTill": validDate } },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({ message: "Product or coupon not found" });
    }

    res.send({ message: "Coupon valid date updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateValidDate;
