import React, { useContext } from "react";
import './Cart.css';
import { DochakiContext } from "../../components/Context/Contact";

const Cart = () => {
    const { cartItem, bikeAccessories, removeFromCart } = useContext(DochakiContext);
    console.log(cartItem, bikeAccessories);

    return (
        <>
            <div className="cart">
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />
                    {bikeAccessories.map((item, i) => {
                        if (cartItem[item.id] > 0) {
                            return (
                                <>
                                  <div className="cart-items-title cart-items-item">
                                    <img src={item.images.mainImage} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price.newPrice}</p>
                                    <p>{cartItem[item.id]}</p>
                                    <p>{item.price.newPrice * cartItem[item.id]}</p>
                                    <p onClick={()=>{removeFromCart(item.id)}} className="cross-icon">X</p>
                                  </div>
                                  <hr />
                                </>
                            )

                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default Cart;