import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(secret_key);

// Placing order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"; // Frontend URL for redirection

    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const { items, amount, address } = req.body;
        if (!items || !amount || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Create new order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });

        const savedOrder = await newOrder.save();
        if (!savedOrder) {
            return res.status(500).json({
                success: false,
                message: "Failed to save order",
            });
        }

        // Update user cart
        const updatedUserCart = await userModel.findByIdAndUpdate(
            userId,
            { cartData: {} },
            { new: true } // Returns updated document
        );

        if (!updatedUserCart) {
            return res.status(404).json({
                success: false,
                message: "User not found or cart update failed",
            });
        }

        // Prepare line items for Stripe Checkout
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100, // Convert to paise
            },
            quantity: item.quantity,
        }));

        // Add delivery charges as a line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: Math.round(0.15 * 100), // Example fixed charge in INR
            },
            quantity: 1,
        });

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items, // Corrected typo
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${savedOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${savedOrder._id}`,
        });

        if (!session) {
            return res.status(500).json({
                success: false,
                message: "Failed to create payment session",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Payment session created successfully",
            session_url: session.url,
        });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export { placeOrder };
