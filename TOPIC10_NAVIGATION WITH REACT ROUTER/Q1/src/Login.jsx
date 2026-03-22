import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleFakeLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/'); 
  };

  return (
    <div className="login-page page-animate">
      <div className="login-card">
        <h2 className="logo" style={{ textAlign: 'center', marginBottom: '10px' }}>EDUDASH</h2>
        <p className="login-subtitle">Admin Portal Login</p>
        
        <form className="add-student-form" style={{ flexDirection: 'column' }} onSubmit={handleFakeLogin}>
          <div className="form-group" style={{ width: '100%' }}>
            <input type="text" placeholder="Username (type anything)" required />
          </div>
          <div className="form-group" style={{ width: '100%', marginBottom: '20px' }}>
            <input type="password" placeholder="Password (type anything)" required />
          </div>
          <button type="submit" className="primary-btn" style={{ width: '100%' }}>
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;