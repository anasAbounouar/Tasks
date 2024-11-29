import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * TaskForm Component
 * Provides a form to create a new task and optionally add a new category.
 */
const TaskForm = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    dueDate: '',
  });

  // Local state for categories
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(''); // State for new category input
  const [error, setError] = useState('');

  const { title, description, category, priority, dueDate } = formData;

  useEffect(() => {
    // Fetch categories to populate the category dropdown
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  /**
   * Handle changes in form inputs
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle new category input changes
   * @param {Object} e - Event object
   */
  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  /**
   * Handle form submission to create a new task
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Add the new task
    await addTask(formData);

    // Redirect to the tasks list
    navigate('/tasks');
  };

  /**
   * Handle adding a new category
   * @param {Object} e - Event object
   */
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    try {
      // Add the new category via API
      await axios.post('/api/categories', { name: newCategory });
      setCategories([...categories, { name: newCategory }]); // Add new category to dropdown
      setNewCategory(''); // Clear input field
      setError('');
    } catch (err) {
      console.error('Error adding category:', err);
      setError('Error adding category');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create New Task</h2>
      {error && <div style={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Title Input */}
        <div style={styles.formGroup}>
          <label>Title<span style={styles.required}>*</span></label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Description Input */}
        <div style={styles.formGroup}>
          <label>Description<span style={styles.required}>*</span></label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div style={styles.formGroup}>
          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Uncategorized</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Add New Category */}
        <div style={styles.formGroup}>
          <label>Or Add New Category</label>
          <input
            type="text"
            value={newCategory}
            onChange={handleNewCategoryChange}
            style={styles.input}
            placeholder="Enter category name"
          />
          <button type="button" onClick={handleAddCategory} style={styles.addCategoryButton}>Add Category</button>
        </div>

        {/* Priority Dropdown */}
        <div style={styles.formGroup}>
          <label>Priority</label>
          <select
            name="priority"
            value={priority}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Due Date Input */}
        <div style={styles.formGroup}>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>Create Task</button>
      </form>
    </div>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  required: {
    color: 'red',
    marginLeft: '5px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
    resize: 'vertical',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addCategoryButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '14px',
  },
};

export default TaskForm;
