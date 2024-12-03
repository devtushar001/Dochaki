import React, { useState } from "react";
import './NewAdd.css'
const NewAdd = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    oldPrice: "",
    newPrice: "",
    currency: "",
    category: "Universal",
    material: "",
    compatibility: "",
    reviews: "",
    reviewCount: "",
  });

  const [images, setImages] = useState({
    mainImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null,
  });

  // Handle text data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e, imageType) => {
    setImages((prev) => ({
      ...prev,
      [imageType]: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append text data to formData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append images to formData
    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formData.append(key, images[key]);
      }
    });

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:8000/api/accessory/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Accessory added successfully:", result);
      alert("Accessory added successfully!");

    } catch (error) {
      console.error("Error adding accessory:", error);
      alert("Error adding accessory.");
    }
    setData({
      name: "",
      description: "",
      oldPrice: "",
      newPrice: "",
      currency: "",
      category: "Universal",
      material: "",
      compatibility: "",
      reviews: "",
      reviewCount: "",
    })
  };

  return (
    <div className="add">
      <h2>Add New Accessory</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Product Name */}
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        {/* Product Category */}
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleChange}
            required
          >
            <option value="Universal">Universal</option>
            <option value="BMW">BMW</option>
            <option value="Harley Davidson">Harley Davidson</option>
            <option value="KTM">KTM</option>
            {/* Add more categories */}
          </select>
        </div>

        {/* Prices */}
        <div>
          <label htmlFor="oldPrice">Old Price:</label>
          <input
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={data.oldPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="newPrice">New Price:</label>
          <input
            type="number"
            id="newPrice"
            name="newPrice"
            value={data.newPrice}
            onChange={handleChange}
            required
          />
        </div>

        {/* Currency */}
        <div>
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={data.currency}
            onChange={handleChange}
            required
          />
        </div>

        {/* Material */}
        <div>
          <label htmlFor="material">Material:</label>
          <input
            type="text"
            id="material"
            name="material"
            value={data.material}
            onChange={handleChange}
            required
          />
        </div>

        {/* Compatibility */}
        <div>
          <label htmlFor="compatibility">Compatibility:</label>
          <input
            type="text"
            id="compatibility"
            name="compatibility"
            value={data.compatibility}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reviews and Review Count */}
        <div>
          <label htmlFor="reviews">Reviews:</label>
          <input
            type="number"
            id="reviews"
            name="reviews"
            value={data.reviews}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="reviewCount">Review Count:</label>
          <input
            type="number"
            id="reviewCount"
            name="reviewCount"
            value={data.reviewCount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Uploads */}
        {["mainImage", "secondImage", "thirdImage", "fourthImage"].map((imgType) => (
          <div key={imgType}>
            <label htmlFor={imgType}>Upload {imgType.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
            <input
              type="file"
              id={imgType}
              name={imgType}
              onChange={(e) => handleImageChange(e, imgType)}
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewAdd;
