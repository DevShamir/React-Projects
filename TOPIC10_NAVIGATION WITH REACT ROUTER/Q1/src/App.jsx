import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import StudentCards from './StudentCards';
import Contact from './Contact';
import About from './About';
import Login from './Login';
import './App.css';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  if (currentPath === '/login') return null;

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 className="logo">EDUDASH</h1>
      <nav className="nav-links">
        {isAuthenticated && (
          <>
            <Link to="/" className={currentPath === '/' ? 'active' : ''}>Dashboard</Link>
            <Link to="/students" className={currentPath === '/students' ? 'active' : ''}>Directory</Link>
          </>
        )}
        <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>Contact</Link>
        <Link to="/about" className={currentPath === '/about' ? 'active' : ''}>About</Link>
      </nav>
      
      <div className="user-profile">
        {isAuthenticated ? (
          <>
            <span className="user-name">Admin</span>
            <button className="icon-btn logout-btn" onClick={handleLogout} title="Logout">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </>
        ) : (
          <Link to="/login" className="primary-btn" style={{ padding: '8px 20px' }}>Login</Link>
        )}
      </div>
    </header>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [students, setStudents] = useState([
    { roll: '101', name: 'Ahmed Raz', math: 88, science: 92, total: 180 },
    { roll: '102', name: 'Samina Ilyas', math: 75, science: 85, total: 160 },
    { roll: '103', name: 'Zahid Shah', math: 95, science: 89, total: 184 },
  ]);

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home students={students} setStudents={setStudents} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/students" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StudentCards students={students} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;