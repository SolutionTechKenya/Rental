import React, { useState } from 'react';
import { Home, CreditCard, Bell, User, LogOut } from 'lucide-react';

// Import components from separate files
import Dashboard from '../Components/Dashboard';
import Payments from '../Components/Payments';
import Notifications from '../Components/Notifications';
import Calendar from '../Components/Calendar';

import '../css/TenantDashboard.css';

// Main TenantDashboard Component
const TenantDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  // Sidebar menu items with icons
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <Home size={20} />,
      component: Dashboard 
    },
    { 
      id: 'payments', 
      label: 'Payments', 
      icon: <CreditCard size={20} />,
      component: Payments 
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: <Bell size={20} />,
      component: Notifications 
    },
    { 
      id: 'account', 
      label: 'Account', 
      icon: <User size={20} />,
      component: Calendar 
    }
  ];

  // Render the active page component
  const ActivePageComponent = menuItems.find(item => item.id === activePage)?.component || Dashboard;

  return (
    <div className="tenant-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">NYUMBANI</div>
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

export default TenantDashboard;