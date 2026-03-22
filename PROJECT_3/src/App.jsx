import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill out all required fields.");
      return;
    }
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${formData.name}`
    };
    setUsers([newUser, ...users]);
    setFormData({ name: '', email: '', role: 'Developer' });
  };
  const handleDelete = (idToRemove) => {
    setUsers(users.filter(user => user.id !== idToRemove));
  };
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo">USER PORTAL</h1>
        <p className="subtitle">Register and manage team members</p>
      </header>
      <div className="main-layout">
        <section className="registration-section page-animate">
          <div className="card form-card">
            <h2>New Registration</h2>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Jane Doe" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="jane@company.com" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Job Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange}>
                  <option value="Developer">Software Developer</option>
                  <option value="Designer">UI/UX Designer</option>
                  <option value="Manager">Product Manager</option>
                  <option value="Marketing">Marketing Specialist</option>
                </select>
              </div>
              <button type="submit" className="primary-btn">
                Register User
              </button>
            </form>
          </div>
        </section>
        <section className="cards-section">
          <h2>Registered Users ({users.length})</h2>
          <div className="users-grid">
            {users.length === 0 ? (
              <div className="empty-state">
                <p>No users registered yet. Fill out the form to add someone!</p>
              </div>
            ) : (
              users.map(user => (
                <div key={user.id} className="user-card page-animate">
                  <button className="delete-btn" onClick={() => handleDelete(user.id)} title="Remove User">×</button>
                  <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar" />
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
                    <p className="user-email">{user.email}</p>
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