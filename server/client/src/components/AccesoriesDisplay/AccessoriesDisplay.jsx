import React, { useContext, useEffect } from "react";
import AccessoriesItem from "../AcceesoriesItem/AccessoriesItem";
import { DochakiContext } from "../Context/Contact";
import './AccessoriesDisplay.css'

const AccessoriesDisplay = ({ category }) => {
    const { bikeAccessories } = useContext(DochakiContext);
    const lastSixProducts = bikeAccessories.slice(-6);
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <>
            <div className="accessories-display" id="accessories-display">
                <h2>Our latest products</h2>
                <div className="accessories-display-list">
                    {lastSixProducts.map((item, i) => {
                        if (category === "All" || category === item.category) {
                            return <AccessoriesItem key={i} _id={item._id} name={item.name} category={item.category} subcategory={item.subcategory} price={item.price} images={item.images.mainImage} reviews={item.reviews} reviewCount={item.reviewCount} />
                        } 
                    })}
                </div>

            </div>
        </>
    )
}
export default AccessoriesDisplay;