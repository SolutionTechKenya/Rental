import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Home, CreditCard, BellRing, ClipboardMinus, Users, LogOut, LogIn, FileText, Calendar, ChartPie } from 'lucide-react';
import "../css/TenantDashboard.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

// Importing individual pages
import Dashboard from "../Components/admin/Dashboard";
import Finance from "../Components/admin/Finance";
import Tenants from "../Components/admin/Tenants";
import Reports from "../Components/admin/Reports";
import CalendarComponent from "../Components/admin/Calendar";
import Notifications from '../Components/admin/Notifications';

const Admin = () => {
  const [activePage, setActivePage] = useState('dashboard');
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
    }
  ]
  
  const [buildings, setBuildings] = useState([]);
  
  const [tenants, setTenants] = useState([]);
  
  const navigate = useNavigate();
  const ActivePageComponent = menuItems.find(item => item.id === activePage)?.component || Dashboard;
  const handleLogOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate('/login');
  }
  return (
    <div className="tenant-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo"><p>ADMIN</p></div>
        <nav>
          {menuItems.map((item) => (
            <button 
              key={item.id}
              className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button className="sidebar-item logout" onClick={handleLogOut}>
            <LogOut size={20} />
            <span onClick={handleLogOut}>Log out</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <ActivePageComponent />
      </div>
    </div>
  );
};

export default Admin;
