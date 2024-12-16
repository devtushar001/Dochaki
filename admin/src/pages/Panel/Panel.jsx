import React, { useState } from 'react';
import {toast} from "react-toastify"

const CreateCategory = () => {
    const [menuName, setMenuName] = useState('');
    const [menuImage, setMenuImage] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

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
            } else {
                const errorData = await response.json();
                setResponseMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setResponseMessage('Error: Something went wrong.');
        }
    };

    const handleFileChange = (e) => {
        setMenuImage(e.target.files[0]);
    };

    return (
        <div>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Menu Name:</label>
                    <input
                        type="text"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                        placeholder="Enter menu name"
                    />
                </div>
                <div>
                    <label>Menu Image:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Create Category</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default CreateCategory;
