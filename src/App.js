import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Products from "./Components/Products";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import Tracking from "./Components/Tracking";
import Order from "./Components/Order";
import About from "./Components/About";
import FashionSense from "./Components/FashionSense";
import VoiceAssistant from './Components/VoiceAssistant';

function App() {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <Router>
      <Navbar />
      {/* 👇 Add this line to activate the voice assistant */}
      <VoiceAssistant />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/payment" element={<Payment cartItems={cartItems} clearCart={clearCart} />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/fashion" element={<FashionSense />} />
        <Route path="/order" element={<Order />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
export default App;