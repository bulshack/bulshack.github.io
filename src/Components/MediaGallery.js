// src/components/MediaGallery.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import defaultImage from '../Data/Images/default_image.png'; // Ensure path is correct
import './MediaGallery.css';

const MediaGallery = ({ media }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openMedia = (index) => {
    setSelectedIndex(index);
  };

  const closeMedia = () => {
    setSelectedIndex(null);
  };

  const nextMedia = (e) => {
    e.stopPropagation(); // Prevent closing modal on click
    setSelectedIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevMedia = (e) => {
    e.stopPropagation(); // Prevent closing modal on click
    setSelectedIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const getImagePath = (img) => {
    if (!img) return defaultImage;
    const path = typeof img === 'object' ? img.default || img : img;
    return path;
  };

  return (
    <div className="media-gallery">
      {/* Use the same .gallery-title class as in modal */}
      <h3 className="gallery-title">Media</h3>

      {/* Thumbnails */}
      <div className="media-thumbnails">
        {media.map((src, index) => (
          <div
            key={index}
            className="thumbnail-wrapper"
            onClick={() => openMedia(index)}
          >
            <img
              src={getImagePath(src)}
              alt={`Media ${index + 1}`}
              className="media-thumbnail"
              onError={(e) => { e.target.src = defaultImage; }}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="media-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMedia}
          >
            <motion.div
              className="media-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImagePath(media[selectedIndex])}
                alt={`Media ${selectedIndex + 1}`}
                className="media-fullscreen-image"
                onError={(e) => { e.target.src = defaultImage; }}
              />

              {/* Navigation Buttons */}
              {media.length > 1 && (
                <>
                  <button
                    className="media-nav-button prev"
                    onClick={prevMedia}
                  >
                    &#10094;
                  </button>
                  <button
                    className="media-nav-button next"
                    onClick={nextMedia}
                  >
                    &#10095;
                  </button>
                </>
              )}

              {/* Close Button */}
              <button
                className="media-close-button"
                onClick={closeMedia}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaGallery;
