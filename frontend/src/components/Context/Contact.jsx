import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
export const DochakiContext = createContext(null);

const DochakiContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const [bikeAccessories, setBikeAccessories] = useState([])
    const url = 'http://localhost:8000';

    const fetchBikeAccessoriesList = async () => {
        try {
            const response = await fetch(`${url}/api/accessory/list`);
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message);
            }
            if (result.success) {
                toast.success(response.message);
                setBikeAccessories(result.data); // Assuming API sends data in `data`
            } else {
                toast.error(result.message)
                // throw new Error(result.message || "Failed to fetch accessories");
            }
        } catch (err) {
            toast.error("Fetch Error:", err.message);
        } finally {
            console.log(false)
        }
    };


    const addToCart = async (itemId) => {
        // Update cart state locally
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        // Check if the token exists
        if (!token) {
            toast.error("Please log in to add items to your cart");
            return;
        }

        try {
            // API Call to update the cart
            const response = await fetch(`${url}/api/cart/add`, {
                method: "POST", // Use POST or PUT as per your API design
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Correct header for bearer tokens
                },
                body: JSON.stringify({
                    itemId,
                    quantity: cartItem[itemId] ? cartItem[itemId] + 1 : 1, // Send the updated quantity
                }),
            });

            // Parse the response
            const result = await response.json();
            if (response.ok && result.success) {
                // toast.success(result.cart);
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        }
    };



    const removeFromCart = async (itemId) => {
        if (cartItem[itemId] === 0) {
            setCartItem(0);
        }
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (!token) {
            toast.error("Please log in to remove items from your cart");
            return;
        }

        try {
            // API Call to update the cart
            const response = await fetch(`${url}/api/cart/remove`, {
                method: "POST", // Use the correct HTTP method based on your API design
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
                body: JSON.stringify({
                    itemId,
                    quantity: cartItem[itemId] > 1 ? cartItem[itemId] - 1 : 0, // Decrease quantity or set to 0
                }),
            });

            // Parse the response
            const result = await response.json();
            if (response.ok && result.success) {
                toast.success(result.message); // Display success message
            } else {
                toast.error(result.message); // Handle API errors
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        // Ensure we only process defined keys in cartItem
        for (const item of Object.keys(cartItem)) {
            if (cartItem[item] > 0) {
                // Use strict equality to prevent type coercion issues
                let itemInfo = bikeAccessories.find((product) => product._id === item);
                if (itemInfo) { // Check if the item was found
                    totalAmount += itemInfo.price.newPrice * cartItem[item];
                } else {
                    console.warn(`Item with _id ${item} not found in bikeAccessories.`);
                }
            }
        }

        return totalAmount;
    };

    useEffect(() => {

        async function loadData() {
            await fetchBikeAccessoriesList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [cartItem])

    const contextValue = {
        bikeAccessories,
        addToCart,
        removeFromCart,
        cartItem,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <DochakiContext.Provider value={contextValue}>
            {props.children}
        </DochakiContext.Provider>
    )
}
export default DochakiContextProvider;