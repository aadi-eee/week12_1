import { useState } from 'react';

export default function CounterHistory() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  // every time the count changes, push the new value and keep only the last 5
  function changeTo(newCount) {
    if (newCount === count) return; // no change, nothing to record
    setCount(newCount);
    setHistory((prev) => [...prev, newCount].slice(-5));
  }

  // Undo: go back to history[history.length - 2] and remove the last item
  function undo() {
    if (history.length < 2) return;
    setCount(history[history.length - 2]);
    setHistory((prev) => prev.slice(0, -1));
  }

  return (
    <div>
      <p className="big-count">{count}</p>

      <div className="btn-row">
        <button onClick={() => changeTo(count - 1)}>-1</button>
        <button onClick={() => changeTo(count + 1)}>+1</button>
        <button onClick={() => changeTo(0)}>Reset</button>
        <button onClick={undo} disabled={history.length < 2}>Undo</button>
      </div>

      <h3 className="history-title">History (last 5)</h3>
      <div className="chips">
        <span>[</span>
        {history.map((value, i) => {
          const isCurrent = i === history.length - 1;
          const isUndoTarget = i === history.length - 2;
          return (
            <span
              key={i}
              className={`chip${isCurrent ? ' current' : ''}${isUndoTarget ? ' next' : ''}`}
            >
              {value}
            </span>
          );
        })}
        <span>]</span>
      </div>
      <p className="legend">
        <b>dark red</b> = current value · <b>yellow</b> = where Undo will go
      </p>
    </div>
  );
}