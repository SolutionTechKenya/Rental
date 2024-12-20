import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/boxes/Unauthorized.css"; // Optional: Style this page using a CSS file

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <div className="unauthorized-actions">
        <button onClick={() => navigate("/")}>Go to Home</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default Unauthorized;
