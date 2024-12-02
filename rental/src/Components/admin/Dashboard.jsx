import React from "react";
import "../../css/admin/Dashboard.css";

const App = () => {
  return (
    <div className="main-content">
    <div className="dashboard-header">Welcome back Administrator</div>

    <div className="dashboard-cards">
      <div className="card">
        <h2>Total Houses</h2>
        <p>1</p>
        <a href="#">View List</a>
      </div>
      <div className="card">
        <h2>Total Tenants</h2>
        <p>1</p>
        <a href="#">View List</a>
      </div>
      <div className="card">
        <h2>Payments This Month</h2>
        <p>0.00</p>
        <a href="#">View Payments</a>
      </div>
    </div>
  </div>
  );
};

export default App;