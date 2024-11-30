import React, { useContext, useState, useEffect } from "react";
import './AccessoryView.css';
import { fassets } from '../../frontend_assets/assets';
import { Link } from "react-router-dom";
import { DochakiContext } from "../Context/Contact";

const AccessoryView = (props) => {
    const { addToCart, removeFromCart, cartItem } = useContext(DochakiContext);
    const { id, name, category, reviews, reviewCount, price, description, images, additionalInfo } = props;
    const [mainImage, setMainImage] = useState(images.mainImage);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        // Trigger the animation when the mainImage changes
        setAnimationClass('slide');
        const timer = setTimeout(() => {
            setAnimationClass(''); // Remove the animation class after it completes
        }, 500); // Time should match with animation duration
        return () => clearTimeout(timer);
    }, [mainImage]);
    
    return (
        <>
            <div className="accessory-view">
                <div className="accessory-view-left">
                    <div className="accessory-view-img-list">
                        <img onClick={() => { setMainImage(images.mainImage) }} src={images.mainImage} alt="" />
                        <img onClick={() => { setMainImage(images.secondImage) }} src={images.secondImage} alt="" />
                        <img onClick={() => { setMainImage(images.thirdImage) }} src={images.thirdImage} alt="" />
                        <img onClick={() => { setMainImage(images.fourthImage) }} src={images.fourthImage} alt="" />
                    </div>
                    <div className="accessory-view-img">
                        <img src={mainImage} className={`accessory-view-main-image ${animationClass}`} alt="" />
                    </div>
                </div>
                <div className="accessory-view-right">
                    <h1>{name}</h1>
                    <div className="accessory-view-right-star">
                        <img src={fassets.rating_starts} alt="" />
                        <p>{reviewCount}</p>
                    </div>
                    <div className="accessory-view-right-prices">
                        <div className="accessory-view-right-price-old">
                            ${price.oldPrice}
                        </div>
                        <div className="accessory-view-right-price-new">
                            ${price.newPrice}
                        </div>
                    </div>
                    <div className="accessory-view-right-description">
                        <p>{description}</p>
                    </div>
                    <div className="accessory-view-right-size">
                        <h1>Details For You</h1>
                        <div className="accessory-view-right-sizes">
                            <div>Quantity : {!cartItem[id] ? 0 : cartItem[id]}</div>
                            <div className="chrome" onClick={() => removeFromCart(id)}>Remove From Cart</div>
                        </div>
                        <div className="other-details-container">
                            <p className="accessory-view-right-category"> <span>Category : {category}, {name}</span></p>
                            <p className="accessory-view-right-category"> <span>Additional Info : {additionalInfo.material}</span> <br /> Compability : {additionalInfo.compatibility.map((item, i) => { return (<> <li key={i}>{item}</li></>) })}</p>
                        </div>

                    </div>
                    <div className="quantity-container">
                        <div className="accessories-item-img-container">

                            {/* {!cartItem[id] ? <img className="add" onClick={() => addToCart(id)} src={fassets.add_icon_white} alt="" />
                                : <div className="accessory-item-counter">
                                    <img src={fassets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                                    <p>{cartItem[id]}</p>
                                    <img className="adds" onClick={() => addToCart(id)} src={fassets.add_icon_green} alt="" />
                                </div>
                            } */}
                        </div>

                    </div>
                    <div className="buttons">
                        <Link to={'/cart'}><button className="buy-now" onClick={() => { cartItem[id] === undefined || !cartItem[id] == NaN ? addToCart(id) : console.log(cartItem[id]) }}>BUY NOW</button></Link>
                        <button className="add-to" onClick={() => { addToCart(id) }} >ADD TO CART</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccessoryView;