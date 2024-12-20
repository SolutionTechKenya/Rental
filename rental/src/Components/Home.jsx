import React, { useState } from "react";
import { Link } from 'react-router-dom'
import "../css/Home.css"; // Import CSS file

const App = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div >
      <header id="header-wrapper">
        <div id="header" className="container">
          <div id="menu">
            <ul>
              <li className="active">
                <a href="#">Homepage</a>
              </li>
              <li>
                <Link to='/tenant'>Tenant Portal</Link>
              </li>
              <li>
                <Link to='/admin'>Owner Services</Link>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li className="dropdown">
                <Link to='/login'>Login</Link>
                {isDropdownVisible && (
                  <div className="dropdown-content">
                    <a href="#">Tenant</a>
                    <a href="#">Landlord</a>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div id="banner" className="container">
          <div className="title">
            <h2>Rental Management System</h2>
            <h2>Your Property Management, Simplified</h2>
            <span className="byline">Efficient, seamless, and secure rental solutions</span>
          </div>
          <ul className="actions">
            <li>
              <a href="#" className="button">
                Browse Properties
              </a>
            </li>
          </ul>
        </div>
      </header>
      
      <main id="wrapper">
        <div id="three-column" className="container">
          <div className="title">
            <h2>Manage Your Properties with Ease</h2>
            <span className="byline">
              From tenant management to payment tracking, we’ve got you covered
            </span>
          </div>
          <div className="boxes">
            <div className="boxA">
              <p>
                Effortlessly manage your rental properties and tenants in one platform.
                Our system allows you to track payments, send reminders, and monitor lease agreements.
              </p>
              <a href="#" className="button button-alt">Learn More</a>
            </div>
            <div className="boxB">
              <p>
                For tenants, our system offers easy access to payment history, maintenance requests,
                and lease details, all through a user-friendly portal.
              </p>
              <a href="#" className="button button-alt">Tenant Portal</a>
            </div>
            <div className="boxC">
              <p>
                Property owners can keep track of multiple properties, view financial summaries,
                and access tenant communication in real-time with our robust system.
              </p>
              <a href="#" className="button button-alt">Owner Services</a>
            </div>
          </div>
        </div>
      </main>
      
      <section id="welcome">
        <div className="container">
          <div className="title">
            <h2>Streamline Your Rental Management Process</h2>
            <span className="byline">Our system helps you manage properties, tenants, and payments, all in one place</span>
          </div>
          <p>
            This is <strong>Rental Management System</strong>, a comprehensive tool designed for property owners and tenants. 
            Our platform provides seamless management of rental agreements, payment tracking, property maintenance requests, and more.
            Whether you're a landlord managing multiple properties or a tenant paying rent, our system ensures that everything runs smoothly.
          </p>
          <ul className="actions">
            <li>
              <a href="#" className="button">
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </section>

      <footer id="copyright" className="container">
        <p>&copy; 2024 Rental Management System. All rights reserved. | Design by TEMPLATED.</p>
      </footer>
    </div>
  );
};

export default App;
