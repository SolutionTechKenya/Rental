import React, { useState, useEffect } from "react";
import { MessageSquareText, Clock10, ClipboardMinus, MailPlus } from "lucide-react";
import "../../css/admin/Notifications.css"; // Custom CSS file

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentSection, setCurrentSection] = useState("messages"); // Tracks the current section
  const [message, setMessage] = useState("");

  // Fetch Notifications from the Backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications/");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // Group Notifications by Type
  const groupedNotifications = notifications.reduce(
    (acc, notification) => {
      acc[notification.type].push(notification);
      return acc;
    },
    { message: [], rent_due: [], report: [] }
  );

  // Send Message
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

  // Render Current Section
  const renderSection = () => {
    switch (currentSection) {
      case "messages":
        return (
          <div>
            <h2>Messages/Complaints</h2>
            {groupedNotifications.message.length > 0 ? (
              groupedNotifications.message.map((n) => (
                <NotificationCard key={n.id} notification={n} />
              ))
            ) : (
              <p>No messages/complaints.</p>
            )}
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
      case "sendMessage":
        return (
          <div>
            <h2>Send Message</h2>
            <form onSubmit={handleSendMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows="4"
                style={{ width: "100%" }}
              />
              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notifications-page">
    {/* Main Content */}
    <main className="notification-content">{renderSection()}</main>
      {/* Sidebar Navigation */}
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
          <MailPlus />
        </button>
      </aside>
    </div>
  );
};

// Notification Card Component
const NotificationCard = ({ notification }) => (
  <div className="notification-card">
    <h3>{notification.title}</h3>
    <p>{notification.content}</p>
    <small>{new Date(notification.timestamp).toLocaleString()}</small>
  </div>
);

export default NotificationsPage;
