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

    const addToCart = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }

    const removeFromCart = (itemId) => {
        if (cartItem[itemId] === 0) {
            setCartItem(0);
        }
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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