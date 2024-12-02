import AccessoryModel from "../models/accessoryModel.js";
import mongoose from "mongoose";
import fs from 'fs';

// POST API to add a new product
const addAccessory = async (req, res) => {

  console.log("Request Body:", req.body);  // Check if the text data is received
    console.log("Uploaded Files:", req.files); // Check if the files are received

  const { name, category, reviews, reviewCount, oldPrice, newPrice, currency, description, material, compatibility } = req.body;

  // Check for required fields
  if (!name || !category || !oldPrice || !newPrice || !currency || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newProduct = new AccessoryModel({
    name,
    category,
    reviews: parseFloat(reviews) || 0,
    reviewCount: parseInt(reviewCount) || 0,
    price: {
      oldPrice: parseFloat(oldPrice),
      newPrice: parseFloat(newPrice),
      currency
    },
    description,
    images: {
      mainImage: req.files['mainImage'] ? `/${req.files['mainImage'][0].filename}` : null,
      secondImage: req.files['secondImage'] ? `/${req.files['secondImage'][0].filename}` : null,
      thirdImage: req.files['thirdImage'] ? `/${req.files['thirdImage'][0].filename}` : null,
      fourthImage: req.files['fourthImage'] ? `/${req.files['fourthImage'][0].filename}` : null
    },
    additionalInfo: {
      material,
      compatibility: typeof compatibility === 'string' ? compatibility.split(',') : []
    }
  });

  try {
    const item = await newProduct.save();
    if (!item) {
      return res.status(500).send({
        success: false,
        message: "Database Problem"
      });
    }
    res.status(201).send({
      success: true,
      message: "Product Added Successfully",
      item
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: error.message || "Product Adding Api Error"
    });
    console.error(error);
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// All accessory List 
const accessoryList = async (req, res) => {
  try {
    const accessory = await AccessoryModel.find({});
    if (!accessory) {
      res.status(501).send({
        success: false,
        message: 'Items not available to the database'
      })
    }
    res.status(201).send({
      success: true,
      message: "All Item Fetched",
      accessory
    })
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "Error in get all product api",
      error
    })
  }
}

// -----------------------------------------------------------------------------------
//remove accessory item
const removeAccessory = async (req, res) => {
  const productId = req.body.id;
  // Check if productId is provided
  if (!productId) {
    return res.status(400).send({
      success: false,
      message: "Please provide Product ID",
    });
  }

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    // Find the accessory
    const accessory = await AccessoryModel.findById(productId);
    if (!accessory) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Safely delete the file
    // Delete associated images from the file system
    const images = accessory.images || {};
    const imagePaths = [
      images.mainImage,
      images.secondImage,
      images.thirdImage,
      images.fourthImage,
    ].filter(Boolean); // Ensure paths are valid strings

    imagePaths.forEach((path) => {
      const fullPath = `uploads${path}`; // Adjust the base directory if needed
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${fullPath}`, err);
        }
      });
    });

    // Delete the accessory
    await AccessoryModel.findByIdAndDelete(productId);

    return res.status(200).send({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("Error while removing accessory:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export { addAccessory, accessoryList, removeAccessory };
