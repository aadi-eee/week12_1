import { useState } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  function addTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: input.trim() }]);
    setInput('');
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <form onSubmit={addTask}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task"
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)} aria-label={`Remove ${task.text}`}>×</button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p className="muted">No tasks yet.</p>}
    </div>
  );
}