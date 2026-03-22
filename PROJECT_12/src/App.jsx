import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';

const StudentContext = createContext();
const useStudents = () => useContext(StudentContext);

const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: '1', name: 'Muhammad Zakir', major: 'Computer Science', email: 'zakir@edu.com', gpa: 3.8 },
   { id: '2', name: 'Muhammad Rehman', major: 'Social Science', email: 'rehman@edu.com', gpa: 3.2 },
    { id: '3', name: 'Samreen', major: 'Biology', email: 'samreeen@edu.com', gpa: 3.9 },
  ]);

  const addStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: Date.now().toString() }]);
  };
  return (
    <StudentContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
function Navbar() {
  return (
    <nav className="portal-nav">
      <div className="nav-brand">
        <span className="brand-icon">🎓</span>
        <h2>UniPortal</h2>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/directory" className="nav-link">Directory</Link>
        <Link to="/add" className="btn-primary-small">+ Add Student</Link>
      </div>
    </nav>
  );
}

function Dashboard() {
  const { students } = useStudents();
  
  const totalStudents = students.length;
  const avgGpa = students.length > 0 
    ? (students.reduce((sum, s) => sum + parseFloat(s.gpa), 0) / totalStudents).toFixed(2)
    : 0;

  return (
    <div className="page-animate">
      <header className="page-header">
        <h1>Overview Dashboard</h1>
        <p>Welcome back to the University Administration Portal.</p>
      </header>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Enrolled</h3>
          <p className="stat-number">{totalStudents}</p>
        </div>
        <div className="stat-box">
          <h3>Average University GPA</h3>
          <p className="stat-number">{avgGpa}</p>
        </div>
      </div>
    </div>
  );
}
function StudentDirectory() {
  const { students } = useStudents();

  return (
    <div className="page-animate">
      <header className="page-header flex-header">
        <div>
          <h1>Student Directory</h1>
          <p>Manage and view all enrolled students.</p>
        </div>
      </header>

      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>GPA</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr><td colSpan="4" className="empty-table">No students found.</td></tr>
            ) : (
              students.map(student => (
                <tr key={student.id}>
                  <td className="fw-bold">{student.name}</td>
                  <td>{student.major}</td>
                  <td>
                    <span className={`gpa-badge ${parseFloat(student.gpa) >= 3.5 ? 'high' : 'standard'}`}>
                      {student.gpa}
                    </span>
                  </td>
                  <td>
                    <Link to={`/student/${student.id}`} className="view-link">View Profile</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddStudent() {
  const { addStudent } = useStudents();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', major: '', email: '', gpa: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.major || !formData.email || !formData.gpa) {
      alert("Please fill out all fields.");
      return;
    }
    addStudent(formData);
    navigate('/directory');
  };

  return (
    <div className="page-animate form-wrapper">
      <header className="page-header">
        <h1>Register New Student</h1>
        <p>Enter the details below to add a student to the global directory.</p>
      </header>

      <form className="portal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
        </div>
        <div className="form-group">
          <label>Major</label>
          <input type="text" name="major" value={formData.major} onChange={handleChange} placeholder="e.g. Engineering" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@university.edu" />
        </div>
        <div className="form-group">
          <label>Current GPA</label>
          <input type="number" step="0.1" min="0" max="4.0" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="e.g. 3.5" />
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/directory')}>Cancel</button>
          <button type="submit" className="btn-primary">Enroll Student</button>
        </div>
      </form>
    </div>
  );
}

function StudentProfile() {
  const { id } = useParams();
  const { students } = useStudents();
  const navigate = useNavigate();
  
  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="page-animate text-center">
        <h2>Student Not Found</h2>
        <button className="btn-secondary mt-3" onClick={() => navigate('/directory')}>Return to Directory</button>
      </div>
    );
  }

  return (
    <div className="page-animate profile-wrapper">
      <button className="back-link" onClick={() => navigate('/directory')}>← Back to Directory</button>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-placeholder">
            {student.name.charAt(0)}
          </div>
          <div>
            <h2>{student.name}</h2>
            <p className="student-id">Student ID: #00{student.id}</p>
          </div>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Major</span>
            <span className="detail-value">{student.major}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{student.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Cumulative GPA</span>
            <span className={`gpa-badge ${parseFloat(student.gpa) >= 3.5 ? 'high' : 'standard'}`}>
              {student.gpa}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="portal-layout">
          <Navbar />
          <main className="portal-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/directory" element={<StudentDirectory />} />
              <Route path="/add" element={<AddStudent />} />
              <Route path="/student/:id" element={<StudentProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;