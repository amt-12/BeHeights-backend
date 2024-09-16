const TopBusiness = require("../models/TopBusiness.model");

const deleteTopBusiness = async (req, res, next) => {
  try {
    const { id } = req.params; // assuming the ID of the Top Business is passed as a URL parameter
    const topBusiness = await TopBusiness.findByIdAndRemove(id);
    if (!topBusiness) {
      res.status(404).json({ message: "Top Business not found" });
      return;
    }
    res.status(200).json({ message: "Top Business deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = deleteTopBusiness;