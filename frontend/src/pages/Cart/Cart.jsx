import React, { useContext } from "react";
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom'
import { DochakiContext } from "../../components/Context/Contact";
import { useEffect } from "react";

const Cart = () => {
    const { cartItem, bikeAccessories, removeFromCart, getTotalCartAmount, url } = useContext(DochakiContext);
    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, [])
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
                        if (cartItem[item._id] > 0) {
                            return (
                                <>
                                    <div className="cart-items-title cart-items-item">
                                        <Link to={`/accessory/${item._id}`}><img src={`${url}/images/${item.images.mainImage}`} alt="" /></Link>
                                        <p>{item.name}</p>
                                        <p>&#8377;{item.price.newPrice}</p>
                                        <p>{cartItem[item._id]}</p>
                                        <p>&#8377;{item.price.newPrice * cartItem[item._id]}</p>
                                        <p onClick={() => { removeFromCart(item._id) }} className="cross-icon">X</p>
                                    </div>
                                    <hr />
                                </>
                            )
                        }
                    })}
                </div>
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>&#8377;{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Shipping Fee + GST</p>
                            <p>&#8377;{0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>&#8377;{getTotalCartAmount()}</p>
                        </div>
                        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="cart-promocode">
                        <div>
                            <p>If you have promo code, Enter it here</p>
                            <div className="cart-promocode-input">
                                <input type="text" placeholder="promoced" />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;