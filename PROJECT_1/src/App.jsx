import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInputValue(''); // Clear the input after adding
  };

  // Handle toggling the completion status
  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="app-container">
      <div className="todo-card page-animate">
        
        <header className="todo-header">
          <h1 className="logo">TASK MASTER</h1>
          <div className="task-stats">
            <span>{completedTasks} / {totalTasks} Completed</span>
          </div>
        </header>

        <form className="add-task-form" onSubmit={handleAddTask}>
          <input 
            type="text" 
            className="task-input" 
            placeholder="What needs to be done?" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="primary-btn add-btn">
            Add Task
          </button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>You're all caught up! Add a task to get started.</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                
                <span className="task-text">{task.text}</span>
                
                <button 
                  className="delete-btn icon-btn" 
                  onClick={() => handleDeleteTask(task.id)}
                  title="Delete Task"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
}

export default App;