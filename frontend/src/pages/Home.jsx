 
// frontend/src/pages/Home.jsx

import React from 'react';

/**
 * Home Page
 * Welcomes users to the Task Management System.
 */
const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Task Management System</h1>
      <p>Organize your tasks efficiently and stay on top of your projects.</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px 0',
  },
};

export default Home;
