import React from 'react';

const StudentCards = ({ students }) => {
  return (
    <div className="page-animate">
      <h2 className="section-title">Student Directory</h2>
      <div className="student-grid">
        {students.length === 0 ? (
          <p className="empty-state">No students to display.</p>
        ) : (
          students.map(student => (
            <div key={student.roll} className="student-card">
              <div className="card-header">
                <h3>{student.name}</h3>
                <span className="badge">Roll: {student.roll}</span>
              </div>
              <div className="card-body">
                <p><strong>Math:</strong> {student.math}</p>
                <p><strong>Science:</strong> {student.science}</p>
              </div>
              <div className="card-footer">
                <span className="total-label">Total Score</span>
                <span className="total-score">{student.total}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentCards;