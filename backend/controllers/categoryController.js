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

export default addCategory;