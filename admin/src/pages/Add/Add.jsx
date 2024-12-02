import React, { useEffect, useState } from "react";
import './Add.css';
import nav_icon from "../../assets/db";
import axios from 'axios';

const Add = () => {

  const url = 'http://localhost:8000';

  const [images, setImages] = useState({
    mainImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null
  });

  const [data, setData] = useState({
    name: "",
    description: "",
    oldPrice: "",
    newPrice: "",
    currency: "",
    category: "Universal",
    material: "",
    compatibility: "",
    reviews: 0,
    reviewCount: 0
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onImageChange = (event, imageType) => {
    setImages((prevImages) => ({
      ...prevImages,
      [imageType]: event.target.files[0]
    }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("oldPrice", Number(data.oldPrice));
    formData.append("newPrice", Number(data.newPrice));
    formData.append("currency", data.currency);
    formData.append("category", data.category);
    formData.append("material", data.material);
    formData.append("compatibility", data.compatibility);
    formData.append("reviews", data.reviews);
    formData.append("reviewCount", data.reviewCount);

    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formData.append(key, images[key]);
      }
    });

    // Send the formData to the backend
    const response = await axios.post(`${url}/api/accesory/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        oldPrice: "",
        newPrice: "",
        currency: "",
        category: "Universal",
        material: "",
        compatibility: "",
        reviews: 0,
        reviewCount: 0
      })
    } else {

    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* Image Upload Section */}
        <div className="all-image-upload">
          {["mainImage", "secondImage", "thirdImage", "fourthImage"].map((imgType, index) => (
            <div key={imgType} className="add-image-upload flex-col">
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
                onChange={(e) => onImageChange(e, imgType)}
                hidden
              />
            </div>
          ))}
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
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
            onChange={onChangeHandler}
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
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="ktm">KTM</option>
              <option value="royal-enfield">Royal Enfield</option>
              <option value="harley-davidson">Harley Davidson</option>
              <option value="universal">Universal</option>
              {/* Add other options */}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Old Price</p>
            <input
              onChange={onChangeHandler}
              value={data.oldPrice}
              type="number"
              name="oldPrice"
              placeholder="Old Price"
            />
            <p>New Price</p>
            <input
              onChange={onChangeHandler}
              value={data.newPrice}
              type="number"
              name="newPrice"
              placeholder="New Price"
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="add-reviews">
          <p>Reviews</p>
          <input
            onChange={onChangeHandler}
            value={data.reviews}
            type="number"
            name="reviews"
            placeholder="Reviews"
          />
          <p>Review Count</p>
          <input
            onChange={onChangeHandler}
            value={data.reviewCount}
            type="number"
            name="reviewCount"
            placeholder="Review Count"
          />
        </div>

        {/* Others' Details */}
        <hr />
        <h2>Other Details</h2>
        <div className="others-data flex-col">
          <p>Material</p>
          <input
            onChange={onChangeHandler}
            value={data.material}
            type="text"
            name="material"
            placeholder="Material (e.g., Steel)"
          />

          <p>Compatibility</p>
          <input
            onChange={onChangeHandler}
            value={data.compatibility}
            type="text"
            name="compatibility"
            placeholder="Compatibility (e.g., Model names)"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
