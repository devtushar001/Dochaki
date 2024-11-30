import React, { useContext } from "react";
import './Cart.css';
import { DochakiContext } from "../../components/Context/Contact";

const Cart = () => {
    const {cartItem, bikeAccessories, removeFromCart} = useContext(DochakiContext)
    return (
        <>
         <div className="cart">
            <div className="cart-items">
                <div className="cart-item-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                
            </div>
         </div>
        </>
    )
}

export default Cart;