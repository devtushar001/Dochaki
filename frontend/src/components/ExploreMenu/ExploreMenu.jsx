import React, { useContext, useEffect, useState } from "react";
import './ExploreMenu.css';
import {toast} from 'react-toastify'
import { menu_list } from '../../assets/assets';
import { DochakiContext } from "../Context/Contact";

const ExploreMenu = ({ category, setCategory }) => {
    const {url} = useContext(DochakiContext)
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
    }, []); // Empty dependency array ensures it runs only once



    return (
        <>
            <div className="explore-menu" id="explore-menu">
                <h1>Explore our menu</h1>
                <p className="explore-menu-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis aperiam, repudiandae quas molestiae suscipit ratione sequi ea dignissimos, amet libero nemo optio? Sed facere recusandae cupiditate esse deserunt ullam quasi.</p>
                <div className="explore-menu-list">
                    {categories.map((item, i) => {
                        return (
                            <div key={i} className="explore-menu-list-item" onClick={() => { setCategory(prev => prev === item.menu_name ? "All" : item.menu_name) }}>
                                <img className={category === item.menu_name ? "active" : ""} src={`${url}/${item.menu_image}`} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })}
                </div>
                <hr />
            </div>
        </>
    )
}
export default ExploreMenu;