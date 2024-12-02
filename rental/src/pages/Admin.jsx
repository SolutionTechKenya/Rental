import React from "react";
import "../css/Admin.css";

const Admin = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>House Rental Management System</h1>
        <p>Administrator</p>
      </div>

      {/* Sidebar */}
      <div className="admin-sidebar">
        <ul>
          <li>Dashboard</li>
          <li>House Type</li>
          <li>Houses</li>
          <li>Tenants</li>
          <li>Payments</li>
          <li>Users</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">Welcome back Administrator</div>

        <div className="dashboard-cards">
          <div className="card">
            <h2>Total Houses</h2>
            <p>1</p>
            <a href="#">View List</a>
          </div>
          <div className="card">
            <h2>Total Tenants in the ployy</h2>
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
    </div>
  );
};

export default Admin;