import React, { useState, useMemo } from 'react';
import './App.css';
const INITIAL_STUDENTS = [
  { id: 'S001', name: 'Alice Johnson', subject: 'Mathematics', marks: 95 },
  { id: 'S002', name: 'Bob Smith', subject: 'Science', marks: 78 },
  { id: 'S003', name: 'Charlie Brown', subject: 'History', marks: 88 },
  { id: 'S004', name: 'Diana Prince', subject: 'Mathematics', marks: 92 },
  { id: 'S005', name: 'Evan Wright', subject: 'Science', marks: 65 },
  { id: 'S006', name: 'Fiona Gallagher', subject: 'Literature', marks: 84 },
  { id: 'S007', name: 'George Miller', subject: 'History', marks: 72 },
  { id: 'S008', name: 'Hannah Abbott', subject: 'Literature', marks: 91 },
];
const getGradeInfo = (marks) => {
  if (marks >= 90) return { grade: 'A', badgeClass: 'grade-a' };
  if (marks >= 80) return { grade: 'B', badgeClass: 'grade-b' };
  if (marks >= 70) return { grade: 'C', badgeClass: 'grade-c' };
  return { grade: 'D', badgeClass: 'grade-d' };
};
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'marks', direction: 'desc' });
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const processedStudents = useMemo(() => {
    let filteredData = INITIAL_STUDENTS.filter((student) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        student.name.toLowerCase().includes(searchLower) ||
        student.subject.toLowerCase().includes(searchLower) ||
        student.id.toLowerCase().includes(searchLower)
      );
    });
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [searchTerm, sortConfig]);
  const getSortIndicator = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };
  return (
    <div className="app-root">
      <div className="table-container page-animate">
        
        <div className="table-header">
          <div>
            <h2 className="section-title">Student Performance</h2>
            <p className="subtitle">View and manage student grades</p>
          </div>
          
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="table-search-input" 
              placeholder="Search by name, ID, or subject..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="marks-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('id')} className="sortable">
                  Student ID <span className="sort-icon">{getSortIndicator('id')}</span>
                </th>
                <th onClick={() => requestSort('name')} className="sortable">
                  Full Name <span className="sort-icon">{getSortIndicator('name')}</span>
                </th>
                <th onClick={() => requestSort('subject')} className="sortable">
                  Subject <span className="sort-icon">{getSortIndicator('subject')}</span>
                </th>
                <th onClick={() => requestSort('marks')} className="sortable text-center">
                  Marks <span className="sort-icon">{getSortIndicator('marks')}</span>
                </th>
                <th className="text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {processedStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">No students match your search.</td>
                </tr>
              ) : (
                processedStudents.map((student) => {
                  const { grade, badgeClass } = getGradeInfo(student.marks);
                  return (
                    <tr key={student.id}>
                      <td className="fw-500 text-gray">{student.id}</td>
                      <td className="fw-600">{student.name}</td>
                      <td>
                        <span className="subject-pill">{student.subject}</span>
                      </td>
                      <td className="text-center fw-600">{student.marks}</td>
                      <td className="text-center">
                        <span className={`grade-badge ${badgeClass}`}>{grade}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          Showing {processedStudents.length} of {INITIAL_STUDENTS.length} students
        </div>

      </div>
    </div>
  );
}

export default App;