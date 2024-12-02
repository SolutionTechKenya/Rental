import React from "react";
import "../../css/admin/Tenants.css";

const TenantsManagement = () => {
  return (
    <div>
      <div className="main-content">
        <div className="dashboard-header">Manage Tenants</div>

        <div className="tenant-actions">
          <button className="action-button">Add Tenant</button>
          <button className="action-button">View All Tenants</button>
          <button className="action-button">Room Assignments</button>
        </div>

        <div className="tenants-list">
          <h2>Tenant List</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Room 101</td>
                <td>+1234567890</td>
                <td>
                  <button className="action-button">Edit</button>
                  <button className="action-button">Remove</button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Room 102</td>
                <td>+9876543210</td>
                <td>
                  <button className="action-button">Edit</button>
                  <button className="action-button">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default TenantsManagement;