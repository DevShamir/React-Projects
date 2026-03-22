import React from 'react';

const StudentList = ({ students }) => {
  return (
    <div className="student-grid">
      {students.map((student) => (
        <div key={student.id} className="student-card">
          <div className="student-header">
            <span className="student-id">#{student.id}</span>
            <div className={`status-dot ${student.status}`}></div>
          </div>
          
          <img src={student.avatar} alt={student.name} className="student-avatar" />
          
          <div className="student-info">
            <h3 className="student-name">{student.name}</h3>
            <p className="student-course">{student.course}</p>
          </div>

          <div className="student-footer">
            <span className="grade-pill">{student.grade}</span>
            <button className="view-profile-btn">View Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;