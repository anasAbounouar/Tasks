import React, { useState } from 'react';
import axios from 'axios';

/**
 * AttachmentForm Component
 * Provides a form to upload a new attachment to a task.
 */
const AttachmentForm = ({ taskId }) => {
  const [file, setFile] = useState(null);

  /**
   * Handle file input changes
   * @param {Object} e - Event object
   */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  /**
   * Handle form submission to upload the attachment
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    // Prepare FormData for file upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send POST request to the backend to upload the file
      await axios.post(`/api/tasks/${taskId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Attachment uploaded successfully!');
      setFile(null); // Reset the file input
      window.location.reload(); // Refresh the attachments list
    } catch (err) {
      console.error(`Error uploading attachment to task ID ${taskId}:`, err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="file"
        onChange={handleFileChange}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>Upload Attachment</button>
    </form>
  );
};

// Inline styles for simplicity; consider using CSS Modules or styled-components
const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    marginRight: '10px',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

export default AttachmentForm;
