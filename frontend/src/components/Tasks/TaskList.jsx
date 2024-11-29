// frontend/src/components/Tasks/TaskList.jsx

import React, { useEffect, useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// Set base URL for axios globally
axios.defaults.baseURL = 'http://localhost:5000';

/**
 * TaskList Component
 * Displays a list of all tasks with options to filter by category and priority.
 */
const TaskList = () => {
  const { tasks, loading, error, fetchTasks } = useTasks();
  const [filter, setFilter] = useState({
    category: '',
    priority: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
    fetchCategories(); // Fetch categories for filtering
  }, []);

  /**
   * Fetch all categories for the filter dropdown
   */
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  /**
   * Handle changes in the filter inputs
   * @param {Object} e - Event object
   */
  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  /**
   * Filter tasks based on selected category and priority
   */
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = filter.category ? task.Category.name === filter.category : true;
    const matchesPriority = filter.priority ? task.priority === filter.priority : true;
    return matchesCategory && matchesPriority;
  });

  if (loading) return <div>Loading tasks...</div>;
//   if (error) return <div>Error fetching tasks: {error}</div>;

  return (
    <div>
      <h2>Your Tasks</h2>
      <NavLink to="/tasks/new" style={styles.addButton}>Add New Task</NavLink>

      {/* Filter Section */}
      <div style={styles.filterContainer}>
        <select name="category" value={filter.category} onChange={handleFilterChange} style={styles.select}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        <select name="priority" value={filter.priority} onChange={handleFilterChange} style={styles.select}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Task List */}
      <ul style={styles.list}>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  addButton: {
    display: 'inline-block',
    marginBottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  filterContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
};

export default TaskList;
