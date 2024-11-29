 
// frontend/src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound Page
 * Displays a 404 error for undefined routes.
 */
const NotFound = () => {
  return (
    <div style={styles.container}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go Back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px 0',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NotFound;
