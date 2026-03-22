import React, { useState } from 'react';
import InputComponent from '../components/InputComponent';
import DisplayComponent from '../components/DisplayComponent';
import './App.css';

function App() {
  const [text, setText] = useState("");

  return (
    <div className="app-viewport">
      <div className="glass-card">
        <header className="card-header">
          <h1 className="title">Sibling State Sync</h1>
          <p className="subtitle">Lifting State Up Pattern</p>
        </header>

        <InputComponent value={text} onUpdate={setText} />
        
        <div className="divider"></div>

        <DisplayComponent content={text} />
      </div>
    </div>
  );
}

export default App;