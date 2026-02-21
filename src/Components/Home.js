import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { SiBlender, SiAdobephotoshop } from "react-icons/si";
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

import { categories } from '../Data/ProjectsData';
import ProjectCard from './ProjectCard';
import Footer from './Footer';
import ProjectModal from './Modal';

import './Home.css';
import { GitHub } from '@mui/icons-material';

/* Flicker Animation for Neon Button */
const buttonFlicker = keyframes`
  0% { filter: brightness(1); }
  50% { filter: brightness(2); }
  100% { filter: brightness(1); }
`;

/* NeonButton */
const NeonButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#1DB954',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '1px',
  padding: theme.spacing(1, 2),
  fontSize: '0.85rem',
  borderRadius: '6px',
  position: 'relative',
  boxShadow: '0 0 6px rgba(0,255,127,0.3)',
  transition: 'all 0.2s ease-out',
  '&:hover': {
    backgroundColor: '#32FF7E',
    boxShadow: '0 0 12px rgba(0,255,127,0.6)',
    transform: 'scale(1.03)',
    animation: `${buttonFlicker} 0.3s linear`,
  },
  '&:active': {
    transform: 'scale(0.98)',
    boxShadow: '0 0 8px rgba(0,255,127,0.4)',
  },
}));

/**
 * UPDATED FUNCTION:
 * This version looks for a 'featured' flag in your projects.
 * In your ProjectsData, mark any project with `featured: true`.
 */
function getFeaturedProjects() {
  return categories
    .flatMap((cat) => cat.projects)
    .filter((project) => project.featured)
    .slice(0, 3);
}

/* Convert multiline text to <br/> splits */
function formatTypedTextWithBreaks(text) {
  return text.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      {idx < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
}

/* Technology icons for skills grid */
const techIcons = {
  Unity: <SiUnity />,
  'C#': <SiCsharp />,
  'C++': <SiCplusplus />,
  VS: <SiVisualstudio />,
  Rider: <SiRider />,
  Github: <SiGithub />,
  Jira: <SiJira />,
  Confluence: <SiConfluence />,
  Figma: <SiFigma />,
  Godot: <SiGodotengine />,
  JavaScript: <FaJsSquare />,
  React: <FaReact />,
  CSS: <FaCss3Alt />,
};

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [init, setInit] = useState(false);

  // For particles fade
  const [particlesVisible, setParticlesVisible] = useState(false);

  // Typewriter
  const [typedText, setTypedText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  const fullText = "HELLO!\nI AM\nDANIEL LOPEZ";

  // Load featured projects on mount
  useEffect(() => {
    setFeaturedProjects(getFeaturedProjects());
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (typedIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + fullText[typedIndex]);
        setTypedIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [typedIndex, fullText]);

  const typedDone = typedIndex >= fullText.length;

  // Fade in particles 1.2s after typing finishes
  useEffect(() => {
    if (typedDone) {
      const fadeTimer = setTimeout(() => {
        setParticlesVisible(true);
      }, 1200);
      return () => clearTimeout(fadeTimer);
    }
  }, [typedDone]);

  // Initialize tsparticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      setInit(true);
    });
  }, []);

  // Mobile check
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Particle config
  const particlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: !isMobile, mode: "grab" },
          onClick: { enable: !isMobile, mode: "repulse" },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            links: { opacity: 0.3 },
          },
          repulse: { distance: 100 },
        },
      },
      particles: {
        number: {
          value: isMobile ? 20 : 50,
          density: { enable: true, area: 800 },
        },
        color: { value: "#00ff99" },
        shape: {
          type: isMobile
            ? "circle"
            : ["circle", "square", "triangle", "polygon", "star"],
        },
        opacity: { value: 0.5 },
        size: {
          value: { min: 3, max: 8 },
          random: true,
        },
        links: {
          enable: !isMobile,
          distance: 150,
          color: "#00ff99",
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.5 : 1,
          direction: "none",
          outModes: { default: "bounce" },
        },
      },
      detectRetina: true,
    }),
    [isMobile]
  );

  // Modal handlers
  const handleOpenModal = (project, uniqueId) => {
    setSelectedProject(project);
    setIsModalOpen(uniqueId);
  };
  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(null);
  };

  return (
    <Box className="home-page" component="main">
      {/* HERO SECTION */}
      <section className="hero-section">
        {/* Particles Background */}
        <div className={`particles-container ${particlesVisible ? "show" : ""}`}>
          <Particles init={setInit} options={particlesOptions} />
        </div>

        <Container maxWidth="lg" className="hero-content">
          {/* Typewriter Title */}
          <Typography variant="h1" className="hero-title" gutterBottom>
            {typedDone ? (
              <>
                HELLO!
                <br />
                I AM
                <br />
                <span className="accent-text">DANIEL LOPEZ</span>
                <span className="console-cursor" />
              </>
            ) : (
              <>
                {formatTypedTextWithBreaks(typedText)}
                <span className="console-cursor" />
              </>
            )}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            className={`hero-subtitle ${typedDone ? "show" : ""}`}
          >
            Game Developer <span className="accent-text">∙</span> Designer{" "}
            <span className="accent-text">∙</span> VR Innovator
          </Typography>

          {/* Quote */}
          <Typography
            variant="subtitle2"
            className={`hero-quote ${typedDone ? "show" : ""}`}
          >
            <span className="accent-text">“</span> Dreaming Big, Building Bigger:
            Crafting Worlds That Players Love{" "}
            <span className="accent-text">”</span>
          </Typography>
        </Container>
      </section>

      {/* FEATURED PROJECTS */}
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" className="category-title" gutterBottom>
          Featured Projects
        </Typography>
        <Grid container spacing={4}>
          {featuredProjects.map((project) => {
            const uniqueId = `home-feature-${project.id}`;
            return (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard
                  project={project}
                  uniqueId={uniqueId}
                  setSelectedProject={() => handleOpenModal(project, uniqueId)}
                />
              </Grid>
            );
          })}
        </Grid>

        <NeonButton variant="contained" href="#/portfolio" sx={{ mt: 3 }}>
          View All Projects
        </NeonButton>
      </Container>

      {/* ABOUT SECTION (Preview) */}
      <Container sx={{ mt: 10, mb: 10 }} className="about-section">
        <Typography variant="h4" className="category-title" gutterBottom>
          About Me
        </Typography>
        {/* A short teaser about yourself */}
        <Typography variant="h5" className="about-text" sx={{ mb: 2 }}>
          I’m Daniel Lopez, a <strong>Software Engineer</strong>, <strong>Game Developer</strong>,
          and <strong>Game Designer</strong> originally from <strong>Venezuela</strong>.
          With a passion for video games, eSports, and emerging technologies,
          I’ve gone from hosting game servers at age eight to <strong>working alongside
            top talent</strong> on cutting-edge VR/AR and video game experiences.
          <br /><br />
        </Typography>

        {/* Button leading to the full About page */}
        <NeonButton variant="contained" href="#/about">
          Read More About Me
        </NeonButton>
      </Container>

      {/* SKILLS SECTION */}
      <Container sx={{ mt: 10, mb: 10 }} className="skills-section">
        <Typography variant="h4" className="category-title" gutterBottom>
          Skills
        </Typography>
        <Grid container spacing={0} className="skills-grid">
          {Object.entries(techIcons).map(([name, icon]) => (
            <Grid item xs={12} md={2} className="skill-box" key={name}>
              <div className="skill-icon">{icon}</div>
              <div className="skill-name">{name}</div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FOOTER */}
      <Footer />

      {/* MODAL (only if a project is selected) */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          uniqueId={isModalOpen}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </Box>
  );
};

export default Home;
