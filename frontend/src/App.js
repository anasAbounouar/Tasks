// frontend/src/App.jsx

import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { RouterProvider } from 'react-router-dom';
import router from './router';

/**
 * App Component
 * Wraps the application with TaskProvider and sets up routing.
 */
const App = () => {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
};

export default App;
