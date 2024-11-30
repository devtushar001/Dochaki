import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { bikeAccessories } from "../../assets/assets"
export const DochakiContext = createContext(null);

const DochakiContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});

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
                let itemInfo = bikeAccessories.find((product) => product.id === Number(item));
                if (itemInfo) { // Check if the item was found
                    totalAmount += itemInfo.price.newPrice * cartItem[item];
                } else {
                    console.warn(`Item with ID ${item} not found in bikeAccessories.`);
                }
            }
        }

        return totalAmount;
    };



    useEffect(() => {
        console.log(cartItem);
        console.log(getTotalCartAmount())
    }, [cartItem])

    const contextValue = {
        bikeAccessories,
        addToCart,
        removeFromCart,
        cartItem,
        getTotalCartAmount
    }

    return (
        <DochakiContext.Provider value={contextValue}>
            {props.children}
        </DochakiContext.Provider>
    )
}
export default DochakiContextProvider;