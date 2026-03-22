import React, { useState, useEffect } from 'react';
import './App.css';
const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'profile', label: 'Team Profiles', icon: '👥' }, 
  { id: 'billing', label: 'Billing & Plan', icon: '💳' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];
function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Muhammad Shamir', email: 'shamir.dev@example.com', bio: 'Frontend developer who loves building cool UIs.' },
    { id: 2, name: 'Ahmed', email: 'ahmed.20@outlook.com', bio: 'Backend engineer focused on database architecture.' }
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', bio: '' });
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return; 
    
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', email: '', bio: '' }); 
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-panel panel-animate">
            <div className="panel-header">
              <h2>Dashboard Overview</h2>
              <p className="panel-subtitle">Welcome back! Here is a summary of your account.</p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-title">Total Revenue</span>
                <span className="stat-value">$12,450</span>
                <span className="stat-trend positive">↑ 14% this month</span>
              </div>
              <div className="stat-card">
                <span className="stat-title">Active Users</span>
                <span className="stat-value">1,240</span>
                <span className="stat-trend positive">↑ 5% this week</span>
              </div>
              <div className="stat-card">
                <span className="stat-title">Bounce Rate</span>
                <span className="stat-value">24%</span>
                <span className="stat-trend negative">↓ 2% this week</span>
              </div>
              <div className="stat-card">
                <span className="stat-title">Conversion</span>
                <span className="stat-value">3.2%</span>
                <span className="stat-trend positive">↑ 1.1% this week</span>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="tab-panel panel-animate">
            <div className="panel-header">
              <h2>Team Profiles</h2>
              <p className="panel-subtitle">Manage team members and add new users.</p>
            </div>
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-avatar">{user.name.charAt(0)}</div>
                  <div className="user-details">
                    <h3>{user.name}</h3>
                    <p className="user-email">{user.email}</p>
                    <p className="user-bio">{user.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="divider" />

            <div className="panel-header" style={{ marginTop: '32px', marginBottom: '24px' }}>
              <h3 style={{ margin: 0 }}>Add New Member</h3>
            </div>
            <form className="profile-form" onSubmit={handleAddUser}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="e.g. Alex Johnson" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="e.g. alex@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea 
                  rows="3" 
                  value={newUser.bio}
                  onChange={(e) => setNewUser({...newUser, bio: e.target.value})}
                  placeholder="Short description about the team member..."
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="primary-btn">Add User</button>
              </div>
            </form>
          </div>
        );
      case 'billing':
        return (
          <div className="tab-panel panel-animate">
            <div className="panel-header">
              <h2>Billing & Plan</h2>
              <p className="panel-subtitle">Manage your subscriptions and payment methods.</p>
            </div>
            <div className="billing-card">
              <div className="plan-info">
                <h3>Pro Plan</h3>
                <p>$29.00 / month</p>
              </div>
              <span className="badge">Active</span>
            </div>
            <div className="button-group mt-3">
              <button className="secondary-btn">Update Payment Method</button>
              <button className="danger-btn ml-2">Cancel Subscription</button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="tab-panel panel-animate">
            <div className="panel-header">
              <h2>Account Settings</h2>
              <p className="panel-subtitle">Configure your preferences and notifications.</p>
            </div>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive daily summary emails.</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
              <hr />
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Dark Mode</h4>
                  <p>Switch between light and dark themes.</p>
                </div>
                <input 
                  type="checkbox" 
                  className="toggle" 
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                />
              </div>
              <hr />
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account.</p>
                </div>
                <button className="secondary-btn">Enable 2FA</button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };
  return (
    <div className="app-root">
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <span className="logo-icon">⚡</span>
            <h2>DashApp</h2>
          </div>
          <nav className="tab-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="dashboard-main">
          <div className="main-content-wrapper">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
export default App;