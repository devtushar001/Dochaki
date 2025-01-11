import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const frontend_url = process.env.FRONTEND_URL;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
console.log(frontend_url)
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
        ];

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${savedOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${savedOrder._id}`,
        });

        if (!session) return res.json({ success: false, message: "Failed to create payment session" });

        return res.status(200).json({
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
    console.log(req + " req")
    const { orderId, success } = req.body;
    try {
        if (!(success === "true")) {
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
            message: "Api error" + error
        })
    }
};

// user orders for frontend
const userOrder = async (req, res) => {
    const userId = req.user.id;
    try {
        if (!userId) {
            return res.json({
                success: false,
                message: "User not authenticated"
            })
        }
        const orders = await orderModel.find({ userId });
        if (!orders) {
            return res.json({
                success: false,
                message: "Orders not found"
            })
        }

        return res.json({
            success: true,
            message: "Orders fetched successfully",
            orders
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error
        })
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "API error",
            error: error.message
        });
    }
};


// api for update order status

const updateStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
  
      // Validate request body
      if (!orderId || !status) {
        return res.status(400).json({
          success: false,
          message: "Order ID and status are required"
        });
      }
  
      // Update order status
      const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: updatedOrder
      });
    } catch (error) {
        console.log(error)
      return res.status(500).json({
        success: false,
        message: "API error",
        error: error.message
      });
    }
  };
  

  const deleteOrder = async (req, res) => {
    const { orderId } = req.body; // Destructure to get orderId from request body
  
    // Check if orderId is provided
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required."
      });
    }
  
    try {
      // Attempt to delete the order
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);
  
      // If no order is found
      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found."
        });
      }
  
      // Success response
      return res.status(200).json({
        success: true,
        message: "Order deleted successfully.",
        data: deletedOrder,
      });
  
    } catch (error) {
      // Handle errors
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the order.",
        error: error.message
      });
    }
  };
  


export { placeOrder, verifyOrder, userOrder, listOrders, updateStatus, deleteOrder };
