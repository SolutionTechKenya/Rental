import React, { useState, useEffect } from "react";
import api from '../../Api'
import "../../css/admin/Tenants.css";

const TenantsManagement = () => {
  // State to manage which view is active
  const [view, setView] = useState("viewAll");
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuildings] = useState([]);
  
  // State to manage tenant form inputs
  const [tenantForm, setTenantForm] = useState({
    username: "",
    password: "",
    room: "",
    phone: "",
    is_tenant: 1,
    vacancy: 0
  });

  // State for room assignment form
  const [assignmentForm, setAssignmentForm] = useState({
    tenantName: "",
    roomNumber: "",
  });
  
  const [filteredRooms, setFilteredRooms] = useState([]);
  
  useEffect(() => {
    if (tenantForm.building) {
      const filtered = rooms.filter(room => 
        room.building === parseInt(tenantForm.building) && room.vacancy === true
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms([]);
    }
  }, [tenantForm.building, rooms]);

  // Use another useEffect to log the updated state
  useEffect(() => {
    console.log('filtered rooms', filteredRooms); // Logs when filteredRooms changes
  }, [filteredRooms]);
  
  

  const fetchTenants = async () => {
    try {
      const res = await api.get('/api/add/tenant/'); // Replace with the correct API base URL
      console.log("Buildings", res.data.buildings)
      console.log("Rooms", res.data.rooms)
      console.log("Tenants", res.data.tenants)
      setTenants(res.data.tenants);
      setRooms(res.data.rooms);
      setBuildings(res.data.buildings);
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
    const res = await api.post('/api/add/tenant/', newTenant)
    console.log('Response', res.message)
    setTenants((prev) => [...prev, newTenant]);
    setTenantForm({ username: "", room: "", phone: "" }); // Reset form
    setView("viewAll"); // Go back to tenant list
  };

  // Handle room assignment form change
  const handleAssignmentFormChange = (e) => {
    const { name, value } = e.target;
    setAssignmentForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle room assignment submission (placeholder logic)
  const handleAssignRoom = async (e) => {
    e.preventDefault();
    const res = await api.patch('/api/add/tenant/', assignmentForm)
    console.log("REsponse", res.message)
    alert(`Assigning ${assignmentForm.tenantName} to ${assignmentForm.roomNumber}`);
    setAssignmentForm({ tenantName: "", roomNumber: "" }); // Reset form
  };

  useEffect(() => {
    fetchTenants();
  }, [])

  const handleDeleteTenant = (id) => async () => {
    try {
      console.log("Deleting tenant with id", id)
      await api.delete(`/api/add/tenant/?id=${id}`)
      setTenants((prev) => prev.filter(tenant => tenant.id !== id))
    } catch (error) {
      console.log("Error deleting tenant", error)
    }
  }

  

  return (
    <div>
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
                        // disabled={!tenantForm.building} // Disable until a building is selected
                      >
                        <option value="">Select a room</option>
                        {filteredRooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.room_no}
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
                      {/* <button className="action-button">Edit</button> */}
                      <button
                        className="action-button"
                        onClick={handleDeleteTenant(tenant.id)}
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
  );
};

export default TenantsManagement;
