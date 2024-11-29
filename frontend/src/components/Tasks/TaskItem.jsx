// frontend/src/components/Tasks/TaskItem.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';

/**
 * TaskItem Component
 * Represents a single task in the task list with options to view or delete.
 */
const TaskItem = ({ task }) => {
  const { deleteTask } = useTasks();

  /**
   * Handle the deletion of a task
   */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <li style={styles.item}>
      {/* Task Details */}
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p><strong>Category:</strong> {task.Category ? task.Category.name : 'Uncategorized'}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
      </div>

      {/* Action Buttons */}
      <div>
        <Link to={`/tasks/${task.id}`} style={styles.viewButton}>View</Link>
        <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
      </div>
    </li>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  item: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  viewButton: {
    marginRight: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default TaskItem;
