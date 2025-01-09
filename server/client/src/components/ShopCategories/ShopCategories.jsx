import React, { useContext, useState, useEffect, useRef } from "react";
import { DochakiContext } from "../Context/Contact";
import { toast } from "react-toastify";
import "./ShopCategories.css";

const ShopCategories = ({ category, setCategory, activeSubCtg, setActiveSubCtg }) => {
    const { url } = useContext(DochakiContext);
    const [categories, setCategories] = useState([]); // Stores fetched categories
    const [activeCtg, setActiveCtg] = useState(null); // Tracks active category

    const sliderRef = useRef(null); // Ref for slider

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/nested-category/all-category`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (!data.success) {
                    toast.error(data.message);
                    return;
                }
                setCategories(data.allCategories || []);
                toast.success(data.message);
            } catch (err) {
                toast.error(err.message || "Failed to fetch categories");
            }
        };
console.log(categories);
        fetchCategories();
        window.scrollTo(0, 0);
    }, []);

    const handleCategoryClick = (item) => {
        setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name));
        setActiveCtg(item);
        setActiveSubCtg(null); // Reset sub-category on category change
    };

    const handleSubCategoryChange = (e) => {
        setActiveSubCtg(e.target.value);
    };

    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 200; // Number of pixels to scroll
            sliderRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
        }
    };

    return (
        <>
            {/* Category Selection */}
            <h2 id="title-ctg">Choose bike brand</h2>
            <div className="slider-container">
                <button
                    className="slider-btn left-btn"
                    onClick={() => scrollSlider("left")}
                >
                    &lt;
                </button>
                <div className="shop-categories" ref={sliderRef}>
                    {categories.map((item, i) => (
                        <div
                            key={i}
                            className={`shop-category-item ${category === item.menu_name ? "active" : ""}`}
                            onClick={() => handleCategoryClick(item)}
                        >
                            {/* Uncomment and add valid image path */}
                            <img
                                src={`${url}/${item.menu_image}`}
                                alt={`Category: ${item.menu_name}`}
                            />
                            <p>{item.menu_name}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="slider-btn right-btn"
                    onClick={() => scrollSlider("right")}
                >
                    &gt;
                </button>
            </div>

            {/* Sub-Category Dropdown */}
            {activeCtg?.menu_sub?.length > 0 && (
                <div className="container">
                    <h2 id="title-ctg">Choose model</h2>
                    <select
                        name="bike-model"
                        id="bike-model"
                        onChange={handleSubCategoryChange}
                        value={activeSubCtg || ""}
                    >
                        <option value="">Choose model</option>
                        {activeCtg.menu_sub.map((subctg, i) => (
                            <option key={i} value={subctg}>{subctg}</option>
                        ))}
                    </select>
                </div>
            )}
            <hr />
        </>
    );
};

export default ShopCategories;
