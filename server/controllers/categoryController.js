import categoryModel from "../models/categoryModel.js";
//import multer from 'multer'; // Import your Multer config

const addCategory = async (req, res) => {
    try {
        // Multer will populate req.file with the uploaded file's information
        const { menu_name } = req.body;

        // Validate required fields
        if (!menu_name || !req.file) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if the category already exists
        const existingCategory = await categoryModel.findOne({ menu_name });
        if (existingCategory) {
            return res.json({
                success: false,
                message: "Category already exists"
            });
        }

        // Create a new category
        const newCategory = new categoryModel({
            menu_name,
            menu_image: req.file.path // Save the file path in the database
        });

        const savedCategory = await newCategory.save();
        if (!savedCategory) {
            return res.json({
                success: false,
                message: "Failed to create category"
            });
        }

        // Return success response
        return res.json({
            success: true,
            message: "Category created successfully",
            category: savedCategory
        });

    } catch (error) {
        console.error("Error in addCategory:", error);
        return res.json({
            success: false,
            message: `API Error: ${error.message || error}`
        });
    }
};


// Backend Controller Function for Fetching Categories
const getAllCategories = async (req, res) => {
    try {
        // Replace with your actual database query or ORM call
        const categories = await categoryModel.find(); // For MongoDB with Mongoose
        // Example SQL query: const categories = await db.query('SELECT * FROM categories');
        if (!categories) return res.status(501).json({ success: false, message: "Categories not found"})
         return res.status(200).json({
            success: true,
            categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
         return res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
      const { id } = req.body;
  
      // Check if the category exists
      const category = await categoryModel.findById(id);
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
  
      // Delete the category
      await categoryModel.findByIdAndDelete(id);
  
      // Success response
      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
      // Handle errors
      console.error('Error deleting category:', error.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };



export  {addCategory, getAllCategories, deleteCategory};