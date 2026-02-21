// src/components/ProjectCard.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';
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

const techVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.2,
    rotate: [0, 10, -10, 10, -10, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const ProjectCard = ({ project, uniqueId, setSelectedProject }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(isTouch);
  }, []);

  const openModal = () => {
    setSelectedProject(project);
    setOverlayVisible(false); // reset overlay after opening modal
  };

  const handleCardClick = () => {
    if (isMobile) {
      if (!overlayVisible) {
        // First tap shows overlay
        setOverlayVisible(true);
      } else {
        // Second tap opens modal
        openModal();
      }
    } else {
      // Desktop: open modal immediately
      openModal();
    }
  };

  const getImagePath = (img) => {
    if (!img) return `${process.env.PUBLIC_URL}/default_image.png`;

    // If it's a webpack import object
    const path = typeof img === 'object' ? img.default || img : img;

    if (typeof path !== 'string') return `${process.env.PUBLIC_URL}/default_image.png`;

    if (path.startsWith('http')) return path;
    if (path.startsWith('data:')) return path;
    if (path.startsWith('/') || path.startsWith('static/')) {
      return path.startsWith('/') ? path : `/${path}`;
    }

    return `${process.env.PUBLIC_URL}/${path}`;
  };

  const imageUrl = getImagePath(project.image);

  return (
    <motion.div
      className="project-card"
      onClick={handleCardClick}
      layoutId={`card-container-${uniqueId}`}
      whileHover={isMobile ? {} : { scale: 1.05 }}
      transition={{ duration: 0.3 }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleCardClick();
      }}
    >
      <motion.img
        src={imageUrl}
        alt={project.title}
        className="project-image"
        layoutId={`card-image-${uniqueId}`}
        loading="lazy"
      />
      <div className={`project-overlay ${overlayVisible ? 'visible' : ''}`}>
        <h3 className="project-title">{project.title}</h3>
        {project.company && <p className="project-company">{project.company}</p>}
        {project.technologies && (
          <div className="project-technologies">
            {project.technologies.slice(0, 6).map((tech, index) => (
              <motion.div
                key={index}
                className="project-tech"
                variants={techVariants}
                initial="initial"
                whileHover="hover"
              >
                {techIcons[tech] || tech}
                <span>{tech}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;