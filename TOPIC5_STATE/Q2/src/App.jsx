import React, { useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import './App.css';

function App() {
  const [bgColor, setBgColor] = useState('#AF52DE'); // Initial Violet
  const [opacity, setOpacity] = useState(100);

  return (
    <div 
      className="app-viewport" 
      style={{ backgroundColor: bgColor }}
    >
      <div className="overlay-darkener" style={{ opacity: 1 - (opacity / 100) }}></div>
      
      <ColorPicker 
        currentColor={bgColor} 
        onColorSelect={setBgColor}
        opacity={opacity}
        setOpacity={setOpacity}
      />

      <div className="bottom-toolbar">
        <div className="tool-icons">
          <div className="color-indicator" style={{ backgroundColor: bgColor }}></div>
          <div className="dot-group">
             <span className="dot" style={{backgroundColor: '#FF3B30'}}></span>
             <span className="dot" style={{backgroundColor: '#FF9500'}}></span>
             <span className="dot" style={{backgroundColor: '#FFCC00'}}></span>
             <span className="dot" style={{backgroundColor: '#4CD964'}}></span>
             <span className="dot">...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;