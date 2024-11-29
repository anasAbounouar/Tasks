 
// frontend/src/components/Comments/CommentList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';

/**
 * CommentList Component
 * Displays a list of comments associated with a specific task.
 */
const CommentList = ({ taskId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments when the component mounts or taskId changes
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/tasks/${taskId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error(`Error fetching comments for task ID ${taskId}:`, err);
      }
    };
    fetchComments();
  }, [taskId]);

    return (
      
        <ul style={styles.list}>
          
      {comments.map(comment => (
        <CommentItem key={comment._id} taskId={taskId} comment={comment} />
      ))}
    </ul>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  list: {
    listStyleType: 'none',
    padding: 0,
  },
};

export default CommentList;
