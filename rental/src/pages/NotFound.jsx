import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.notFoundContainer}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.paragraph}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={styles.homeLink}>Go to Home</Link>
    </div>
  );
}

const styles = {
  notFoundContainer: {
    textAlign: 'center',
    marginTop: '50px',
  },
  header: {
    fontSize: '72px',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  homeLink: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFound;