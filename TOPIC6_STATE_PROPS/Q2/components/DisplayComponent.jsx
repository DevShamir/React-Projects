import React from 'react';

const DisplayComponent = ({ content }) => {
  return (
    <div className="display-section">
      <label className="section-label">Live Preview:</label>
      <div className="preview-container">
        <p className={`preview-text ${!content ? 'empty' : ''}`}>
          {content || "Waiting for input..."}
        </p>
      </div>
    </div>
  );
};

export default DisplayComponent;