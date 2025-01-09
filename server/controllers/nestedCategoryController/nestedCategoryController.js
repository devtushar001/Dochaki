import nestedCtgModel from "../../models/NestedCategory/NestedCategory.js";

// Controller function to add a new category
const addNestedCtg = async (req, res) => {
    try {
        const { menu_name, menu_sub } = req.body;

        const menu_image = req.file.path; // Use file path for storage (adjust based on your setup)

        // Validate the input
        if (!menu_name || !menu_image) {
            return res.status(400).json({ message: 'menu_name and menu_image are required.' });
        }

        // Create a new category document
        const newCategory = new nestedCtgModel({
            menu_name,
            menu_image,
            menu_sub: menu_sub || [] // Default to an empty array if menu_sub is not provided
        });

        // Save the document to the database
        const savedCategory = await newCategory.save();

        return res.status(201).json({
            message: 'Category added successfully!',
            category: savedCategory
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Server error. Unable to add category.' });
    }
};
const addMenuSub = async (req, res) => {
    try {
        const { menu_name, new_sub } = req.body;
        console.log(menu_name, new_sub)
        // Validate the input
        if (!menu_name || !new_sub) {
            return res.status(400).json({ message: 'menu_name and new_sub are required.' });
        }

        // Find the category by menu_name and update the menu_sub array
        const updatedCategory = await nestedCtgModel.findOneAndUpdate(
            { menu_name }, // Find by menu_name
            { $push: { menu_sub: new_sub } }, // Push the new string to menu_sub
            { new: true } // Return the updated document
        );

        // Check if the category was found and updated
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category with the specified menu_name not found.' });
        }

        res.status(200).json({
            message: 'New submenu added successfully!',
            category: updatedCategory
        });
    } catch (error) {
        console.error('Error adding submenu:', error);
        res.status(500).json({ message: 'Server error. Unable to add submenu.' });
    }
};

const categoryAll = async (req, res) => {
    console.log("nested category controller functioning but...")
    try {
        const allCategories = await nestedCtgModel.find();

        if (!allCategories) {
            return res.status(404).json({
                success: false,
                message: "Categories not found"
            })
        }
        return res.status(201).json({
            success: true,
            message: "Categories fetched successfully",
            allCategories
        })
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: "Got api error " + error
        })
    }
}

const deleteParent = async (req, res) => {
    try {
        const { id } = req.body;
        // Check if the category exists
        const category = await nestedCtgModel.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Delete the category
        await nestedCtgModel.findByIdAndDelete(id);

        // Success response
        return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting category:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const { parentId, subId } = req.body;
        console.log(req.body.parentId);
        console.log(req.body.subId);

        if (!parentId || !subId) {
            return res.status(400).json({
                success: false,
                message: "parentId and subId are required."
            });
        }

        // Use `findOneAndUpdate` to remove the subId from the menu_sub array
        const updatedCategory = await nestedCtgModel.findOneAndUpdate(
            { _id: parentId }, // Find by _id (parentId)
            { $pull: { menu_sub: subId } }, // Remove the subId from the menu_sub array
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: `Sub-category '${subId}' not found or already deleted.`
            });
        }

        return res.json({
            success: true,
            message: `Sub-category '${subId}' deleted successfully.`,
            data: updatedCategory
        });
    } catch (error) {
        console.error("Error deleting sub-category:", error);
        return res.status(500).json({
            success: false,
            message: `API error: ${error.message}`
        });
    }
};


export { addNestedCtg, addMenuSub, categoryAll, deleteParent, deleteSubCategory }