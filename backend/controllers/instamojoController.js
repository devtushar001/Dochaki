import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

const frontend_url = process.env.FRONTEND_URL;
const INSTAMOJO_API_KEY = process.env.INSTAMOJO_API_KEY;
const INSTAMOJO_AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN;
const CALLBACK_URL = process.env.CALLBACK_URL;

// Utility Function to Make HTTPS Requests
const makeHttpsRequest = (options, data = null) => {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let response = "";
            res.on("data", (chunk) => {
                response += chunk;
            });
            res.on("end", () => {
                resolve(JSON.parse(response));
            });
        });

        req.on("error", (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

// **1. Place Order and Initiate Payment**
const placeOrder = async (req, res) => {
    try {
        // Authentication Check
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // Validate Input
        const { items, amount, address } = req.body;
        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Save Order
        const savedOrder = await new orderModel({ userId, items, amount, address }).save();
        if (!savedOrder) {
            return res.json({ success: false, message: "Failed to save order" });
        }

        // Clear User Cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });

        // Payment Request with InstaMojo
        const paymentData = JSON.stringify({
            purpose: "Order Payment",
            amount: amount,
            buyer_name: userId,
            redirect_url: `${CALLBACK_URL}?orderId=${savedOrder._id}`,
            email: "user@example.com",
            phone: "9999999999",
            allow_repeated_payments: false,
        });

        const options = {
            hostname: "test.instamojo.com", // Ensure this URL is valid
            path: "/api/1.1/payment-requests/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": process.env.INSTAMOJO_API_KEY,
                "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
            },
        };

        // Make HTTPS Request
        const response = await makeHttpsRequest(options, paymentData);

        if (!response || !response.payment_request || !response.payment_request.longurl) {
            throw new Error("Failed to create payment request. Invalid response from payment gateway.");
        }

        // Return Success
        return res.status(200).json({
            success: true,
            message: "Payment session created successfully",
            session_url: response.payment_request.longurl,
        });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
// **2. Verify Payment**
const verifyOrder = async (req, res) => {
    const { orderId, success, payment_id } = req.body;
    try {
        if (!(success == "true")) {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({
                success: false,
                message: "Payment failed or something went wrong",
            });
        } else {
            // Verify Payment Status from InstaMojo
            const options = {
                hostname: "test.instamojo.com",
                path: `/api/1.1/payments/${payment_id}/`,
                method: "GET",
                headers: {
                    "X-Api-Key": INSTAMOJO_API_KEY,
                    "X-Auth-Token": INSTAMOJO_AUTH_TOKEN,
                },
            };

            const response = await makeHttpsRequest(options);

            if (response.success && response.payment.status === "Credit") {
                await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Paid" });
                return res.json({
                    success: true,
                    message: "Payment successful",
                });
            } else {
                await orderModel.findByIdAndDelete(orderId);
                return res.json({
                    success: false,
                    message: "Payment verification failed",
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "API error: " + error.message,
        });
    }
};

// **3. User Orders for Frontend**
const userOrder = async (req, res) => {
    const userId = req.user.id;
    try {
        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }
        const orders = await orderModel.find({ userId });
        if (!orders) {
            return res.json({ success: false, message: "Orders not found" });
        }

        return res.json({
            success: true,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// 📌 **4. List All Orders**
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "API error", error: error.message });
    }
};

// 📌 **5. Update Order Status**
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required" });
        }
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        return res.status(200).json({ success: true, message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        return res.status(500).json({ success: false, message: "API error", error: error.message });
    }
};

export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };
