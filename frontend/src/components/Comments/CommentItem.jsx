 
// frontend/src/components/Comments/CommentItem.jsx

import React from 'react';
import axios from 'axios';

/**
 * CommentItem Component
 * Represents a single comment with an option to delete.
 */
const CommentItem = ({ comment ,taskId}) => {
  /**
   * Handle the deletion of a comment
   */
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`/api/tasks/${taskId}/comments/${comment._id}`);
        window.location.reload(); // Refresh the comments list
      } catch (err) {
        console.error(`Error deleting comment with ID ${comment._id}:`, err);
      }
    }
  };

  return (
    <li style={styles.item}>
      <p>{comment.comment}</p>
      <div style={styles.meta}>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
        <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
      </div>
    </li>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  item: {
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9em',
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '3px 6px',
    cursor: 'pointer',
  },
};

export default CommentItem;
