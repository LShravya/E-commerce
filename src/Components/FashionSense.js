import React, { useState } from "react";
import axios from "axios";
import "./FashionSense.css";

function FashionSense() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image upload and trigger analysis
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setLoading(true);
    try {
      // Step 1: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fashion_api");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/driefobfm/image/upload",
        formData
      );

      const uploadedUrl = res.data.secure_url;
      setImageUrl(uploadedUrl);
      console.log("Uploaded Image URL:", uploadedUrl);

      // Step 2: Send URL to Fashion Analysis API
      const apiRes = await axios.post(
        `https://fashion-analysis-ai-trend-insights-style-reviews.p.rapidapi.com/?imageUrl=${encodeURIComponent(uploadedUrl)}&noqueue=1&get=check`,
        {},
        {
          headers: {
            "x-rapidapi-key": "d52f19cc8dmsh143ea66c3af6533p165e7djsne6f4632c735f",
            "x-rapidapi-host": "fashion-analysis-ai-trend-insights-style-reviews.p.rapidapi.com",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Fashion Analysis Result:", apiRes.data);
      setResult(apiRes.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze image. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fashion-container">
      <h2>FashionSense AI (Enhanced)</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {loading && <p>Analyzing...</p>}

      {imageUrl && (
        <div>
          <h4>📸 Image Preview:</h4>
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: "300px", margin: "20px 0" }}
          />
        </div>
      )}

      {result && result.result && (
        <div className="result-container">
          <h3>Fashion Analysis Summary</h3>

          <p><strong> Relevance:</strong> {result.result.relevance}</p>

          
          <ul>
            <li><strong>✔️ Strengths:</strong> {result.result.details.strengths}</li>
            <li><strong>⚠️ Weaknesses:</strong> {result.result.details.weaknesses}</li>
            <li><strong>💡 Suggestions:</strong> {result.result.details.suggestions}</li>
          </ul>

          

          
        </div>
      )}
    </div>
  );
}

export default FashionSense;
