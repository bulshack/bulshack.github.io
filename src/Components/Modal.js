// src/components/Modal.js
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusLock from 'react-focus-lock';
import './Modal.css';
import MediaGallery from './MediaGallery';
import {
  FaReact,
  FaCss3Alt,
  FaJsSquare,
} from 'react-icons/fa';
import {
  SiUnity,
  SiCsharp,
  SiGodotengine,
  SiCplusplus,
  SiFigma,
  SiJira,
  SiConfluence,
  SiRider,
  SiGithub,
  SiVisualstudio,
} from 'react-icons/si';

import defaultImage from '../Data/Images/default_image.png';

const techIcons = {
  React: <FaReact />,
  CSS: <FaCss3Alt />,
  JavaScript: <FaJsSquare />,
  Unity: <SiUnity />,
  'C#': <SiCsharp />,
  'C++': <SiCplusplus />,
  Godot: <SiGodotengine />,
  Figma: <SiFigma />,
  Jira: <SiJira />,
  Confluence: <SiConfluence />,
  Rider: <SiRider />,
  Github: <SiGithub />,
  VS: <SiVisualstudio />,
};

// Simpler variants with eased transitions
const backdropVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
};

const modalVariants = {
  initial: { scale: 0.9, opacity: 0, rotateY: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    rotateY: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const childVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }
};

const Modal = ({ project, uniqueId, isModalOpen, closeModal }) => {
  const hasGallery = project?.media?.length > 0 && project.showGallery !== false;
  const showVisitButton = project?.link && project.showVisitButton !== false;
  const getImagePath = (img) => {
    if (!img) return defaultImage;
    return typeof img === 'object' ? img.default || img : img;
  };

  const imageUrl = getImagePath(project?.image);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isModalOpen === uniqueId && (
        <motion.div
          className="project-modal"
          onClick={closeModal}
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key={`modal-${uniqueId}`}
          aria-modal="true"
          role="dialog"
          aria-labelledby={`modal-title-${uniqueId}`}
        >
          <FocusLock>
            <motion.div
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <button
                className="project-modal-close"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                &times;
              </button>
              <motion.div
                className="modal-details"
                variants={containerVariants}
                initial="initial"
                animate="animate"
              >
                <motion.h2
                  className="modal-title"
                  id={`modal-title-${uniqueId}`}
                  variants={childVariants}
                >
                  {project.title}
                </motion.h2>
                <motion.p className="modal-description" variants={childVariants}>
                  {project.description}
                </motion.p>

                {project.role && (
                  <motion.p className="modal-role" variants={childVariants}>
                    <strong>Role:</strong> {project.role}
                  </motion.p>
                )}

                {project.contributions && (
                  <motion.p className="modal-contributions" variants={childVariants}>
                    <strong>Contributions:</strong> {project.contributions}
                  </motion.p>
                )}

                {project.achievements && (
                  <motion.p className="modal-achievements" variants={childVariants}>
                    <strong>Achievements:</strong> {project.achievements}
                  </motion.p>
                )}

                {project.technologies && (
                  <motion.div className="modal-technologies" variants={childVariants}>
                    <h3>Technologies</h3>
                    <div className="technologies-list">
                      {project.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          className="project-tech"
                          variants={childVariants}
                          whileHover={{ scale: 1.05 }}
                        >
                          {techIcons[tech] || tech}
                          <span>{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {project.tags && (
                  <motion.div className="modal-tags" variants={childVariants}>
                    <h3>Tags</h3>
                    <div className="tags-list">
                      {project.tags.map((tag, index) => (
                        <motion.span key={index} className="project-tag" variants={childVariants}>
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {hasGallery && (
                  <motion.div variants={childVariants}>
                    <MediaGallery media={project.media} title={project.title} />
                  </motion.div>
                )}

                {showVisitButton && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-button"
                    variants={childVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    Visit Project
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </FocusLock>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
