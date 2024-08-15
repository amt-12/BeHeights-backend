const mongoose = require('mongoose');

const businessAllSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  typeOfBusiness: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  typeOfFood: {
    type: [String],
    required: true
  },
  cost: {
    type: [Number],
    required: true
  },
  tableTime: {
    type: [String],
    required: true
  }
});

const BusinessAll = mongoose.model('BusinessAll', businessAllSchema);

module.exports = BusinessAll;