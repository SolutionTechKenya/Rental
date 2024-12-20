import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import "../css/Account.css";

function Account() {
  const [activeSection, setActiveSection] = useState('calendar');

  return (
    
      <><CalendarSection /></>
  );
}


function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Rent Due',
      date: '2024-02-01',
      type: 'payment'
    },
    {
      id: 2,
      title: 'Maintenance Inspection',
      date: '2024-02-15',
      type: 'maintenance'
    }
  ]);

  const [tenantInfo, setTenantInfo] = useState({
    name: 'John Doe',
    apartmentNumber: '305',
    moveInDate: '2023-06-15',
    rentAmount: 1500,
    rentDueDate: '1st of each month',
    leaseEndDate: '2024-06-15'
  });

  // Calculate tenant's stay duration
  const calculateStayDuration = () => {
    const moveIn = new Date(tenantInfo.moveInDate);
    const today = new Date();
    const diffTime = Math.abs(today - moveIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    return `${years} years, ${months} months, ${days} days`;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth() + 1, 
      0
    ).getDate();
    
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(), 
      currentDate.getMonth(), 
      1
    ).getDay();

    const calendarDays = [];

    // Add empty days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === fullDate);
      calendarDays.push({
        day,
        events: dayEvents
      });
    }

    return calendarDays;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarDays = generateCalendarDays();

  return (
      <div className="rental-calendar">
        <div className="tenant-info">
          <h2>Tenant Information</h2>
          <div className="tenant-details">
            <p><strong>Name:</strong> {tenantInfo.name}</p>
            <p><strong>Apartment:</strong> {tenantInfo.apartmentNumber}</p>
            <p><strong>Move-in Date:</strong> {tenantInfo.moveInDate}</p>
            <p><strong>Lease End Date:</strong> {tenantInfo.leaseEndDate}</p>
            <p><strong>Stay Duration:</strong> {calculateStayDuration()}</p>
            <p><strong>Monthly Rent:</strong> ${tenantInfo.rentAmount}</p>
            <p><strong>Rent Due:</strong> {tenantInfo.rentDueDate}</p>
          </div>
        </div>

        <div className="calendar-container">
        <div className="calendar-header">
          <button 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
          >
            <ChevronLeft />
          </button>
          <h2>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
          >
            <ChevronRight />
          </button>
        </div>

        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}

          {calendarDays.map((dayItem, index) => {
            const isToday = dayItem && new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), dayItem.day).toDateString();
            return (
              <div 
                key={index} 
                className={`calendar-day ${dayItem ? 'active' : 'inactive'} ${isToday ? 'today' : ''}`}>
                {dayItem && (
                  <>
                    <span className="day-number">{dayItem.day}</span>
                    {dayItem.events.map(event => (
                      <div 
                        key={event.id} 
                        className={`event ${event.type}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
  
        <div className="events-list">
          <h2>Upcoming Events</h2>
          {events.map(event => (
            <div key={event.id} className={"event-item `${event.type}`"}>
              <span className="event-date">{event.date}</span>
              <span className="event-title">{event.title}</span>
            </div>
          ))}
        </div>
        
      </div>
  );
}

export default Account;

