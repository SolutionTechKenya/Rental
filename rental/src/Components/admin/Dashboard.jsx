import React, { useEffect, useState } from "react";
import "../../css/admin/Dashboard.css";
import { useAuth } from "./AuthProvider";
import api from "../../Api";
import OccupancyCharts from "../boxes/PieChart";
import Greeting from "../boxes/Greeting";

const App = () => {
  const { user, setUser,setRooms, setTenants, tenants, buildings, setActivePage, currentBuilding, setCurrentBuilding } = useAuth();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await api.get("/api/add/tenant/");
        const data = res.data;
        console.log("Tenant data:", data);
        setUser((prev) => ({ ...prev, userdata: data }));
        setRooms((prev) => ({ ...prev, rooms: data.rooms }));
        setTenants((prev) => ({ ...prev, tenants: data.tenants }));
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchTenants(); 
  }, [setUser]); 

  // useEffect(() => {
  //   console.log("Current Building:", currentBuilding);
  // }
  // , [currentBuilding]);

  return (
    <div style={{ width: "90%" }}>
      <Greeting />

      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Houses</h2>
          <p>{buildings?.buildings?.length || 0}</p>
          <a href="#buildings">Overview</a>
        </div>
        <div className="card">
          <h2>Total Tenants</h2>
          <p>{ user?.userdata?.count || 0}</p>
          <a href="#my-Tenants" onClick={() => { setActivePage('tenants'); }}>View Tenants</a>
        </div>
        <div className="card">
          <h2>Payments This Month</h2>
          <p>{ user?.userdata?.total_payments || 0 }</p>
          <a href="#payments" onClick={() => { setActivePage('finance'); }}>View Payments</a>
        </div>
        <div className="card">
          <h2>Notifications</h2>
          <p>{user?.userdata?.notifications || 0}</p>
          <a href="#notifications" onClick={() => { setActivePage('notifications'); }}>View Notifications</a>
        </div>
      </div>
      <hr />
      <div id="buildings" className="buildings-overview">
        {buildings.buildings && (
          <div className="buildings-nav">
            {buildings.buildings.map((building, index) => (
              <button
                key={index}
                className={`building-button ${building.name === currentBuilding ? 'active' : ''}`}
                onClick={() => {console.log(`Selected Building: ${building.name}`); setCurrentBuilding(building.name);}}
              >
                {building.name}
              </button>
            ))}
          </div>
        )}

        <div className="charts-section">
          <div className="dashboard-header">Overview: { currentBuilding }</div>
          <OccupancyCharts />
        </div>
      </div>
    </div>
  );
};

export default App;
