import React, { useContext, useState, useEffect } from "react";
import './MyOrders.css';
import { fassets } from '../../frontend_assets/assets';
import { DochakiContext } from "../../components/Context/Contact";

const MyOrder = () => {
    const { url, token } = useContext(DochakiContext);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const myOrders = async () => {
        setLoading(true);
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
                setOrders(result.orders);
            } else {
                setError("No orders found or request unsuccessful.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        if (token && url) {
            myOrders();
        }
    }, [token, url]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="container">
                    {orders.map((order, i) => (
                        <div key={i} className="my-orders-order">
                            <img src={fassets.parcel_icon} alt="" />
                            <p>
                                {order?.items?.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ",";
                                    }
                                })}
                            </p>
                            <p id={order.payment ? "money": "fail"}>&#8377; {Math.round(order.amount)}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span>&#x25cf;</span>
                                <b> {order.status}</b>
                            </p>
                            <button onClick={myOrders}>Track Order</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrder;
