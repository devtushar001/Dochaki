const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the upload directory
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Create a unique file name
    const uniqueSuffix = crypto.randomBytes(6).toString('hex'); // Generate a unique string
    const fileExtension = path.extname(file.originalname); // Get the file extension (e.g., .jpg, .png)
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`); // Combine field name, unique suffix, and extension
  }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Export the upload function for specific fields (e.g., multiple image uploads)
module.exports = upload;



// -----------------------------------------------------------------------------------------------------------


const express = require('express');
const upload = require('./upload'); // Import the multer configuration
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Product Data Route (Handles file uploads)
app.post('/add-product', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'secondImage', maxCount: 1 },
  { name: 'thirdImage', maxCount: 1 },
  { name: 'fourthImage', maxCount: 1 }
]), (req, res) => {
  const { name, description, price, category } = req.body;
  const files = req.files;

  // Create a response object with the uploaded file paths and form data
  const responseData = {
    name,
    description,
    price,
    category,
    images: {
      mainImage: files.mainImage ? files.mainImage[0].filename : null,
      secondImage: files.secondImage ? files.secondImage[0].filename : null,
      thirdImage: files.thirdImage ? files.thirdImage[0].filename : null,
      fourthImage: files.fourthImage ? files.fourthImage[0].filename : null
    }
  };

  // You can save this data to a database or process it further
  console.log('Product Data:', responseData);

  // Return success response
  res.status(200).json({ message: 'Product added successfully', data: responseData });
});

// Create the uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
