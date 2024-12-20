import React from 'react';
import "../css/admin/Dashboard.css";
import Greeting from "../Components/boxes/Greeting";

const Dashboard = () => {
  return (
    <div style={{ width: "90%" }}>
      <Greeting />
      <div className="dashboard-content">
        <p>Here's your account overview and updates.</p>
        
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Rent Paid</h3>
            <p>45,000 KES</p>
          </div>
          <div className="card">
            <h3>Outstanding Balance</h3>
            <p>15,000 KES</p>
          </div>
          <div className="card">
            <h3>Upcoming Due Date</h3>
            <p>2024-12-15</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;