import React from "react";
import "../../css/admin/Dashboard.css";

const FinancialManagement = () => {
  return (
    <>
        <div className="dashboard-header">Financial Overview</div>

        <div className="dashboard-cards">
          <div className="card">
            <h2>Cash Inflow</h2>
            <p>$5,000</p>
            <a href="#">View Details</a>
          </div>
          <div className="card">
            <h2>Cash Outflow</h2>
            <p>$3,000</p>
            <a href="#">View Details</a>
          </div>
          <div className="card">
            <h2>Payment Status</h2>
            <p>Paid/Unpaid</p>
            <a href="#">View Payments</a>
          </div>
        </div>

        <div className="summary-section">
          <h2>Summary Reports</h2>
          <ul>
            <li>Payments</li>
            <li>Overdue</li>
            <li>Other Financial Reports</li>
          </ul>
        </div>
      
    </>
  );
};

export default FinancialManagement;