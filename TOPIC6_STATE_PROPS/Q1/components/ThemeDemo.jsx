import React from 'react';

const ThemeDemo = ({ theme }) => {
  return (
    <main className={`content-area ${theme}`}>
      <div className="hero-section">
        <p className="label">LABS AREA</p>
        <h1 className="hero-title">
          PLAY GROUND<br />
          LIGHT AND DARK<br />
          THEME
        </h1>
        
        <div className="hero-footer">
          <p className="description">
            A space dedicated to anticipate how new technologies 
            will affect brands and how we interact with them 
            through R&D.
          </p>
          <div className="scroll-hint">↘ SCROLL DOWN</div>
        </div>
      </div>

      <div className="experiment-grid">
        <div className="exp-card">
          <div className="card-top">
            <span>EXP 001<br />2026</span>
            <span className="arrow">↗</span>
          </div>
          <div className="card-image blue"></div>
        </div>
        <div className="exp-card">
          <div className="card-top">
            <span>EXP 002<br />2026</span>
            <span className="dot-icon">●</span>
          </div>
          <div className="card-image dark-gray"></div>
        </div>
      </div>
    </main>
  );
};

export default ThemeDemo;