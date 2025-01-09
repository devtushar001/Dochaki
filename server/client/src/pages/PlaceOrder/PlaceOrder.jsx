import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css';
import { useContext } from "react";
import { DochakiContext } from "../../components/Context/Contact";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
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

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const orderItems = bikeAccessories
      .filter((item) => cartItem[item._id])
      .map((item) => ({
        ...item,
        quantity: cartItem[item._id],
      }));

    if (orderItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }

    const orderData = {
      address: data, // Validate 'data' before using
      items: orderItems,
      amount: getTotalCartAmount(), // Adjust multiplier as needed
    };

    const newOrderData = JSON.stringify(orderData, null, 2);
    try {
      const response = await fetch("http://localhost:8000/api/order/place", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
          Authorization: `Bearer ${token}`, // Add the Authorization header with the token
        },
        body: newOrderData, // Convert the orderData object to a JSON string
      });
      const result = await response.json();
      console.log(result)
      if (!response.success) {
        toast.error("Something got error");
      }
      const { session_url } = result;
      window.location.replace(session_url);

    } catch (error) {
      toast.error(error)
    }

  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) navigate("/cart")
    else if (getTotalCartAmount() === 0) navigate("/cart")
  }, [token])

  return (
    <>
      <form className="place-order" onSubmit={placeOrder}>
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
              <p>&#8377;{0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
