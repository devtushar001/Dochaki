import userModel from "../models/userModel.js";
// add items to user cart 
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // From middleware
        const { itemId } = req.body;

        // Validate itemId
        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "Item ID is required",
            });
        }

        // Fetch user data
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Initialize cartData if not present
        let cartData = userData.cartData || {};

        // Update or add item in cart
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Update user's cartData in database
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { cartData } },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Failed to update cart",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart: updatedUser.cartData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the product to the cart",
        });
    }
};

// remove items from user's cart 
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id; // From middleware
        const { itemId } = req.body;

        // Validate itemId
        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "Item ID is required",
            });
        }

        // Fetch user data
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Initialize cartData if not present
        let cartData = userData.cartData || {};

        // Check if item exists in the cart
        if (!cartData[itemId]) {
            return res.status(400).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        // Decrease quantity or remove item
        if (cartData[itemId] > 1) {
            cartData[itemId] -= 1;
        } else {
            delete cartData[itemId];
        }

        // Update user's cartData in database
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { cartData } },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(500).json({
                success: false,
                message: "Failed to update cart",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart: updatedUser.cartData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while removing the product from the cart",
        });
    }
};



// fetch user Cart Data 
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid user"
            });
        }
        // Find the user in the database
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found in the database"
            });
        }

        // Retrieve the cart data
        const cartData = userData.cartData || {};
        // if (!Object.keys(cartData).length) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Cart is empty"
        //     });
        // }
        return res.status(200).json({
            success: true,
            message: "Cart data fetched successfully",
            cartData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export { addToCart, removeFromCart, getCart }