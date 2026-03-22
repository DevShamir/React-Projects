import React, { useState, useEffect } from 'react';
import './App.css';
const convertTemp = (temperature, toScale) => {
  if (temperature === '') return '';
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return '';

  if (toScale === 'F') {
    return Math.round((input * 9 / 5 + 32) * 100) / 100;
  } else {
    return Math.round(((input - 32) * 5 / 9) * 100) / 100;
  }
};
function App() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('C'); 
  const [history, setHistory] = useState([]);
  const celsius = scale === 'C' ? temperature : convertTemp(temperature, 'C');
  const fahrenheit = scale === 'F' ? temperature : convertTemp(temperature, 'F');
  const handleCelsiusChange = (e) => {
    setScale('C');
    setTemperature(e.target.value);
  };
  const handleFahrenheitChange = (e) => {
    setScale('F');
    setTemperature(e.target.value);
  };
  const clearHistory = () => setHistory([]);

  useEffect(() => {
    if (temperature === '' || Number.isNaN(parseFloat(temperature))) return;
    const timeoutId = setTimeout(() => {
      const newEntry = `${celsius}°C ⇌ ${fahrenheit}°F`;
      setHistory((prevHistory) => {
        if (prevHistory.length > 0 && prevHistory[0].conversion === newEntry) {
          return prevHistory;
        }
        return [
          {
            id: Date.now(),
            conversion: newEntry,
            timestamp: new Date().toLocaleTimeString(),
          },
          ...prevHistory
        ];
      });
    }, 800); 
    return () => clearTimeout(timeoutId);
  }, [temperature, scale, celsius, fahrenheit]);
  return (
    <div className="app-root page-animate">
      <div className="converter-card">
        
        <div className="converter-header">
          <div className="icon-wrapper">🌡️</div>
          <h2>Temperature Converter</h2>
          <p>Type in either field to convert instantly.</p>
        </div>
        <div className="input-group-container">
          <div className="input-box">
            <label>Celsius (°C)</label>
            <input
              type="number"
              value={celsius}
              onChange={handleCelsiusChange}
              placeholder="e.g. 0"
            />
          </div>
          <div className="equals-icon">⇌</div>
          <div className="input-box">
            <label>Fahrenheit (°F)</label>
            <input
              type="number"
              value={fahrenheit}
              onChange={handleFahrenheitChange}
              placeholder="e.g. 32"
            />
          </div>
        </div>
        <hr className="divider" />
        <div className="history-section">
          <div className="history-header">
            <h3>Conversion Audit Trail</h3>
            {history.length > 0 && (
              <button className="clear-btn" onClick={clearHistory}>Clear</button>
            )}
          </div>
          {history.length === 0 ? (
            <div className="empty-history">
              No conversions yet. Start typing above!
            </div>
          ) : (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id} className="history-item page-animate">
                  <span className="history-conversion">{item.conversion}</span>
                  <span className="history-time">{item.timestamp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
export default App;