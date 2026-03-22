import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const logAction = (actionName, prevValue, newValue) => {
    const timestamp = new Date().toLocaleTimeString();
    const newEntry = {
      id: Date.now(), 
      action: actionName,
      prev: prevValue,
      current: newValue,
      time: timestamp
    };
    setHistory(prevHistory => [newEntry, ...prevHistory]);
  };
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    logAction('Increment (+1)', count, newCount);
  };
  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    logAction('Decrement (-1)', count, newCount);
  };
  const handleReset = () => {
    if (count !== 0) {
      setCount(0);
      logAction('Reset to 0', count, 0);
    }
  };
  const clearHistory = () => {
    setHistory([]);
  };
  return (
    <div className="app-container">
      <header className="header" style={{ justifyContent: 'center' }}>
        <h1 className="logo">STATE TRACKER</h1>
      </header>
      <div className="main-content">
        <section className="counter-card">
          <h2 className="subtitle">Current Count</h2>
          <div className="count-display">
            {count}
          </div>
          
          <div className="controls">
            <button className="control-btn decrement" onClick={handleDecrement}>
              -1
            </button>
            <button className="control-btn reset" onClick={handleReset} disabled={count === 0}>
              Reset
            </button>
            <button className="control-btn increment" onClick={handleIncrement}>
              +1
            </button>
          </div>
        </section>
        <section className="history-section">
          <div className="history-header">
            <h3>History Log</h3>
            {history.length > 0 && (
              <button className="clear-btn" onClick={clearHistory}>Clear Log</button>
            )}
          </div>

          <div className="history-list">
            {history.length === 0 ? (
              <div className="empty-state">No actions recorded yet.</div>
            ) : (
              history.map((entry) => (
                <div key={entry.id} className="history-item page-animate">
                  <div className="history-time">{entry.time}</div>
                  <div className="history-details">
                    <span className={`action-badge ${entry.action.includes('++') || entry.action.includes('Inc') ? 'bg-green' : entry.action.includes('--') || entry.action.includes('Dec') ? 'bg-red' : 'bg-gray'}`}>
                      {entry.action}
                    </span>
                    <span className="state-transition">
                      {entry.prev} <span className="arrow">→</span> <strong>{entry.current}</strong>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
export default App;