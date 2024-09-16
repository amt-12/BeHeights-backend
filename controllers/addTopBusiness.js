const TopBusiness = require("../models/TopBusiness.model");

const addTopBusiness = async (req, res, next) => {
  try {
    const { selectedItems } = req.body; 
    console.log(selectedItems)
    if (Array.isArray(selectedItems)) {
      // Count the number of existing top businesses
      const count = await TopBusiness.countDocuments();
      console.log(count)
      // Check if the count is already 10 or more
      if (count >= 10) {
        res.status(400).json({ message: "Maximum of 10 top businesses reached" });
        return;
      }
      
      // Add new top businesses, but limit to 10 in total
      const topBusinesses = selectedItems.map((item) => {
        return new TopBusiness(item);
      });
      const results = await TopBusiness.create(topBusinesses);
      res.status(201).json(results);
    } else {
      res.status(400).json({ message: "selectedItems must be an array" });
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = addTopBusiness;