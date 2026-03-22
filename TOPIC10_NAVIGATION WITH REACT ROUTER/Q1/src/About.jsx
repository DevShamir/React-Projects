import React from 'react';

const About = () => {
  return (
    <div className="page-animate about-page">
      <h2 className="section-title">About EDUDASH</h2>
      <div className="action-banner" style={{ display: 'block' }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-dark)' }}>
          EDUDASH is a modern, responsive Student Management System built with React. 
          It allows educators to seamlessly track student enrollment, manage academic records, 
          and calculate total scores instantly.
        </p>
        <p style={{ marginTop: '20px', color: 'var(--text-light)' }}>
          Version 1.0.0 &copy; 2026 EDUDASH Inc.
        </p>
      </div>
    </div>
  );
};

export default About;