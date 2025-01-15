import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DochakiContext } from "../../components/Context/Contact";
import { toast } from "react-toastify";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(DochakiContext);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true); // To manage spinner state

    const verifyOrder = async () => {
        try {
            const response = await fetch(`${url}/api/order/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Correct header for JSON
                },
                body: JSON.stringify({
                    success,
                    orderId,
                }),
            });

            console.log("Response object:", response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Parsed result:", result);

            // Handle the result as needed
            if (result.success) {
                toast.success(result.message || "Order verified successfully!");
                navigate("/myorders");
            } else {
                toast.error(result.message || "Order verification failed.");
                navigate("/")
            }
        } catch (error) {
            console.error("Error verifying order:", error);
            toast.error(error.message || "An unexpected error occurred.");
        }
    };



    useEffect(() => {
        window.scrollTo(0, 0);
        verifyOrder();
    }, [url, success, orderId, navigate]);

    return (
        <div className="verify">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="message">Processing complete. Redirecting...</div>
            )}
        </div>
    );
};

export default Verify;
