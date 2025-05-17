import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

function Payment({ onPaymentSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Retrieve cart from location state OR fallback to localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(location.state?.cartItems ?? storedCart);
  }, [location.state]);

  function processPayment() {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert(`Payment Successful using ${paymentMethod.toUpperCase()}!`);

    // ✅ Save orders with product name, image, price, and date
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrders = cartItems.map((item, index) => ({
      id: existingOrders.length + index + 1,
      product: item.title, // ✅ Correct product name
      image: item.image, // ✅ Correct product image
      price: item.price, // ✅ Correct price added here
      date: new Date().toLocaleDateString(), // ✅ Date purchased
      status: "Processing",
    }));

    localStorage.setItem("orders", JSON.stringify([...existingOrders, ...newOrders]));

    // ✅ Clear cart after payment
    setCartItems([]);
    localStorage.removeItem("cart");

    setTimeout(() => {
      setIsPaid(true);
      if (onPaymentSuccess) onPaymentSuccess();
    }, 100);
  }

  return (
    <div
      className="payment-container"
      style={{
        backgroundImage: `url('/images/1.png')`,
        backgroundSize: 'cover', // Cover the entire screen
        backgroundPosition: 'center', // Center the image
        height: '100vh', // Make sure the background covers the full viewport
        width: '100vw', // Make sure the background covers the full width of the screen
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="payment-box"
        style={{
          width: '50%',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent to let background image show through
          borderRadius: '10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for better visibility
        }}
      >
        {!isPaid ? (
          <>
            <h2 className="payment-heading">Choose Payment Method</h2>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery (COD)
              </label>
            </div>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Pay with Debit/Credit Card
              </label>
            </div>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                Pay with UPI
              </label>
            </div>
            <br />
            <div className="payment-button-container">
              <button className="checkout-button" onClick={processPayment}>
                Confirm Payment
              </button>
            </div>
          </>
        ) : (
          <div className="thank-you">
            <h2>Thank You for Your Order!</h2>
            <p>Your order is being processed.</p>
            <button onClick={() => navigate("/tracking")}>
              Track Your Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
