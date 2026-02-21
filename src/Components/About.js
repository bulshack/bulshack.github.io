// --------------------------------------------------------
// src/pages/About.js
// --------------------------------------------------------
import React from 'react';
import './About.css'; // Make sure to import the CSS

import { styled } from '@mui/system';
import { Button } from '@mui/material';
import profile from '../Data/Images/profile.jpg';

const AccentButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--color-accent)',
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '1px',
  fontSize: '0.85rem',
  borderRadius: '6px',
  boxShadow: '0 0 6px rgba(0,255,127,0.3)',
  transition: 'all 0.2s ease-out',
  '&:hover': {
    backgroundColor: '#32ff7e',
    boxShadow: '0 0 12px rgba(0,255,127,0.6)',
    transform: 'scale(1.03)',
  },
  '&:active': {
    transform: 'scale(0.98)',
    boxShadow: '0 0 8px rgba(0,255,127,0.4)',
  },
}));

const About = () => {
  return (
    <div className="about-page">
      {/* Main Title */}
      <h2 className="about-title">About Me</h2>

      {/* Profile Section (Photo + Bio) */}
      <div className="profile-section">
        <div className="profile-image">
          <img
            src={profile}
            alt="Profile"
          />
        </div>
        <div className="profile-text">
          <p>
            I’m an enthusiastic <strong>Software Engineer</strong>, <strong>Game Developer</strong>, and <strong>Game Designer</strong> originally from <strong>Venezuela</strong>, with a
            lifelong passion for video games, eSports, and emerging technologies. My love for programming
            began at age eight, when I hosted game servers on a sluggish connection and experimented with
            Visual Basic and MySQL to build my first applications.
          </p>

          <p>
            I began my formal studies in Computer Science at <strong>UCF</strong>, but soon realized my true
            passion lay in game development. That calling led me to <strong>Full Sail University</strong>,
            where I earned a <strong>Bachelor’s in Game Development</strong> and later a <strong>Master’s in Game Design</strong>,
            culminating in a thesis on <strong>Video Games and Cognitive Enhancements</strong>.

            During my master's studies, I joined the <strong>Full Sail VR Lab</strong> under the guidance of <strong>Daniel Mapes</strong>,
            a VR/AR prototyping expert and Course Director of Simulation Environments. There, I developed prototypes
            for <strong>Advent Health</strong> and <strong>Decision Tactical</strong>, as well as
            in-house AR/VR learning applications for Full Sail students. Our team also competed in <strong>Iron Dev 2020</strong>,
            a “cook-off” style challenge where we created a VR solution to help
            hospitals communicate during the COVID-19 pandemic, winning the “Most Innovative Solution” award.
          </p>

          <p>
            After completing my master’s, I joined <strong>302 Interactive</strong>, collaborating on game
            projects with partners like <strong>Third Time Games</strong>, <strong>Draw & Code</strong>,
            <strong>Verse</strong>, and others. In-house at 302, I contributed to projects like <strong>Rogue Rally</strong>,
            a rogue-lite kart racer set in a solarpunk-inspired world, and <strong>302 Slices</strong>, where our
            indie-dev team built a new bite-sized prototype every month. Whether I am designing
            prototypes to tackle real-world challenges or coding immersive worlds that sparked wonder,
            I am fueled by that “Aha!” moment when ideas transformed into interactive realities.
            I am always seeking fresh collaborations and opportunities to push the boundaries of
            gaming and immersive tech.
          </p>
        </div>
      </div>

      {/* Subheading for Timeline */}
      <h3 className="about-subheading">My Journey</h3>

      {/* Timeline / Experience Section (No specific year ranges) */}
      <div className="timeline">
        <div className="timeline-item">
          <h4>302 Interactive</h4>
          <p>
            Working on cutting-edge Mixed Reality projects and in-house games like
            <em> Rogue Rally</em> and <em>302 Slices</em>. Exploring the boundaries of VR,
            AR, and more.
          </p>
        </div>

        <div className="timeline-item">
          <h4>Full Sail VR Lab</h4>
          <p>
            Built prototypes for Advent Health and Decision Tactical, and
            worked on immersive learning apps for Full Sail students.
            Competed in Iron Dev 2020, winning “Most Innovative Solution.”
          </p>
        </div>

        <div className="timeline-item">
          <h4>Early Indie Adventures</h4>
          <p>
            Hosted personal game servers, created small-scale indie
            prototypes, and honed my skills in game design and software
            development from a young age.
          </p>
        </div>
      </div>

      {/* Optional CTA (Contact or Resume) */}
      <div className="about-cta">
        <AccentButton
          variant="contained"
          onClick={() => window.location.href = '#/contact'}
        >
          Contact Me
        </AccentButton>
      </div>
    </div>
  );
};

export default About;
