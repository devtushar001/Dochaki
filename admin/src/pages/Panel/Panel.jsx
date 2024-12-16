import React, { useState, useEffect } from 'react';
import './Panel.css'
import { toast } from "react-toastify";
import { fassets } from "../../../../frontend/src/frontend_assets/assets"

const CreateCategory = ({ url }) => {
    const [menuName, setMenuName] = useState('');
    const [menuImage, setMenuImage] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [categories, setCategories] = useState([]);

    // Handle category creation
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!menuName || !menuImage) {
            toast.error("All fields are required")
            setResponseMessage('Please provide both menu name and menu image.');
            return;
        }

        const formData = new FormData();
        formData.append('menu_name', menuName);
        formData.append('menu_image', menuImage);

        try {
            const response = await fetch('http://localhost:8000/api/category/add', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`Success: ${data.message}`);
                setMenuName('');
                setMenuImage(null);
                fetchCategories(); // Re-fetch the categories after adding a new one
            } else {
                const errorData = await response.json();
                setResponseMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setResponseMessage('Error: Something went wrong.');
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setMenuImage(e.target.files[0]);
    };

    // Fetch categories from the backend
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${url}/api/category/get`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data.categories); // Assuming response data is an array
        } catch (err) {
            console.error("Error fetching categories:", err);
            setResponseMessage(err.message);
        }
    };

    // Handle category deletion
    const deleteCategory = async (id) => {
        try {
            const response = await fetch('http://localhost:8000/api/category/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send the category ID in the body
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                fetchCategories(); // Re-fetch categories after deletion
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Error: Failed to delete category.');
            console.error('Error deleting category:', error.message);
        }
    };

    useEffect(() => {
        fetchCategories(); // Fetch categories when component is mounted
    }, []); // Empty dependency array ensures it runs only once

    return (
        <>
            <div className="panel-container">
                {/* Create Category Section */}
                <div className="create-category">
                    <h1>Create Category</h1>
                    <form onSubmit={handleSubmit} className="create-category-form">
                        <div className="form-group">
                            <label htmlFor="menuName">Menu Name:</label>
                            <input
                                type="text"
                                id="menuName"
                                value={menuName}
                                onChange={(e) => setMenuName(e.target.value)}
                                placeholder="Enter menu name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="menuImage">Menu Image:</label>
                            <input
                                type="file"
                                id="menuImage"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Create Category
                        </button>
                    </form>
                    {responseMessage && (
                        <p className={`response-message ${responseMessage.startsWith("Error") ? "error" : "success"}`}>
                            {responseMessage}
                        </p>
                    )}
                </div>

                {/* Update Categories Section */}
                <div className="update-categories">
                    <h2>Update Categories</h2>
                    <div id="options">
                        {categories.map((category, i) => (
                            <div className="category-item" key={i}>
                                <img
                                    src={`${url}/${category.menu_image}`}
                                    alt="Category"
                                    className="category-image"
                                />
                                <p className="category-name">{category.menu_name}</p>
                                <img
                                    src={fassets.cross_icon}
                                    alt="Delete"
                                    className="delete-icon"
                                    onClick={() => deleteCategory(category._id)} // Call delete function with category ID
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
