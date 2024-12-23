import React, { useContext, useEffect } from "react";
import AccessoriesItem from "../AcceesoriesItem/AccessoriesItem";
import './ShopAccessoryDisplay.css';

const ShopAccessoryDisplay = ({ category, accessories, activeSubCtg }) => {
    console.log('Active Sub-Category:', activeSubCtg);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="accessories-display" id="accessories-display">
                <h2>Our Latest Products</h2>
                <div className="accessories-display-list">
                    {accessories.length > 0 ? (
                        accessories.map((item, i) => {
                            // Improved condition with parentheses and strict comparison
                            if (
                                category === "All" || 
                                (category === item.category && (!activeSubCtg || activeSubCtg === item.subcategory))
                            ) {
                                return (
                                    <AccessoriesItem 
                                        key={i}
                                        _id={item._id}
                                        name={item.name}
                                        category={item.category}
                                        subcategory={item.subcategory}
                                        price={item.price}
                                        images={item.images.mainImage}
                                        reviews={item.reviews}
                                        reviewCount={item.reviewCount}
                                    />
                                );
                            }
                            return null; // Explicitly return null for unmatched conditions
                        })
                    ) : (
                        <p>No accessories found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShopAccessoryDisplay;
