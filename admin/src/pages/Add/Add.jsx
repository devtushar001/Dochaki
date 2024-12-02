import React, { useEffect, useState } from "react";
import './Add.css';
import nav_icon from "../../assets/db";

const Add = () => {
  const [images, setImages] = useState({
    mainImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null
  });

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Universal",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
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
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("images", images);
  }

  return (
    <div className="add">
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="all-image-upload">
          {/* Main Image */}
          <div className="add-image-upload flex-col">
            <p>Main Image</p>
            <label htmlFor="mainImage">
              <img
                src={images.mainImage ? URL.createObjectURL(images.mainImage) : nav_icon.heart_icon}
                alt="Main"
                className="image-box"
              />
            </label>
            <input
              onChange={(e) => onImageChange(e, 'mainImage')}
              type="file"
              id="mainImage"
              required
              hidden
            />
          </div>

          {/* Second Image */}
          <div className="add-image-upload flex-col">
            <p>Second Image</p>
            <label htmlFor="secondImage">
              <img
                src={images.secondImage ? URL.createObjectURL(images.secondImage) : nav_icon.heart_icon}
                alt="Second"
                className="image-box"
              />
            </label>
            <input
              onChange={(e) => onImageChange(e, 'secondImage')}
              type="file"
              id="secondImage"
              hidden
            />
          </div>

          {/* Third Image */}
          <div className="add-image-upload flex-col">
            <p>Third Image</p>
            <label htmlFor="thirdImage">
              <img
                src={images.thirdImage ? URL.createObjectURL(images.thirdImage) : nav_icon.heart_icon}
                alt="Third"
                className="image-box"
              />
            </label>
            <input
              onChange={(e) => onImageChange(e, 'thirdImage')}
              type="file"
              id="thirdImage"
              hidden
            />
          </div>

          {/* Fourth Image */}
          <div className="add-image-upload flex-col">
            <p>Fourth Image</p>
            <label htmlFor="fourthImage">
              <img
                src={images.fourthImage ? URL.createObjectURL(images.fourthImage) : nav_icon.heart_icon}
                alt="Fourth"
                className="image-box"
              />
            </label>
            <input
              onChange={(e) => onImageChange(e, 'fourthImage')}
              type="file"
              id="fourthImage"
              hidden
            />
          </div>
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
              id=""
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="ktm">KTM</option>
              <option value="royal-enfield">R-Enfield</option>
              <option value="harley-davidson">H-Davidson</option>
              <option value="keeway">Keeway</option>
              <option value="kawasaki">Kawasaki</option>
              <option value="hero">Hero</option>
              <option value="honda">Honda</option>
              <option value="triumph">Triumph</option>
              <option value="bmw">BMW</option>
              <option value="eliminator">Eliminator</option>
              <option value="universal">Universal</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
