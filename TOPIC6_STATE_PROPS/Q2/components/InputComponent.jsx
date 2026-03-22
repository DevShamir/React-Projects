import React from 'react';

const InputComponent = ({ value, onUpdate }) => {
  return (
    <div className="input-section">
      <label className="section-label">Type Something:</label>
      <div className="input-wrapper">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onUpdate(e.target.value)} 
          placeholder="Enter text..."
          className="elegant-input"
        />
      </div>
    </div>
  );
};

export default InputComponent;