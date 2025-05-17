// ✅ Updated ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  // ✅ Function to add item to cart
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price, // ✅ Correct price added here
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
    navigate("/cart");
  };

  if (loading) return <p>Loading product details...</p>;

  return (
    <div className="product-detail-container">
      <img
        src={product.image}
        alt={product.title}
        className="product-detail-image"
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="product-price">₹{product.price}</p>
      <button className="add-to-cart" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
