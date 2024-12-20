import React, { useState } from "react";
import { Home, CreditCard, BellRing, ClipboardMinus, Users, Link, Calendar } from 'lucide-react';
import "../css/TenantDashboard.css";
import { useNavigate } from "react-router-dom";
import Logout from "../Components/boxes/LogoutButton";

// Importing individual pages
import Dashboard from "../Components/admin/Dashboard";
import Finance from "../Components/admin/Finance";
import Tenants from "../Components/admin/Tenants";
import Reports from "../Components/admin/Reports";
import CalendarComponent from "../Components/admin/Calendar";
import Notifications from '../Components/admin/Notifications';
import Us from '../Components/boxes/Us';

import { useAuth } from "../Components/admin/AuthProvider";

const Admin = () => {
  const {activePage, setActivePage} = useAuth();
  setActivePage(activePage);
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />,
      component: Dashboard
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: <CreditCard size={20} />,
      component: Finance
    },
    {
      id: 'tenants',
      label: 'Tenants',
      icon: <Users size={20} />,
      component: Tenants
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <ClipboardMinus size={20} />,
      component: Reports
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <BellRing size={20} />,
      component: Notifications
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: <Calendar size={20} />,
      component: CalendarComponent
    },
    {
      id: 'us',
      component: Us
    },
  ]

  
  let ActivePageComponent = menuItems.find(item => item.id === activePage)?.component || Dashboard;
  return (
    <div className="tenant-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-section">
        <div className="logo"><p>ADMIN</p></div>
          {menuItems.slice(0, -1).map((item) => (
            <button 
              key={item.id}
              className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          </div>
          <div>
          <Logout />
          <button 
            className={`sidebar-item ${activePage === 'us' ? 'active' : ''}`}
            key="us"
            onClick={() => {
              setActivePage('us')
              }}
          >
              <Link size={20} />
              <span>Us</span>
            </button>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <ActivePageComponent />
      </div>
    </div>
  );
};

export default Admin;
