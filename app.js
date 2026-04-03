import React, { useState } from 'react';
import './App.css';

const CHAPTERS = [ /* Paste your full CHAPTERS array here */ ];

function App() {
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [chapter, setChapter] = useState(1);

  // generateProblems function here (paste full function, fixed errors)
  // Note: Fix bugs like break-even (x=2000/30≈66.67 → options need update to ["x=66.67",...], correct=0)

  const loadChapter = () => {
    const probs = generateProblems().filter(p => p.chapter === chapter);
    setProblems(probs);
    setCurrentProblem(0);
    setSelected(null);
    setScore(0);
  };

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === problems[currentProblem]?.correct) setScore(s => s + 1);
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(c => c + 1);
      setSelected(null);
    }
  };

  useState(() => loadChapter(), []);

  return (
    <div className="app">
      <h1>Math Quiz: Schaum's Business & Economics [web:24]</h1>
      <select onChange={e => setChapter(+e.target.value)} value={chapter}>
        {CHAPTERS.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
      </select>
      <button onClick={loadChapter}>Load Chapter</button>
      {problems.length > 0 && (
        <>
          <div className="problem">
            <h3>Q{currentProblem + 1}: {problems[currentProblem]?.question}</h3>
            <ul>
              {problems[currentProblem]?.options.map((opt, i) => (
                <li key={i} onClick={() => handleAnswer(i)} className={selected === i ? 'selected' : ''}>
                  {opt}
                </li>
              ))}
            </ul>
            {selected !== null && <button onClick={nextProblem}>Next</button>}
          </div>
          <p>Score: {score}/{currentProblem + 1}</p>
        </>
      )}
    </div>
  );
}

export default App;
