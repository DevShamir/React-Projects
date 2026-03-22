import React, { useState } from 'react';

const Home = ({ students, setStudents }) => {
  const [formData, setFormData] = useState({ roll: '', name: '', math: '', science: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
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
    const newStudent = {
      roll: formData.roll,
      name: formData.name,
      math: mathScore,
      science: scienceScore,
      total: mathScore + scienceScore
    };
    
    setStudents([...students, newStudent]);
    setFormData({ roll: '', name: '', math: '', science: '' });
  };

  const handleDeleteStudent = (rollToRemove) => {
    setStudents(students.filter(student => student.roll !== rollToRemove));
  };

  return (
    <div className="page-animate">
      <section className="action-banner">
        <div className="banner-content">
          <h2>Add New Student</h2>
          <p>Enter the student's details and marks below.</p>
        </div>
        <form className="add-student-form" onSubmit={handleAddStudent}>
          <div className="form-group"><input type="text" name="roll" placeholder="Roll No." value={formData.roll} onChange={handleInputChange} /></div>
          <div className="form-group name-group"><input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} /></div>
          <div className="form-group"><input type="number" name="math" placeholder="Math" value={formData.math} onChange={handleInputChange} /></div>
          <div className="form-group"><input type="number" name="science" placeholder="Science" value={formData.science} onChange={handleInputChange} /></div>
          <button type="submit" className="primary-btn">Add Record</button>
        </form>
      </section>

      <main className="table-section">
        <h3 className="section-title">Student Records</h3>
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr><th>Roll No.</th><th>Student Name</th><th>Math</th><th>Science</th><th>Total</th><th>Action</th></tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan="6" className="empty-state">No students added yet.</td></tr>
              ) : (
                students.map((student) => (
                  <tr key={student.roll}>
                    <td className="fw-bold text-dark">{student.roll}</td>
                    <td className="fw-medium">{student.name}</td>
                    <td>{student.math}</td>
                    <td>{student.science}</td>
                    <td className="total-score">{student.total}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDeleteStudent(student.roll)}>
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
};

export default Home;