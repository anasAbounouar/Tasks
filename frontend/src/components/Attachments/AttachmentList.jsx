import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

/**
 * AttachmentList Component
 * Displays a list of task attachments (images, files) and allows image attachments to be viewed in a lightbox.
 */
const AttachmentList = ({ attachments, openLightbox }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to open the lightbox at the specific index
  const openImageInLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.list}>
        {attachments?.map((attachment, index) => (
          <div key={attachment.id} style={styles.item}>
            {/* Check if the attachment is an image and create a thumbnail preview */}
            {/* this will not work due to security reasons  */}
              {/* <img
                src={attachment.filePath}
                alt={attachment.fileName}
                onClick={() => openImageInLightbox(index)}
                style={styles.thumbnail}
            /> */}

              <img
              src={`http://localhost:5000/uploads/${attachment.fileName}`} // URL from the backend
             
                alt={attachment.fileName}
                onClick={() => openImageInLightbox(index)}
                style={styles.thumbnail}
              />
           
            
          </div>
        ))}
      </div>

      {/* Lightbox for Image Attachments */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={closeLightbox}
          slides={attachments.filter((att) => att.type.startsWith('image/')).map((att) => ({ src: att.url, alt: att.name }))}
          currentIndex={currentImageIndex}
          onSlideChange={setCurrentImageIndex}
        />
      )}
    </div>
  );
};

AttachmentList.propTypes = {
  attachments: PropTypes.array.isRequired, // Array of attachment objects
  openLightbox: PropTypes.func, // Function to open the lightbox (for parent component)
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  item: {
    width: '100px',
    height: '100px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  file: {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#555',
  },
};

export default AttachmentList;
