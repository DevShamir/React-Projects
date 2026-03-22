import React from 'react';

const ColorPicker = ({ currentColor, onColorSelect, opacity, setOpacity }) => {
  const colors = [
    '#FFFFFF', '#E4E4E4', '#888888', '#222222', '#000000',
    '#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA',
    '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E'
  ];

  return (
    <div className="picker-card">
      <div className="picker-header">
        <span className="close-icon">×</span>
        <h3>Colors</h3>
      </div>

      <div className="tab-container">
        <button className="tab active">Grid</button>
        <button className="tab">Spectrum</button>
        <button className="tab">Sliders</button>
      </div>

      <div className="color-grid">
        {/* Generating a simulated large grid */}
        {Array.from({ length: 60 }).map((_, i) => {
          const hue = (i * 15) % 360;
          const color = `hsl(${hue}, 70%, 60%)`;
          return (
            <div 
              key={i} 
              className={`grid-item ${currentColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
            />
          );
        })}
      </div>

      <div className="opacity-section">
        <label>OPACITY</label>
        <div className="slider-wrapper">
          <div className="checkerboard-bg">
            <div 
              className="opacity-gradient" 
              style={{ background: `linear-gradient(to right, transparent, ${currentColor})` }}
            ></div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={opacity} 
              onChange={(e) => setOpacity(e.target.value)} 
            />
          </div>
          <span className="opacity-value">{opacity}%</span>
        </div>
      </div>

      <div className="swatch-footer">
        <div className="large-preview" style={{ backgroundColor: currentColor, opacity: opacity / 100 }}></div>
        <div className="mini-swatches">
          {colors.slice(5, 12).map((c, i) => (
            <div 
              key={i} 
              className="mini-dot" 
              style={{ backgroundColor: c }}
              onClick={() => onColorSelect(c)}
            />
          ))}
          <div className="mini-dot add-btn">+</div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;