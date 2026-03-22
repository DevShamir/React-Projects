import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { roll: '101', name: 'Ahmed Raz', math: 88, science: 92, total: 180 },
    { roll: '102', name: 'Samina Ilyas', math: 75, science: 85, total: 160 },
    { roll: '103', name: 'Zahid Shah', math: 95, science: 89, total: 184 },
  ]);

  const [formData, setFormData] = useState({
    roll: '',
    name: '',
    math: '',
    science: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.roll || !formData.name || !formData.math || !formData.science) {
      alert("Please fill in all fields.");
      return;
    }
    if (students.some(student => student.roll === formData.roll)) {
      alert("A student with this Roll No. already exists!");
      return;
    }

    const mathScore = Number(formData.math);
    const scienceScore = Number(formData.science);
    const totalScore = mathScore + scienceScore;

    const newStudent = {
      roll: formData.roll,
      name: formData.name,
      math: mathScore,
      science: scienceScore,
      total: totalScore
    };

    setStudents([...students, newStudent]);
    
    setFormData({ roll: '', name: '', math: '', science: '' });
  };

  const handleDeleteStudent = (rollToRemove) => {
    const updatedStudents = students.filter(student => student.roll !== rollToRemove);
    setStudents(updatedStudents);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">EDUDASH</h1>
        <div className="user-profile">
          <span className="user-name">Admin Portal</span>
          <button className="icon-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </header>
      
      <section className="action-banner">
        <div className="banner-content">
          <h2>Add New Student</h2>
          <p>Enter the student's details and marks below. The total will be calculated automatically.</p>
        </div>
        
        <form className="add-student-form" onSubmit={handleAddStudent}>
          <div className="form-group">
            <input type="text" name="roll" placeholder="Roll No." value={formData.roll} onChange={handleInputChange} />
          </div>
          <div className="form-group name-group">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <input type="number" name="math" placeholder="Math" value={formData.math} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <input type="number" name="science" placeholder="Science" value={formData.science} onChange={handleInputChange} />
          </div>
          <button type="submit" className="primary-btn">Add Record</button>
        </form>
      </section>

      <main className="table-section">
        <h3 className="section-title">Student Records</h3>
        
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll No.</th>
                <th>Student Name</th>
                <th>Math</th>
                <th>Science</th>
                <th>Total Marks</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">No students added yet.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.roll}>
                    <td className="fw-bold text-dark">{student.roll}</td>
                    <td className="fw-medium">{student.name}</td>
                    <td>{student.math}</td>
                    <td>{student.science}</td>
                    <td className="total-score">{student.total}</td>
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteStudent(student.roll)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
export default App;