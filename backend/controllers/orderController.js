import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const frontend_url = process.env.FRONTEND_URL;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

        const { items, amount, address } = req.body;
        if (!items || !amount || !address)
            return res.status(400).json({ success: false, message: "All fields are required" });

        const savedOrder = await new orderModel({ userId, items, amount, address }).save();
        if (!savedOrder) return res.json({ success: false, message: "Failed to save order" });

        await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });

        const line_items = [
            ...items.map(({ name, price, quantity }) => ({
                price_data: {
                    currency: "inr",
                    product_data: { name },
                    unit_amount: price.newPrice * 100,
                },
                quantity,
            })),
            {
                price_data: {
                    currency: "inr",
                    product_data: { name: "Including shipping fee and GST" },
                    unit_amount: 0 * 100,
                },
                quantity: 1,
            },
        ];

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${savedOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${savedOrder._id}`,
        });

        if (!session) return res.json({ success: false, message: "Failed to create payment session" });

        res.status(200).json({
            success: true,
            message: "Payment session created successfully",
            session_url: session.url,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

const verifyOrder = async (req, res) => {
    console.log(req+" req")
    const { orderId, success } = req.body;
    try {
        if (!(success == "true")) {
            await orderModel.findByIdAndDelete(orderId)
            return res.json({
                success: false,
                message: "Payment failed or something got problem"
            })
        } else {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            return res.json({
                success: true,
                message: "Payment successful"
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: "Api error"+error
        })
    }
};




export { placeOrder, verifyOrder };
