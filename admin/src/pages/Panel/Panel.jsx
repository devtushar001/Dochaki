import React, { useState, useEffect } from 'react';
import './Panel.css';
import { toast } from 'react-toastify';

const CreateCategory = ({ url }) => {
    const [menuName, setMenuName] = useState('');
    const [menuImage, setMenuImage] = useState(null);
    const [menuSub, setMenuSub] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handle category creation
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!menuName || !menuImage) {
            toast.error('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('menu_name', menuName);
        formData.append('menu_image', menuImage);
        formData.append('menu_sub', menuSub);

        try {
            setLoading(true);
            const response = await fetch(`${url}/api/category/add-menu`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Success: ${data.message}`);
                setMenuName('');
                setMenuSub('');
                setMenuImage(null);
                fetchCategories(); // Re-fetch categories after adding a new one
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            toast.error('Error: Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
            setMenuImage(file);
        } else {
            toast.error('Invalid file type or size. Please upload an image under 5MB.');
        }
    };

    // Fetch categories from the backend
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/api/category/all-category`);
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to fetch categories');
            }

            setCategories(data.allCategories);
            toast.success('Categories loaded successfully');
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle category deletion
    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/api/category/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
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
        } finally {
            setLoading(false);
        }
    };

    // Add Subcategory
    const addSubCategory = async () => {
        if (!menuSub || !menuName) {
            toast.error('Please select a category and enter a subcategory name.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${url}/api/category/add-sub`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menu_name: menuName,
                    menu_sub: menuSub,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                setMenuSub('');
                fetchCategories(); // Re-fetch categories after adding a subcategory
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Error: Failed to add subcategory.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []); // Empty dependency array ensures it runs only once

    return (
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
                        <label htmlFor="menuSub">Menu Sub:</label>
                        <input
                            type="text"
                            id="menuSub"
                            value={menuSub}
                            onChange={(e) => setMenuSub(e.target.value)}
                            placeholder="Enter submenu name"
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
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Category'}
                    </button>
                </form>
            </div>

            {/* Add Subcategory Section */}
            <div className="add-sub-category">
                <h2>Add Subcategory</h2>
                <select
                    className="add-sub-category-select"
                    onChange={(e) => setMenuName(e.target.value)}
                    value={menuName}
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((category) => (
                        <option value={category.menu_name} key={category.id}>
                            {category.menu_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={menuSub}
                    onChange={(e) => setMenuSub(e.target.value)}
                    placeholder="Enter subcategory"
                />
                <button onClick={addSubCategory} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Subcategory'}
                </button>
            </div>
        </div>
    );
};

export default CreateCategory;
