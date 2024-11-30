import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <h2>Welcome, Tenant</h2>
      <p>Here's your account overview and updates.</p>
      
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Rent Paid</h3>
          <p>45,000 KES</p>
        </div>
        <div className="stat-card">
          <h3>Outstanding Balance</h3>
          <p>15,000 KES</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Due Date</h3>
          <p>2024-12-15</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;