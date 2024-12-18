import React, {useContext, useState, useEffect} from "react";
import { DochakiContext } from "../Context/Contact";
import { toast } from "react-toastify";
import './ShopCategories.css';


const ShopCategories = ({ category, setCategory }) => {
    const { url } = useContext(DochakiContext)
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        // Function to fetch categories
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${url}/api/category/get`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (!data.success) {
                    toast.error(data.message)
                }
                setCategories(data.categories); // Assuming response data is an array
                toast.success(data.message)
            } catch (err) {
                toast.error(err)
            }
        };

        fetchCategories();
        window.scrollTo(0,0);
    }, []); // Empty dependency array ensures it runs only once

    return (
        <>
            <div className="shop-categories">
                {categories.map((item, i) => {
                    return (
                        <div key={i} className="shop-category-item" onClick={() => { setCategory(prev => prev === item.menu_name ? "All" : item.menu_name) }}>
                            <img className={category === item.menu_name ? "active" : ""} src={`${url}/${item.menu_image}`} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </>
    )
}

export default ShopCategories;