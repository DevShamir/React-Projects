import React from 'react';
import StudentList from '../components/Studentlist';
import './App.css';

function App() {
  const studentData = [
    { id: 101, name: "Elena Gilbert", course: "Molecular Biology", grade: "A+", status: "active", avatar: "https://i.pravatar.cc/150?u=elena" },
    { id: 102, name: "Marcus Wright", course: "Data Architecture", grade: "A", status: "active", avatar: "https://i.pravatar.cc/150?u=marcus" },
    { id: 103, name: "Sophia Chen", course: "UI/UX Design", grade: "B+", status: "away", avatar: "https://i.pravatar.cc/150?u=sophia" },
  ];

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">🟣 Student academy</div>
        <div className="nav-links">
          <button className="nav-pill active">Students</button>
          <button className="nav-pill">Schedule</button>
        </div>
        <div className="nav-icons">
          <span>🔔</span>
          <span className="profile-icon">👤</span>
        </div>
      </nav>

      <header className="list-header">
        <h1>Class Registry</h1>
        <p>2026 Academic Year • 250 Total Students</p>
      </header>
      
      <StudentList students={studentData} />
    </div>
  );
}

export default App;