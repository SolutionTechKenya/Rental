import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Home, CreditCard, Bell, Users, LogOut, FileText, Calendar } from 'lucide-react';
import "../css/TenantDashboard.css";

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
      icon: <FileText size={20} />,
      component: Reports
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <FileText size={20} />,
      component: Notifications
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: <Calendar size={20} />,
      component: CalendarComponent
    }
  ]
  const ActivePageComponent = menuItems.find(item => item.id === activePage)?.component || Dashboard;

  return (
    <div className="tenant-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">ADMIN</div>
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
          <button className="sidebar-item logout">
            <LogOut size={20} />
            <span>Log out</span>
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
