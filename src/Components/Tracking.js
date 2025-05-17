import React from "react";
import "./Tracking.css"; // Import CSS file

function Tracking() {
  // Sample tracking data
  const trackingInfo = [
    { step: "Order Placed", status: "completed" },
    { step: "Order Confirmed", status: "completed" },
    { step: "Shipped", status: "in-progress" },
    { step: "Out for Delivery", status: "pending" },
    { step: "Delivered", status: "pending" },
  ];

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
      <div className="tracking-container">
        <h2>Order Tracking</h2>
        <div className="tracking-steps">
          {trackingInfo.map((item, index) => (
            <div key={index} className={`tracking-step ${item.status}`}>
              <span className="step-icon">{item.status === "completed" ? "✔" : "⏳"}</span>
              <p className="step-name">{item.step}</p>
              <p className={`status ${item.status}`}>{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
}

export default Tracking;
