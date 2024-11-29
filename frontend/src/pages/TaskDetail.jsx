import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentList from '../components/Comments/CommentList';
import CommentForm from '../components/Comments/CommentForm';
import AttachmentList from '../components/Attachments/AttachmentList';
import AttachmentForm from '../components/Attachments/AttachmentForm';
import { useTasks } from '../context/TaskContext';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

/**
 * TaskDetail Page
 * Displays detailed information about a specific task, along with its comments and attachments.
 */
const TaskDetail = () => {
  const { taskId } = useParams(); // Use meaningful parameter name
  const navigate = useNavigate();
  const { updateTask, deleteTask } = useTasks();

  // Local state for task details
  const [task, setTask] = useState(null);
  
  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    dueDate: '',
  });

  // Local state for categories
  const [categories, setCategories] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch the task details on component mount
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${taskId}`);
        setTask(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          category: res.data.Category ? res.data.Category.name : '',
          priority: res.data.priority,
          dueDate: res.data.dueDate ? res.data.dueDate.split('T')[0] : '',
        });
      } catch (err) {
        console.error(`Error fetching task with ID ${taskId}:`, err);
      }
    };
    fetchTask();
      fetchCategories();
      fetchAttachments();
  }, [taskId]);
    const [attachments, setAttachments] = useState(null);
  /**
   * Fetch all categories for the category dropdown
   */
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };
    //   fetch all attachments 
    const fetchAttachments = async () => {
        try {
          const res = await axios.get(`/api/tasks/${taskId}/attachments`);
          setAttachments(res.data); // Set the attachments for this task
        } catch (err) {
          console.error('Error fetching attachments:', err);
        }
      };
  /**
   * Handle changes in the edit form inputs
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission to update the task
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Update the task
    await updateTask(taskId, formData);

    // Refresh the task details
    const res = await axios.get(`/api/tasks/${taskId}`);
    setTask(res.data);

    // Exit editing mode
    setIsEditing(false);
  };

  /**
   * Handle the deletion of the task
   */
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
      navigate('/tasks'); // Redirect to the tasks list after deletion
    }
  };

  // Open Lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  // Close Lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!task) return <div>Loading task details...</div>;

  return (
    <div style={styles.container}>
      {/* Task Details or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title Input */}
          <div style={styles.formGroup}>
            <label>Title<span style={styles.required}>*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              value={formData.description}
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
              value={formData.category}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Uncategorized</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown */}
          <div style={styles.formGroup}>
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
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
              value={formData.dueDate}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>Save</button>
            <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          {/* Display Task Details */}
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p><strong>Category:</strong> {task.Category ? task.Category.name : 'Uncategorized'}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>

          {/* Action Buttons */}
          <div style={styles.buttonGroup}>
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>Edit Task</button>
            <button onClick={handleDelete} style={styles.deleteButton}>Delete Task</button>
          </div>
        </div>
      )}

      <hr />

      {/* Comments Section */}
      <div>
        <h3>Comments</h3>
        <CommentForm taskId={taskId} />
        <CommentList taskId={taskId} />
      </div>

      <hr />

      {/* Attachments Section */}
      <div>
        <h3>Attachments</h3>
        <AttachmentForm taskId={taskId} />
        <AttachmentList attachments={attachments} taskId={taskId} openLightbox={openLightbox} />
      </div>

      {/* Back to Tasks Link */}
      <Link to="/tasks" style={styles.backLink}>← Back to Tasks</Link>

      {/* Lightbox for Images */}
      <Lightbox
        open={isLightboxOpen}
        close={closeLightbox}
        slides={task.attachments?.map(att => ({ src: att.url, alt: att.name }))}
        currentIndex={currentImageIndex}
        onSlideChange={setCurrentImageIndex}
      />
    </div>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
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
    minHeight: '100px',
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  backLink: {
    textDecoration: 'none',
    color: '#3f51b5',
    marginTop: '20px',
    display: 'block',
  },
};

export default TaskDetail;
