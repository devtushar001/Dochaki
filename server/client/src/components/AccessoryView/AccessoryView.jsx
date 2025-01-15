import React, { useContext, useState, useEffect } from "react";
import './AccessoryView.css';
import { Link } from "react-router-dom";
import { DochakiContext } from "../Context/Contact";

const AccessoryView = (props) => {
    // console.log(props)
    const { addToCart, removeFromCart, cartItem, url } = useContext(DochakiContext);
    const { _id, name, reviews, reviewCount, category, price, description, images, additionalInfo } = props;
    const [mainImage, setMainImage] = useState(url + "/images/" + images.mainImage);
    const [animationClass, setAnimationClass] = useState('');
    console.log(price)
    useEffect(() => {
        // Trigger the animation when the mainImage changes
        setAnimationClass('slide');
        const timer = setTimeout(() => {
            setAnimationClass(''); // Remove the animation class after it completes
        }, 500); // Time should match with animation duration
        window.scrollTo(0, 0);
        return () => clearTimeout(timer);
    }, [mainImage]);

    return (
        <>
            <div className="accessory-view">
                <div className="accessory-view-left">
                    <div className="accessory-view-img-list">
                        <img onClick={() => { setMainImage(url + "/images/" + images.mainImage) }} src={url + "/images/" + images.mainImage} alt="" />
                        <img onClick={() => { setMainImage(url + "/images/" + images.secondImage) }} src={url + "/images/" + images.secondImage} alt="" />
                        <img onClick={() => { setMainImage(url + "/images/" + images.thirdImage) }} src={url + "/images/" + images.thirdImage} alt="" />
                        <img onClick={() => { setMainImage(url + "/images/" + images.fourthImage) }} src={url + "/images/" + images.fourthImage} alt="" />
                    </div>
                    <div className="accessory-view-img">
                        <img src={mainImage} className={`accessory-view-main-image ${animationClass}`} alt="" />
                    </div>
                </div>
                <div className="accessory-view-right">
                    <h1>{name}</h1>
                    <div className="accessory-view-right-star">
                        <span>Reviews : {reviews}</span><b>&#x2605;</b><p> Review Count : {reviewCount}</p>
                    </div>
                    <div className="accessory-view-right-prices">
                        <div className="accessory-view-right-price-old">
                            &#8377;{price.oldPrice}
                        </div>
                        <div className="accessory-view-right-price-new">
                            &#8377;{price.newPrice}
                        </div>
                    </div>
                    <div className="accessory-view-right-description">
                        <p>{description}</p>
                    </div>
                    <div className="accessory-view-right-size">
                        <h1>Details For You</h1>
                        <div className="accessory-view-right-sizes">
                            {!cartItem[_id] ? " " : <div onClick={() => removeFromCart(_id)} >-</div>}
                            <div>{!cartItem[_id] ? 0 : cartItem[_id]}</div>
                            <div onClick={() => addToCart(_id)} >+</div>
                        </div>
                        <div className="other-details-container">
                            <p className="accessory-view-right-category"> <span>Category : {category}, {name}</span></p>
                            <p className="accessory-view-right-category"> <span>Additional Info : {additionalInfo.material}</span> <br /> Compability : {additionalInfo.compatibility.map((item, i) => { return (<> <li key={i}>{item}</li></>) })}</p>
                        </div>

                    </div>
                    <div className="buttons">
                        <Link to={'/cart'}><button className="buy-now" onClick={() => !cartItem[_id] ? addToCart(_id) : cartItem[_id]} >BUY NOW</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccessoryView;