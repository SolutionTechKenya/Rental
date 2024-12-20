import React, { useState, useEffect } from "react";
import {
  MessageSquareText,
  Clock10,
  ClipboardMinus,
  Mail,
  Plus,
} from "lucide-react";
import { useAuth } from "./AuthProvider";
import api from "../../Api";
import "../../css/admin/Notifications.css";

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]); // Stores notifications
  const [currentSection, setCurrentSection] = useState("messages"); // Tracks the current section
  const [message, setMessage] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [messageComposer, setMessageComposer] = useState(false);

  // Fetch Notifications and Messages from the Backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/api/notifications/");
        console.log("Data: ", response.data);
        setNotifications(response.data.notifications || []);
        setFetchedMessages(response.data.messages || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // Group Notifications by Type
  const groupedNotifications = notifications.reduce(
    (acc, notification) => {
      const type = notification.type || "unknown";
      if (!acc[type]) acc[type] = [];
      acc[type].push(notification);
      return acc;
    },
    { message: [], rent_due: [], report: [], unknown: [] }
  );

  // Handle Sending Messages
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });
      if (response.ok) {
        alert("Message sent successfully!");
        setMessage("");
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  function NotificationsSection() {
    const [notifications] = useState([
      {
        id: 1,
        title: 'Rent Reminder',
        message: 'Rent is due on February 1st',
        date: '2024-01-25'
      },
      {
        id: 2,
        title: 'Maintenance Alert',
        message: 'Scheduled maintenance on February 15th',
        date: '2024-01-20'
      }
    ]);
  
    return (
      <div className="notifications">
        <h2>Notifications</h2>
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <span className="notification-date">{notification.date}</span>
            <span className="notification-title">{notification.title}</span>
            <p className="notification-message">{notification.message}</p>
          </div>
        ))}
      </div>
    );
  }

  // Render Current Section
  const renderSection = () => {
    switch (currentSection) {
      case "messages":
        return (
          <div className="messages-div">
            <div>
              <div className="add">
                <h2>Messages/Complaints</h2>
                <button
                  title="Add a message"
                  onClick={() => setMessageComposer((prev) => !prev)}
                >
                  <Plus />
                </button>
              </div>
              {groupedNotifications.message.length > 0 ? (
                groupedNotifications.message.map((n) => (
                  <NotificationCard key={n.id} notification={n} />
                ))
              ) : (
                <p>No messages/complaints.</p>
              )}
              <NotificationsSection />
            </div>
            {messageComposer && (
              <div>
                <h2>Send Message</h2>
                <form onSubmit={handleSendMessage}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    required
                  ></textarea>
                  <select required>
                    <option value="">Select Recipient Type</option>
                    <option value="all_tenants">All Tenants</option>
                    <option value="specific_building">Specific Building</option>
                    <option value="specific_tenants">Specific Tenants</option>
                    <option value="admin">{`${!user.isAdmin ? "Admin" : "User"}`}</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter recipient IDs (comma separated)"
                  />
                  <input
                    type="text"
                    placeholder="Enter building ID (if applicable)"
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            )}
          </div>
        );
      case "sendMessage":
        return (
          <div>
            {fetchedMessages.length > 0 ? (
              <div>
                <h2>Fetched Messages</h2>
                {fetchedMessages.map((message) => (
                  <NotificationCard key={message.id} notification={message} />
                ))}
              </div>
            ) : (
              <p>No messages available.</p>
            )}
            <h2>Send Message</h2>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
                required
              ></textarea>
              <select required>
                <option value="">Select Recipient Type</option>
                <option value="all_tenants">All Tenants</option>
                <option value="specific_building">Specific Building</option>
                <option value="specific_tenants">Specific Tenants</option>
                <option value="admin">{`${!user.isAdmin ? "Admin" : "User"}`}</option>
              </select>
              <input
                type="text"
                placeholder="Enter recipient IDs (comma separated)"
              />
              <input
                type="text"
                placeholder="Enter building ID (if applicable)"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        );
      case "rentDues":
        return (
          <div>
            <h2>Rent Dues</h2>
            {groupedNotifications.rent_due.length > 0 ? (
              groupedNotifications.rent_due.map((n) => (
                <NotificationCard key={n.id} notification={n} />
              ))
            ) : (
              <p>No rent dues.</p>
            )}
          </div>
        );
      case "reports":
        return (
          <div>
            <h2>Reports</h2>
            {groupedNotifications.report.length > 0 ? (
              groupedNotifications.report.map((n) => (
                <NotificationCard key={n.id} notification={n} />
              ))
            ) : (
              <p>No reports available.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notifications-page" style={{ width: "90%" }}>
      <main className="notification-content">{renderSection()}</main>
      <aside className="notification-navigator">
        <button
          onClick={() => setCurrentSection("messages")}
          className={currentSection === "messages" ? "active" : ""}
        >
          <MessageSquareText />
        </button>
        <button
          onClick={() => setCurrentSection("rentDues")}
          className={currentSection === "rentDues" ? "active" : ""}
        >
          <Clock10 />
        </button>
        <button
          onClick={() => setCurrentSection("reports")}
          className={currentSection === "reports" ? "active" : ""}
        >
          <ClipboardMinus />
        </button>
        <button
          onClick={() => setCurrentSection("sendMessage")}
          className={currentSection === "sendMessage" ? "active" : ""}
        >
          <Mail />
        </button>
      </aside>
    </div>
  );
};

// Notification Card Component
const NotificationCard = ({ notification }) => (
  <div className="notification-card">
    <h3>{notification.content}</h3>
    <p>
      <strong>Recipient Type:</strong> {notification.recipient_type}
    </p>
    {notification.recipients && (
      <p>
        <strong>Recipients:</strong> {notification.recipients.join(", ")}
      </p>
    )}
    {notification.building && (
      <p>
        <strong>Building:</strong> {notification.building}
      </p>
    )}
    <p>
      <strong>Sent By:</strong> {notification.user?.username || "Unknown"}
    </p>
    <p>
      <strong>Timestamp:</strong>{" "}
      {new Date(notification.timestamp).toLocaleString()}
    </p>
  </div>
);

export default NotificationsPage;
