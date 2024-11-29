 
// frontend/src/components/Layout.jsx

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

/**
 * Layout Component
 * Contains the common header, footer, and an Outlet for nested routes.
 */
const Layout = () => {
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <nav>
          <NavLink to="/" style={styles.link}>Home</NavLink>
          <NavLink to="/tasks" style={styles.link}>Tasks</NavLink>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <Outlet /> {/* Render nested routes here */}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Task Management System</p>
      </footer>
    </div>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  header: {
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  link: {
    marginRight: '15px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1em',
  },
  main: {
    padding: '20px',
    minHeight: '80vh', // Ensure the main content takes up enough space
  },
  footer: {
    padding: '10px 20px',
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
  },
};

export default Layout;
