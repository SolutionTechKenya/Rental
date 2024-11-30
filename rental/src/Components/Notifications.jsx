import React, { useState } from 'react';
import '../css/Notifications.css';

function Notifications() {
  const [activeSection, setActiveSection] = useState('reports');

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'history':
        return <ReportHistorySection />;
      case 'account':
        return <AccountSection />;
      default:
        return <ReportSection />;
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">Rental Management</div>
        <div className="nav-buttons">
          <button 
            onClick={() => setActiveSection('dashboard')}
            className={activeSection === 'dashboard' ? 'active' : ''}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveSection('history')}
            className={activeSection === 'history' ? 'active' : ''}
          >
            Report History
          </button>
          <button 
            onClick={() => setActiveSection('account')}
            className={activeSection === 'account' ? 'active' : ''}
          >
            Account
          </button>
        </div>
      </nav>

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
}

function ReportSection() {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.title || !formData.description) {
      alert('Please fill out all fields');
      return;
    }

    const newReport = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    };

    setReports([newReport, ...reports]);
    
    // Reset form
    setFormData({
      type: '',
      title: '',
      description: ''
    });
  };

  return (
    <div className="report-section">
      <div className="report-form">
        <h2>Submit a Maintenance Request</h2>
        <form onSubmit={handleSubmit}>
          <select 
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            required
          >
            <option value="">Select Report Type</option>
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
            <option value="complaint">Complaint</option>
          </select>

          <input 
            type="text"
            placeholder="Report Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />

          <textarea 
            placeholder="Describe your issue in detail"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          ></textarea>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

function ReportHistorySection() {
  // Simulated report history
  const [reports] = useState([
    {
      id: 1,
      type: 'maintenance',
      title: 'Leaking Faucet',
      description: 'Kitchen sink faucet is leaking constantly',
      date: '2023-11-15',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'repair',
      title: 'Broken Door Lock',
      description: 'Entrance door lock is not working properly',
      date: '2023-11-10',
      status: 'In Progress'
    }
  ]);

  return (
    <div className="report-history">
      <h2>Report History</h2>
      {reports.map(report => (
        <>

        <div key={report.id} className="report-item">
          <div className="report-header">
            <span className="report-type">{report.type}</span>
            <span className="report-date">{report.date}</span>
            <span className='report-status' ${...report.status.toLowerCase().replace(' ', '-')}>{report.status}</span>
          </div>
          <h3>{report.title}</h3>
          <p>{report.description}</p>
        </div>
        </>
      ))}
    </div>
  );
}

function DashboardSection() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>2</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
}

function AccountSection() {
  return (
    <div className="account">
      <h2>Account Details</h2>
      <div className="account-info">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Apartment:</strong> Unit 305</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Phone:</strong> (555) 123-4567</p>
      </div>
    </div>
  );
}

export default Notifications;