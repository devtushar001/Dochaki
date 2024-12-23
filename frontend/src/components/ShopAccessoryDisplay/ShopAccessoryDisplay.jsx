import React, { useContext, useEffect } from "react";
import AccessoriesItem from "../AcceesoriesItem/AccessoriesItem";
import { DochakiContext } from "../Context/Contact";
import './ShopAccessoryDisplay.css'

const ShopAccessoryDisplay = ({ category }) => {
    const { bikeAccessories } = useContext(DochakiContext);
    useEffect(()=>{
        console.log(bikeAccessories)
        window.scrollTo(0, 0);
    },[])
    return (
        <>
            <div className="accessories-display" id="accessories-display">
                <h2>Our latest products</h2>
                <div className="accessories-display-list">
                    {bikeAccessories.map((item, i) => {
                        console.log(bikeAccessories);
                        if (category === "All" || category === item.category) {
                            return <AccessoriesItem key={i} _id={item._id} name={item.name} category={item.category} subcategory={item.subcategory} price={item.price} images={item.images.mainImage} reviews={item.reviews} reviewCount={item.reviewCount} />
                        } 
                    })}
                </div>

            </div>
        </>
    )
}
export default ShopAccessoryDisplay;