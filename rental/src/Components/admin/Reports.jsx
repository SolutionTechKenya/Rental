import React from "react";
import "../../css/admin/Reports.css";

const Reports = () => {
  return (
    <div>
        <div className="dashboard-header">Reports Overview</div>

        <div className="reports-section">
          <h2>Summary Reports</h2>
          <ul>
            <li>Payments</li>
            <li>Overdue Payments</li>
            <li>Other Financial Reports</li>
          </ul>
        </div>

        <div className="reports-section">
          <h2>Financial Breakdown</h2>
          <p>Details about income and expenses for the specified period.</p>
          <button className="action-button">View Breakdown</button>
        </div>

        <div className="reports-section">
          <h2>Payment Due Dates</h2>
          <p>View all upcoming payment deadlines.</p>
          <button className="action-button">View Due Dates</button>
        </div>

        <div className="reports-section">
          <h2>Events and Reminders</h2>
          <p>Check scheduled events or reminders for financial activities.</p>
          <button className="action-button">View Events</button>
        </div>
      
    </div>
  );
};

export default Reports;