 
// frontend/src/components/Comments/CommentForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
/**
 * CommentForm Component
 * Provides a form to add a new comment to a task.
 */
const CommentForm = ({ taskId }) => {
  const [comment, setComment] = useState('');

  /**
   * Handle form submission to add a new comment
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!comment.trim()) {
      alert('Comment cannot be empty.');
      return;
    }

    try {
      await axios.post(`/api/tasks/${taskId}/comments`, { comment });
      setComment(''); // Clear the textarea
      window.location.reload(); // Refresh the comments list
    } catch (err) {
      console.error(`Error adding comment to task ID ${taskId}:`, err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        style={styles.textarea}
        required
      />
      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  textarea: {
    resize: 'vertical',
    padding: '10px',
    fontSize: '1em',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  button: {
    alignSelf: 'flex-end',
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default CommentForm;
