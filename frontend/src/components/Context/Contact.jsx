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

    useEffect(()=>{
       console.log(cartItem);
    }, [cartItem])

    const contextValue = {
        bikeAccessories,
        addToCart,
        removeFromCart,
        cartItem
    }

    return (
        <DochakiContext.Provider value={contextValue}>
            {props.children}
        </DochakiContext.Provider>
    )
}
export default DochakiContextProvider;