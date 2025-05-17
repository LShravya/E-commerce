import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Products.css";

function Products() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "All");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const categoryMap = {
    All: "",
    "Men's clothing": "men's clothing",
    "Women's clothing": "women's clothing",
    Jewellery: "jewelery",
    Electronics: "electronics",
  };

  // Define categories
  const categories = [
    { name: "All", apiName: "", image: "/images/essentials.jpg" },
    { name: "Men's clothing", apiName: "men's clothing", image: "/images/men.jpg" },
    { name: "Women's clothing", apiName: "women's clothing", image: "/images/women.jpg" },
    { name: "Jewellery", apiName: "jewelery", image: "/images/jewelery.jpg" },
    { name: "Electronics", apiName: "electronics", image: "/images/electronics.jpg" },
  ];

  // ✅ Fetch products when category changes
  useEffect(() => {
    setLoading(true);
    let apiUrl = "https://fakestoreapi.com/products";
    if (categoryMap[selectedCategory]) {
      apiUrl = `https://fakestoreapi.com/products/category/${categoryMap[selectedCategory]}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [selectedCategory]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    
    <div className="products-container">
      {/* Category Selection */}
      <h2 className="products-title">Select a Category</h2>
      
      {/* Search Bar in Top-right corner */}
      <div className="header-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="categories-container">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`category-card ${selectedCategory === cat.name ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <img src={cat.image} alt={cat.name} className="clickable-image" />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <h2 className="products-title">{selectedCategory} Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found for "{searchTerm}"</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* View Cart Button */}
      <button className="view-cart-button" onClick={() => navigate("/cart")}>
        View Cart ({cart.length})
      </button>
    </div>
  );
}
export default Products;
