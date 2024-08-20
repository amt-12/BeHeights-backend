const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: './uploads/' }); // set the upload directory

const uploadImage = async (req, res, next) => {
  try {
    // Check if the request has a file
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Get the uploaded file
    const file = req.file;

    // Check if the file is an image
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).send({ message: 'Only images are allowed' });
    }

    // Store the image using Multer
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(500).send({ message: 'Error uploading image' });
      }

      // Return a success response
      res.send({ message: 'Image uploaded successfully' });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = uploadImage;