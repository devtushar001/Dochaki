import React, { useState, useEffect } from "react";
import './Add.css';
import nav_icon from "../../assets/db";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    name: "",
    description: "",
    oldPrice: "",
    newPrice: "",
    currency: "",
    category: "",
    subcategory: "",
    material: "",
    compatibility: "",
    reviews: "",
    reviewCount: "",
  });

  console.log(data)

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

  // Handle category change and reset subcategory
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setData((prev) => ({
      ...prev,
      category: value,
      subcategory: "", // Reset subcategory when main category changes
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
        toast.error("Failed to add accessory");
        return;
      }

      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }

    // Reset form fields
    setData({
      name: "",
      description: "",
      oldPrice: "",
      newPrice: "",
      currency: "",
      category: "",
      subcategory: "",
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
  };

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${url}/api/nested-category/all-category`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.success) {
          toast.error(data.message);
        }
        setCategories(data.allCategories); // Assuming response data is an array
        toast.success(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchCategories();
  }, [url]);

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

        {/* Category and Subcategory */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={handleCategoryChange}
              value={data.category}
            >
              <option value="">Select Category</option>
              {categories.map((category, i) => (
                <option key={i} value={category.menu_name}>
                  {category.menu_name}
                </option>
              ))}
            </select>

            {/* Subcategory Dropdown */}
            {data.category && categories.find(cat => cat.menu_name === data.category)?.menu_sub.length > 0 && (
              <>
                <p>Subcategory</p>
                <select
                  name="subcategory"
                  onChange={handleChange}
                  value={data.subcategory}
                >
                  <option value="">Select Subcategory</option>
                  {categories.find(cat => cat.menu_name === data.category)?.menu_sub.map((submenu, index) => (
                    <option key={index} value={submenu}>
                      {submenu}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* Pricing Details */}
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
              value={data.currency}
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

      </form>
    </div>
  );
};

export default Add;
