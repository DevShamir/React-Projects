import React, { useState, useEffect } from 'react';
import ThemeDemo from '../components/ThemeDemo';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`app-root ${theme}`}>
      {/* Custom Cursor */}
      <div 
        className="custom-cursor" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      
      <nav className="navbar">
        <div className="logo">LAB 06</div>
        <div className="nav-links">
          <span>ABOUT</span>
          <span>CONTACT</span>
          <button className="theme-pill" onClick={toggleTheme}>
            <span className={theme === 'light' ? 'active' : ''}>LIGHT</span>
            <span className={theme === 'dark' ? 'active' : ''}>DARK</span>
          </button>
        </div>
      </nav>

      <ThemeDemo theme={theme} />
    </div>
  );
}

export default App;