import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import VoiceAssistant from './VoiceAssistant'; // Import the VoiceAssistant component

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));
  const [isAssistantActive, setIsAssistantActive] = useState(false); // Track if voice assistant is active

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear login session
    navigate('/'); // Redirect to Home after logout
  };

  const toggleVoiceAssistant = () => {
    setIsAssistantActive(!isAssistantActive); // Toggle voice assistant
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-title" onClick={() => navigate('/')}>ShopFusion</h1>
        <div className="nav-links">
          {!isAuthenticated ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/about">About Us</Link>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/tracking">Tracking</Link>
              <Link to="/order">Orders</Link>
              <Link to="/fashion">Fashion</Link>
              
              <Link to="/about">About Us</Link>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          )}
        </div>

        {/* Button to toggle the Voice Assistant */}
        <button className="voice-button" onClick={toggleVoiceAssistant}>
          {isAssistantActive ? "Stop Assistant" : "Start Assistant"}
        </button>
      </nav>

      {/* Voice Assistant Component */}
      <VoiceAssistant isActive={isAssistantActive} setIsActive={setIsAssistantActive} />
    </>
  );
}

export default Navbar;
