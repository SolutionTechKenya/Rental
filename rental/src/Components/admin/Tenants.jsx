import React, { useState, useEffect } from "react";
import api from '../../Api'
import "../../css/admin/Tenants.css";

const TenantsManagement = () => {
  // State to manage which view is active
  const [view, setView] = useState("viewAll");

  // State to manage tenant form inputs
  const [tenantForm, setTenantForm] = useState({
    username: "",
    password: "",
    room: "",
    phone: "",
    is_tenant: 1
  });

  // State for room assignment form
  const [assignmentForm, setAssignmentForm] = useState({
    tenantName: "",
    roomNumber: "",
  });

  // Mock data for tenants
  const [tenants, setTenants] = useState([
    { id: 1, username: "John Doe", room: "Room 101", phone: "+1234567890" },
    { id: 2, username: "Jane Smith", room: "Room 102", phone: "+9876543210" },
  ]);

  const fetchTenants = async () => {
    try {
      const res = await api.get('/api/add/tenant/'); // Replace with the correct API base URL
      console.log(res.data.tenants)
      setTenants(res.data.tenants);
    }
    catch (error) {
      console.log("Error fetching tenants data..")
    }
  }

  // Handle input changes for add tenant form
  const handleTenantFormChange = (e) => {
    const { name, value } = e.target;
    setTenantForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tenant addition
  const handleAddTenant = async (e) => {
    e.preventDefault();
    const newTenant = {
      // id: tenants.length + 1,
      ...tenantForm,
    };
    console.log(newTenant)
    const res = await api.post('/api/add/tenant/', newTenant)
    setTenants((prev) => [...prev, newTenant]);
    setTenantForm({ username: "", room: "", phone: "" }); // Reset form
    setView("viewAll"); // Go back to tenant list
  };

  // Handle room assignment form change
  const handleAssignmentFormChange = (e) => {
    const { username, value } = e.target;
    setAssignmentForm((prev) => ({ ...prev, [username]: value }));
  };

  // Handle room assignment submission (placeholder logic)
  const handleAssignRoom = (e) => {
    e.preventDefault();
    alert(`Assigning ${assignmentForm.tenantName} to ${assignmentForm.roomNumber}`);
    setAssignmentForm({ tenantName: "", roomNumber: "" }); // Reset form
  };

  useEffect(() => {
    fetchTenants();
  }, [])

  const rooms = [
    { id: "101", roomNo: "101", buildingId: "1" },
    { id: "102", roomNo: "102", buildingId: "1" },
    { id: "201", roomNo: "201", buildingId: "2" },
  ];
  const buildings = [
    { id: "1", name: "Building A" },
    { id: "2", name: "Building B" },
  ];
  const filteredRooms = rooms.filter((room) => room.buildingId === tenantForm.building);
  return (
    <div>
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">Manage Tenants</div>

        {/* Action Buttons */}
        <div className="tenant-actions">
          <button className="action-button" onClick={() => setView("add")}>
            Add Tenant
          </button>
          <button className="action-button" onClick={() => setView("viewAll")}>
            View All Tenants
          </button>
          <button className="action-button" onClick={() => setView("assign")}>
            Room Assignments
          </button>
        </div>

        {/* Conditional Rendering */}
        {view === "add" && (
          <div>
            <h2>Add New Tenant</h2>
            {/* 
            {
    "password": "Albert",
    "userusername": "Albert", 
"phone": "0779337634",
 "room": "QN-001",
 "is_tenant": 1
 } */}
 <form onSubmit={handleAddTenant}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={tenantForm.username}
            onChange={handleTenantFormChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={tenantForm.password}
            onChange={handleTenantFormChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Building:
          <select
            name="building"
            value={tenantForm.building}
            onChange={handleTenantFormChange}
            required
          >
            <option value="">Select a building</option>
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Room:
          <select
            name="room"
            value={tenantForm.room}
            onChange={handleTenantFormChange}
            required
            disabled={!tenantForm.building} // Disable until a building is selected
          >
            <option value="">Select a room</option>
            {filteredRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomNo}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Contact:
          <input
            type="text"
            name="phone"
            value={tenantForm.phone}
            onChange={handleTenantFormChange}
            required
          />
        </label>
      </div>
      <button type="submit" className="action-button">
        Add Tenant
      </button>
    </form>
          </div>
        )}

        {view === "viewAll" && (
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
                {tenants.map((tenant) => (
                  <tr key={tenant.room}>
                    <td>{tenant.username}</td>
                    <td>{tenant.room_name}</td>
                    <td>{tenant.phone}</td>
                    <td>
                      <button className="action-button">Edit</button>
                      <button
                        className="action-button"
                        onClick={() =>
                          setTenants((prev) => prev.filter((t) => t.id !== tenant.id))
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "assign" && (
          <div>
            <h2>Assign Room</h2>
            <form onSubmit={handleAssignRoom}>
              <div>
                <label>
                  Tenant Name:
                  <input
                    type="text"
                    name="tenantName"
                    value={assignmentForm.tenantName}
                    onChange={handleAssignmentFormChange}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Room Number:
                  <input
                    type="text"
                    name="roomNumber"
                    value={assignmentForm.roomNumber}
                    onChange={handleAssignmentFormChange}
                    required
                  />
                </label>
              </div>
              <button type="submit" className="action-button">
                Assign Room
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantsManagement;
