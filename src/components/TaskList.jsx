import { useState } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  function addTask() {
    if (!input.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: input.trim() }]);
    setInput('');
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="New task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="plain-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.text}</span>
            <button className="ghost" onClick={() => removeTask(task.id)}>×</button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p className="muted">No tasks yet.</p>}
    </div>
  );
}
