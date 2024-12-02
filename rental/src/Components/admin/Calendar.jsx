import React, { useState } from "react";
import "../../css/admin/Calendar.css";


const Calendar = () => {
  const [events, setEvents] = useState([
    { date: "2024-12-01", title: "Rent Payment Due" },
    { date: "2024-12-10", title: "Tenant Meeting" },
    { date: "2024-12-20", title: "Financial Review" },
  ]);

  return (
    <div>
      <div className="main-content">
        <div className="dashboard-header">Calendar Overview</div>

        <div className="calendar-container">
          <h2>Upcoming Events</h2>
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <span className="event-date">{event.date}</span>
                <span className="event-title">{event.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="add-event-section">
          <h2>Add New Event</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const date = e.target.date.value;
              const title = e.target.title.value;
              setEvents([...events, { date, title }]);
              e.target.reset();
            }}
          >
            <input type="date" name="date" required className="input-field" />
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              required
              className="input-field"
            />
            <button type="submit" className="action-button">
              Add Event
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Calendar;