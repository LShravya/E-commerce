import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(/images/1.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name"><strong>Item:</strong> {item.title}</p>
                  <p className="cart-item-price"><strong>Price:</strong> ₹{item.price}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="total-container">
              <h3>Total: ₹{totalAmount}</h3>
              <button
                className="proceed-btn"
                onClick={() => navigate('/payment', { state: { cartItems: cart } })}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
