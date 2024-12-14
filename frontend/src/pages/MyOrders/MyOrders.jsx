import React, { useContext, useState, useEffect } from "react";
import './MyOrders.css';
import { fassets } from '../../frontend_assets/assets';
import { DochakiContext } from "../../components/Context/Contact";

const MyOrder = () => {
    const { url, token } = useContext(DochakiContext);
    const [data, setData] = useState([]);

    const myOrders = async () => {
        try {
            const response = await fetch(`${url}/api/order/myorders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const result = await response.json();
            if (result.success) {
                setData(result.orders); // Update based on actual API structure
            } else {
                setError("No orders found or request unsuccessful.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            myOrders();
        }
    }, [token]); // Call myOrders when the component mounts

    return (
        <>
            <div className="my-orders">
                <h2>My Orders</h2><div className="container">
                    {data.map((order, i) => {
                        console.log(order)
                        return (
                            <>
                                <div key={i} className="my-orders-order">
                                    <img src={fassets.parcel_icon} alt="" />
                                    <p>
                                        {order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return item.name + " x " + item.quantity;
                                            } else {
                                                return item.name + " x " + item.quantity + ",";
                                            }
                                        })}
                                    </p>
                                    <p id="money"> 
                                      &#8377;  {Math.round(order.amount)}.00 </p>
                                    <p>Items: {order.items.length}</p>
                                    <p><span>&#x25cf;</span><b> {order.status}</b></p>
                                    <button>Track Order</button>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default MyOrder;
