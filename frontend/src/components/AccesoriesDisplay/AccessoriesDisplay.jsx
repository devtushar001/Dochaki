import React, { useContext } from "react";
import AccessoriesItem from "../AcceesoriesItem/AccessoriesItem";
import { DochakiContext } from "../Context/Contact";
import './AccessoriesDisplay.css'

const AccessoriesDisplay = ({ category }) => {
    const { bikeAccessories } = useContext(DochakiContext);
      
    return (
        <>
            <div className="accessories-display" id="accessories-display">
                <h2>Top accessories near you</h2>
                <div className="accessories-display-list">
                    {bikeAccessories.map((item, i) => {
                        if (category === "All" || category === item.category) {
                            return <AccessoriesItem key={i} _id={item._id} name={item.name} category={item.category} price={item.price} images={item.images.mainImage} reviews={item.reviews} reviewCount={item.reviewCount} />
                        } 
                    })}
                </div>

            </div>
        </>
    )
}
export default AccessoriesDisplay;