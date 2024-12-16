import React, { useState, useEffect } from "react";
import './Add.css';
import nav_icon from "../../assets/db";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [categories, setCategories] = useState([]);
  console.log(categories)
  // const url = "http://localhost:8000";
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
      const response = await fetch(`${url}/api/accessory/add`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast.error(response.message);
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error(error);
    }

    // Reset form fields
    setData({
      name: "",
      description: "",
      oldPrice: "",
      newPrice: "",
      currency: "",
      category: "",
      material: "",
      compatibility: "",
      reviews: "",
      reviewCount: "",
    });
    setImages({
      mainImage: null,
      secondImage: null,
      thirdImage: null,
      fourthImage: null,
    });
    toast.success(response.data.success);
  };

  

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${url}/api/category/get`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if(!data.success) {
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
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="all-image-upload">
          {["mainImage", "secondImage", "thirdImage", "fourthImage"].map((imgType, index) => (
            <div key={index} className="add-image-upload flex-col">
              <p>{` ${imgType}`}</p>
              <label htmlFor={imgType}>
                <img
                  src={images[imgType] ? URL.createObjectURL(images[imgType]) : nav_icon.heart_icon}
                  alt={`Preview ${imgType}`}
                  className="image-box"
                />
              </label>
              <input
                type="file"
                id={imgType}
                onChange={(e) => handleImageChange(e, imgType)}
                hidden
              />
            </div>
          ))}
        </div>
        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write Content here"
            required
          ></textarea>
        </div>

        {/* Category and Price */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={handleChange}
              value={data.category}
            >
              {categories.map((category,i)=>{
                return (
                  <>
                   <option key={i} value="">{category.menu_name}</option>
                  </>
                )
              })}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Old Price</p>
            <input
              onChange={handleChange}
              value={data.oldPrice}
              type="number"
              name="oldPrice"
              placeholder="Old Price"
            />
            <p>New Price</p>
            <input
              onChange={handleChange}
              value={data.newPrice}
              type="number"
              name="newPrice"
              placeholder="New Price"
            />
            <p>Currency</p>
            <input
              onChange={handleChange}
              value={handleChange ? "INR" : data.currency}
              // value="INR"
              // value={data.currency}
              type="text"
              name="currency"
              placeholder="Currency Type"
            />
          </div>

        </div>
        <button type="submit" className="add-btn">ADD</button>
        <hr />
        <h2>Other Details</h2>
        {/* Reviews Section */}
        <div className="add-reviews">
          <p>Reviews</p>
          <input
            onChange={handleChange}
            value={data.reviews}
            type="number"
            name="reviews"
            placeholder="Reviews"
          />
          <p>Review Count</p>
          <input
            onChange={handleChange}
            value={data.reviewCount}
            type="number"
            name="reviewCount"
            placeholder="Review Count"
          />
        </div>

        {/* Others' Details */}

        <div className="others-data flex-col">
          <p>Material</p>
          <input
            onChange={handleChange}
            value={data.material}
            type="text"
            name="material"
            placeholder="Material (e.g., Steel)"
          />

          <p>Compatibility</p>
          <input
            onChange={handleChange}
            value={data.compatibility}
            type="text"
            name="compatibility"
            placeholder="Compatibility (e.g., Model names)"
          />
        </div>

        {/* Submit Button */}
        {/* <button type="submit" className="add-btn">ADD</button> */}
      </form>
    </div>
  );
};

export default Add;
