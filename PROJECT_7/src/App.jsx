import React, { useState } from 'react';
import './App.css';
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does React use to update the DOM efficiently?",
    options: ["Real DOM", "Virtual DOM", "Shadow DOM", "Document Object Model"],
    correctAnswer: "Virtual DOM"
  },
  {
    id: 2,
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useContext", "useState", "useReducer"],
    correctAnswer: "useState"
  },
  {
    id: 3,
    question: "How do you pass data from a parent component to a child component?",
    options: ["State", "Props", "Context", "Redux"],
    correctAnswer: "Props"
  },
  {
    id: 4,
    question: "What is JSX?",
    options: ["A JavaScript library", "A database query language", "A syntax extension for JavaScript", "A CSS framework"],
    correctAnswer: "A syntax extension for JavaScript"
  },
  {
    id: 5,
    question: "Which array method is most commonly used to render lists of elements in React?",
    options: ["filter()", "reduce()", "map()", "forEach()"],
    correctAnswer: "map()"
  }
];
function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const isFirstQuestion = currentIdx === 0;
  const isLastQuestion = currentIdx === QUIZ_QUESTIONS.length - 1;
  const totalQuestions = QUIZ_QUESTIONS.length;

  let liveScore = 0;
  QUIZ_QUESTIONS.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) {
      liveScore++;
    }
  });

  const handleSelectOption = (option) => {
    setAnswers({
      ...answers,
      [currentIdx]: option
    });
  };

  const handleNext = () => {
    if (!isLastQuestion) setCurrentIdx(currentIdx + 1);
  };

  const handlePrev = () => {
    if (!isFirstQuestion) setCurrentIdx(currentIdx - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    const percentage = Math.round((liveScore / totalQuestions) * 100);
    let feedbackMsg = "";
    if (percentage === 100) feedbackMsg = "Perfect score! Outstanding job.";
    else if (percentage >= 80) feedbackMsg = "Great work! You know your stuff.";
    else if (percentage >= 60) feedbackMsg = "Good effort, but room for improvement.";
    else feedbackMsg = "Keep practicing! You'll get it next time.";

    return (
      <div className="app-root page-animate">
        <div className="quiz-card results-card">
          <div className="trophy-icon">🏆</div>
          <h2>Quiz Completed!</h2>
          <div className="score-circle">
            <span className="score-number">{liveScore}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{totalQuestions}</span>
          </div>
          <p className="percentage-text">{percentage}% Accuracy</p>
          <p className="feedback-text">{feedbackMsg}</p>
          <button className="primary-btn mt-4" onClick={handleRestart}>
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="app-root page-animate">
      <div className="quiz-header">
        <h1 className="logo">EDUDASH <span className="logo-light">QUIZ</span></h1>
        <div className="live-score-badge">
          Live Score: <strong>{liveScore} / {totalQuestions}</strong>
        </div>
      </div>

      <div className="quiz-card">
        <div className="progress-container">
          <div className="progress-labels">
            <span>Question {currentIdx + 1} of {totalQuestions}</span>
            <span>{Math.round(((currentIdx + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="question-area">
          <h2 className="question-text">{currentQuestion.question}</h2>
          
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentIdx] === option;
              return (
                <button 
                  key={index}
                  className={`option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(option)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="quiz-footer">
          <button 
            className="nav-btn" 
            onClick={handlePrev} 
            disabled={isFirstQuestion}
          >
            ← Previous
          </button>
          
          {isLastQuestion ? (
            <button 
              className="primary-btn submit-btn" 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < totalQuestions}
            >
              Submit Quiz
            </button>
          ) : (
            <button className="nav-btn next-btn" onClick={handleNext}>
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;