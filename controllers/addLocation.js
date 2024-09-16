const mongoose = require('mongoose');

// Define the Location model
const locationSchema = new mongoose.Schema({
  label: String,
  value: String
});

const Location = mongoose.model('Location', locationSchema);

const addLocation = async (req, res, next) => {
  const newLocation = req.body.location; // Get the new location from the request body

  // Check if the new location is empty
  if (newLocation.trim() === "") {
    return res.status(400).json({ error: 'Location cannot be empty' });
  }

  // Check if the location already exists
  const existingLocation = await Location.findOne({ value: newLocation.trim().toLowerCase() });
  if (existingLocation) {
    return res.status(400).json({ error: 'Location already exists' });
  }

  // Create a new Location document
  const location = new Location({ label: newLocation.trim(), value: newLocation.trim().toLowerCase() });

  // Save the location to the database
  try {
    await location.save();
    res.json({ message: 'Location added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add location' });
  }
};

module.exports = addLocation;