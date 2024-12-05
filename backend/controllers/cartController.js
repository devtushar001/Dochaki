import userModel from "../models/userModel.js";
// add items to user cart 
const addToCart = async (req, res) => {
    try {
        // Extracting userdata from the database using middleware auth token extracting ID
        const userId = req.body.userID;
        if (!userId) {
            return res.json({
                success: false,
                message: "Invalid token"
            });
        }

        // Fetch user data from the database
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({
                success: false,
                message: "User data not found"
            });
        }

        // Initialize and update cart data
        const cartData = userData.cartData || {};
        const itemId = req.body.itemId;
        if (!itemId) {
            return res.json({
                success: false,
                message: "Item ID is required"
            });
        }

        cartData[itemId] = (cartData[itemId] ?? 0) + 1;

        // Update the user document in the database
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "Cart data not updated"
            });
        }

        // Return success response
        return res.json({
            success: true,
            message: "Product added to cart",
            cart: updatedUser.cartData
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.json({
            success: false,
            message: `Error: ${error.message || error}`
        });
    }
};


// remove items from user's cart 
const removeFromCart = async (req, res) => {

}

// fetch user Cart Data 
const getCart = async (req, res) => {

}

export { addToCart, removeFromCart, getCart }