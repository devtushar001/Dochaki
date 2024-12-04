import AccessoryModel from "../models/accessoryModel.js";
import mongoose from "mongoose";
import fs from "fs";

// POST API to add a new product
const addAccessory = async (req, res) => {
  const {
    name,
    category,
    reviews,
    reviewCount,
    oldPrice,
    newPrice,
    currency,
    description,
    material,
    compatibility,
  } = req.body;

  // Validate required fields
  if (!name || !category || !oldPrice || !newPrice || !description) {
     res.json({ success: false, message: "Missing required fields" });
  }

  const newProduct = new AccessoryModel({
    name,
    category,
    reviews: parseFloat(reviews) || 0,
    reviewCount: parseInt(reviewCount) || 0,
    price: {
      oldPrice: parseFloat(oldPrice),
      newPrice: parseFloat(newPrice),
      currency,
    },
    description,
    images: {
      mainImage: req.files["mainImage"] ? `/${req.files["mainImage"][0].filename}` : null,
      secondImage: req.files["secondImage"] ? `/${req.files["secondImage"][0].filename}` : null,
      thirdImage: req.files["thirdImage"] ? `/${req.files["thirdImage"][0].filename}` : null,
      fourthImage: req.files["fourthImage"] ? `/${req.files["fourthImage"][0].filename}` : null,
    },
    additionalInfo: {
      material,
      compatibility: typeof compatibility === "string" ? compatibility.split(",") : [],
    },
  });

  try {
    const item = await newProduct.save();
    res.json({
      success: true,
      message: "Accessory Added",
      data: item,
    });
    return;
  } catch (error) {
    console.error("Add Accessory Error:", error);
    res.json({
      success: false,
      message: "Error adding accessory",
    });
    return;
  }
};

// Fetch all accessories
const accessoryList = async (req, res) => {
  try {
    const accessories = await AccessoryModel.find({});
    res.json({
      success: true,
      message: "Accessories fetched successfully",
      data: accessories,
    });
    return;
  } catch (error) {
    console.error("Accessory List Error:", error);
    res.json({
      success: false,
      message: "Error fetching accessories",
    });
    return;
  }
};

// Remove an accessory
const removeAccessory = async (req, res) => {
  const productId = req.body.id;

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    res.json({
      success: false,
      message: "Invalid or missing Product ID",
    });
    return;
  }

  try {
    const accessory = await AccessoryModel.findById(productId);

    if (!accessory) {
      res.json({
        success: false,
        message: "Accessory not found",
      });
      return;
    }

    // Delete associated images
    const imagePaths = [
      accessory.images.mainImage,
      accessory.images.secondImage,
      accessory.images.thirdImage,
      accessory.images.fourthImage,
    ].filter(Boolean);

    if (!imagePaths) {
      res.json({
        success: false,
        message: "Not Found"
      })
      return;
    }

    imagePaths.forEach((path) => {
      const fullPath = `uploads${path}`;
      fs.unlink(fullPath, (err) => {
        if (err) console.error(`Failed to delete image: ${fullPath}`, err);
      });
    });

    await accessory.deleteOne();
    res.json({
      success: true,
      message: "Accessory removed successfully",
    });
    return;
  } catch (error) {
    console.error("Remove Accessory Error:", error);
    res.json({
      success: false,
      message: "Error removing accessory",
    });
    return;
  }
};

export { addAccessory, accessoryList, removeAccessory };
