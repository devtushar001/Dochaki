import React from "react";
import { Link } from "react-router-dom";
import './ShopNow.css';

const ShopNow = () => {
    return (
        <div className="shopnow">
            <Link to='/shop'><button className="shop-btn">Shop Now....</button></Link>
        </div>
    )
}
export default ShopNow;