import React, { useState, useEffect } from 'react';
import './Panel.css';
import { toast } from 'react-toastify';

const CreateCategory = ({ url }) => {
    const [menuName, setMenuName] = useState('');
    const [menuImage, setMenuImage] = useState(null);
    const [menuSub, setMenuSub] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sub, setSub] = useState(false);
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
            const response = await fetch(`${url}/api/nested-category/add-menu`, {
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
            const response = await fetch(`${url}/api/nested-category/all-category`);
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
            const response = await fetch(`${url}/api/nested-category/delete-parent`, {
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
            const response = await fetch(`${url}/api/nested-category/add-menu-sub`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menu_name: menuName,
                    new_sub: menuSub,
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

    const deleteSubCategory = async (parentId, subId) => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/api/nested-category/delete-sub-category`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ parentId, subId }),
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

    useEffect(() => {
        fetchCategories();

    }, []); // Empty dependency array ensures it runs only once

    return (
        <div className="panel-container">
            {/* Create Category Section */}
            <div className="create-category">
                <h1>{!sub ? "Create Category" : "Add Subcategory"}</h1>
                <form onSubmit={handleSubmit} className="create-category-form">
                    <div className="form-group">
                        <label htmlFor="menuName">Menu Name(required)</label>
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
                        <label htmlFor="menuSub">{!sub ? "Subcategory (optional) " : "New subcategory (required) "}</label>
                        <input
                            type="text"
                            id="menuSub"
                            value={menuSub}
                            onChange={(e) => setMenuSub(e.target.value)}
                            placeholder="Enter submenu name"
                        />
                    </div>
                    {!sub
                        ? <div className="paraent">
                            <div className="form-group">
                                <label htmlFor="menuImage">Menu Image (required)</label>
                                <input
                                    type="file"
                                    id="menuImage"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                            <div className="form-group-btn">
                                <div className="container">
                                    <button type="submit" className="submit-btn" disabled={loading} id='create-ctg'>
                                        {loading ? 'Creating...' : 'Create'}
                                    </button>

                                    <button onClick={() => { setSub(true) }} id='add-ctg-blue'>Add subcategory</button>
                                </div>

                            </div>

                        </div>
                        : <div className="form-group-btn">
                            <label id="selection" htmlFor="menuSub">Select a parent category (required)</label>
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
                            <br />
                            <div className="buttons">
                                <button onClick={addSubCategory} disabled={loading} id='create-ctg'>
                                    {loading ? 'Adding...' : 'Add'}
                                </button>
                                <button onClick={() => { setSub(false) }} id='create-ctg-blue'>Create new category</button>
                            </div>
                        </div>
                    }


                </form>
            </div>

            {/* Add Subcategory Section */}

            <div className="fetch-all-categories">
                <h2>All Categories</h2>
                <div className="categories">
                    {categories.map((category, i) => {
                        return (
                            <>
                                <div className='single-category' key={i}> <div id='flex'><div className="all" id='flexOne'><img id='ctg-img' src={`${url}/${category.menu_image}`} alt="" /><p> {category.menu_name}</p></div> <button id='delete-parent-category' onClick={()=>{deleteCategory(category._id)}}>Delete</button></div> 
                                    <div className='sub-categories'>
                                        {category.menu_sub.map((item, i) => {
                                            return (
                                                <>
                                                    <div key={i} id='opt'><p>&#8594; {item}</p><p id='delete-sub-category' onClick={()=>{deleteSubCategory(category._id, item)}}>X</p></div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
