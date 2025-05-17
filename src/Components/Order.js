// ✅ Updated Order.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
    };

    fetchOrders();

    // ✅ Listen for order updates
    window.addEventListener("storage", fetchOrders);
    return () => window.removeEventListener("storage", fetchOrders);
  }, []);

  // ✅ Reorder functionality
  const handleReorder = (order) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      title: order.product,
      image: order.image,
      price: order.price, // ✅ Correct price
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${order.product} has been added to your cart again!`);
    navigate("/cart"); // ✅ Redirect to cart after reorder
  };

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <img
                src={order.image || "https://via.placeholder.com/100"}
                alt={order.product}
                className="order-image"
              />
              <div className="order-details">
                <span className="order-name">{order.product}</span>
                <span className="order-date">
                  Purchased on: {order.date || "Unknown Date"}
                </span>
                <span className="order-price">Price: ₹{order.price}</span>
              </div>
              <button
                className="reorder-btn"
                onClick={() => handleReorder(order)}
              >
                Reorder
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;
