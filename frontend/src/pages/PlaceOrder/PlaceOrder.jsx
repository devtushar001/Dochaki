import React, { useEffect, useState } from "react";
import './PlaceOrder.css';
import { useContext } from "react";
import { DochakiContext } from "../../components/Context/Contact";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, bikeAccessories, cartItem, url } = useContext(DochakiContext);
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const validateForm = () => {
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      toast.error("Please fill all required fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error("Invalid email address.");
      return false;
    }
    if (!/^[0-9]{10}$/.test(data.phone)) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Form submitted successfully!");
      console.log("Form Data:", data);
      // Submit form data to the backend or proceed further
    }
  };

  useEffect(() => {
    console.log("Current Form Data:", data);
  }, [data]);

  return (
    <>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
              required
            />
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
              required
            />
          </div>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
            required
          />
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip code"
            />
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="tel"
            placeholder="Phone"
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Shipping Fee + GST</p>
              <p>&#8377;{(getTotalCartAmount() * 0.15).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>&#8377;{(getTotalCartAmount() + getTotalCartAmount() * 0.15).toFixed(2)}</p>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
