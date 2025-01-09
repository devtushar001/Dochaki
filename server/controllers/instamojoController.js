import Insta from "instamojo-nodejs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment Variables
const api_key = process.env.API_KEY;
const auth_key = process.env.AUTH_KEY;
const INSTA_API_URL = process.env.INSTA_API_URL || "https://instamojo.com/";

if (!api_key || !auth_key) {
    throw new Error("Instamojo API_KEY and AUTH_KEY must be set in your .env file.");
}

// Configure Instamojo
Insta.setKeys(api_key, auth_key);
Insta.isSandboxMode(true); // Enable Sandbox Mode (set to false for production)
Insta.baseUrl = INSTA_API_URL; // Explicitly set base URL for Instamojo

// 📌 **1. Place Order and Initiate Payment**
export const placeOrder = async (req, res) => {
    try {
        const { name, email, amount } = req.body;

        // Input Validation
        if (!name || !email || !amount || isNaN(amount)) {
            return res.status(400).json({ success: false, message: "Valid name, email, and amount are required." });
        }

        console.log(`📝 Name: ${name}, 📧 Email: ${email}, 💵 Amount: ${amount}`);

        // Payment Data Configuration
        const data = new Insta.PaymentData();
        const REDIRECT_URL = process.env.REDIRECT_URL || "http://localhost:8000/success";

        data.setRedirectUrl(REDIRECT_URL);
        data.send_email = true;
        data.purpose = "Order Payment";
        data.amount = amount;
        data.buyer_name = name;
        data.email = email;

        // Create Payment Request
        const response = await new Promise((resolve, reject) => {
            Insta.createPayment(data, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            });
        });

        const paymentRequest = JSON.parse(response);

        if (!paymentRequest?.payment_request?.longurl) {
            console.error(" Invalid payment response:", paymentRequest);
            return res.status(500).json({ success: false, message: "Failed to get payment URL from Instamojo." });
        }

        console.log(`✅ Payment URL: ${paymentRequest.payment_request.longurl}`);
        return res.redirect(paymentRequest.payment_request.longurl);
    } catch (error) {
        console.error(" Error creating payment:", error);
        return res.status(500).json({ success: false, message: "Error creating payment. Please try again later." });
    }
};

//  **2. Home Controller for Serving Index File**
export const homeController = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "index.html"));
    } catch (error) {
        console.error(" Error serving index.html:", error);
        res.status(500).send("Failed to load the home page.");
    }
};


// real app script

// import Insta from "instamojo-nodejs";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";

// // Load environment variables from .env file
// dotenv.config();

// // Resolve __dirname for ES Modules (CommonJS compatibility)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Fetch environment variables
// const api_key = process.env.API_KEY;
// const auth_key = process.env.AUTH_KEY;
// const INSTA_API_URL = process.env.INSTA_API_URL || "https://test.instamojo.com/api/1.1/";

// if (!api_key || !auth_key) {
//     throw new Error("Instamojo API_KEY and AUTH_KEY must be set in your .env file.");
// }

// // Set API keys and sandbox mode for Instamojo
// Insta.setKeys(api_key, auth_key);
// Insta.isSandboxMode(true); // Set to 'false' when moving to production
// Insta.baseUrl = INSTA_API_URL;

// //  **1. Place Order and Initiate Payment**
// export const placeOrder = async (req, res) => {
//     try {
//         const { name, email, amount } = req.body;

//         // Validate Input
//         if (!name || !email || !amount || isNaN(amount)) {
//             return res.status(400).json({ success: false, message: "Valid name, email, and amount are required." });
//         }

//         console.log(`📝 Name: ${name}, 📧 Email: ${email}, 💵 Amount: ${amount}`);

//         // Prepare payment data for Instamojo
//         const data = new Insta.PaymentData();
//         const REDIRECT_URL = process.env.REDIRECT_URL || "http://localhost:8000/success";

//         data.setRedirectUrl(REDIRECT_URL);
//         data.send_email = true;
//         data.purpose = "Order Payment";
//         data.amount = amount;
//         data.buyer_name = name;
//         data.email = email;

//         // Create the payment request and handle response
//         const response = await new Promise((resolve, reject) => {
//             Insta.createPayment(data, (error, response) => {
//                 if (error) {
//                     console.error(" Instamojo API Error:", error);
//                     reject(error);
//                 } else {
//                     resolve(response);
//                 }
//             });
//         });

//         const paymentRequest = JSON.parse(response);  // Assuming response is a string

//         if (!paymentRequest?.payment_request?.longurl) {
//             console.error(" Invalid payment response:", paymentRequest);
//             return res.status(500).json({ success: false, message: "Failed to get payment URL from Instamojo." });
//         }

//         console.log(` Payment URL: ${paymentRequest.payment_request.longurl}`);
//         return res.redirect(paymentRequest.payment_request.longurl);
//     } catch (error) {
//         console.error(" Error creating payment:", error);
//         return res.status(500).json({ success: false, message: "Error creating payment. Please try again later." });
//     }
// };

// //  **2. Home Controller for Serving Index File**
// export const homeController = (req, res) => {
//     try {
//         res.sendFile(path.join(__dirname, "index.html"));
//     } catch (error) {
//         console.error(" Error serving index.html:", error);
//         res.status(500).send("Failed to load the home page.");
//     }
// };
