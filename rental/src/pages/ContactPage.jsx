import React, { useState } from 'react';
import axios from 'axios';
import '../css/ContactForm.css'; // Import custom CSS

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
        setStatus('Please log in.');
        setSuccess(false);
        return null;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: refresh,
      });

      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } catch (error) {
      setStatus('Failed to refresh token. Please log in again.');
      setSuccess(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, message };
    let token = localStorage.getItem('access_token');

    if (!token) {
      token = await refreshToken();
    }

    if (!token) {
      setStatus('Authentication required. Please log in.');
      setSuccess(false);
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/contact/create/', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus('Message Sent Successfully!');
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error:', error.response);
      setStatus(
        error.response && error.response.status === 401
          ? 'Authentication error. Please log in.'
          : 'Failed to send message.'
      );
      setSuccess(false);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your message"
            rows="5"
            className="form-textarea"
          ></textarea>
        </div>
        <button type="submit" className="form-button">
          Send
        </button>
      </form>
      {status && (
        <p className={`form-status ${success ? 'success' : 'error'}`}>{status}</p>
      )}
      <div className="form-footer">
        <h4>Soltech Community</h4>
        <p>Your feedback helps us grow.</p>
      </div>
    </div>
  );
}

export default ContactForm;
