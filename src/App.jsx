import { useState, useEffect } from 'react';
import ToggleDetail from './components/ToggleDetail.jsx';
import TaskList from './components/TaskList.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import ShoppingCartCounter from './components/ShoppingCartCounter.jsx';
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';
import CodeBlock from './components/CodeBlock.jsx';

// "?raw" imports the file's text so we can display it
import toggleCode from './components/ToggleDetail.jsx?raw';
import taskCode from './components/TaskList.jsx?raw';
import scoreCode from './components/ScoreBoard.jsx?raw';
import CounterHistory from './components/CounterHistory.jsx';
import counterCode from './components/CounterHistory.jsx?raw';

// tiny hash router: "#/cart" -> shopping cart page, anything else -> exercises page
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Card({ number, title, text, tag, className = '', code, children }) {
  return (
    <section className={`card ${className}`}>
      {tag && <span className="tag">{tag}</span>}
      <div className="card-head">
        <span className="badge">{number}</span>
        <h2>{title}</h2>
      </div>
      <p className="card-text">{text}</p>
      <div className="card-body">{children}</div>
      {code && <CodeBlock code={code} />}
    </section>
  );
}

export default function App() {
  const hash = useHashRoute();

  if (hash === '#/cart') return <ShoppingCartPage />;

  return (
    <main className="site">
      <h1>My <span className="script">Week 12_1 </span> Exercises</h1>
      <p className="lead">React state and props: practice making the interface respond.</p>
      <a className="cta" href="#/cart">Open the Interactive Shopping Cart →</a>
      <a className="cta" href="#counter-challenge">Jump to the Counter with History &amp; Undo task ↓</a>

      <h2>React Tasks</h2>
      <div className="cards">
        <Card
          number="1"
          title="Shopping cart counter"
          text="Quantity buttons that can't go below 0, with a total of quantity × price."
          tag="Video lecture challenge"
        >
          <ShoppingCartCounter />
        </Card>

        <div className="group">
          <span className="tag">Study guide tasks</span>
          <div className="cards">
            <Card
              number="2"
              title="Toggle visibility"
              text="A button toggles a paragraph using boolean state."
              className="e2"
              code={toggleCode}
            >
              <ToggleDetail />
            </Card>
            <Card
              number="3"
              title="Task list"
              text="Add items to an array in state and remove them with ×."
              className="e3"
              code={taskCode}
            >
              <TaskList />
            </Card>
            <Card
              number="4"
              title="Scoreboard"
              text="A parent passes props to two PlayerScore children and shows the total."
              code={scoreCode}
            >
              <ScoreBoard />
            </Card>
          </div>
        </div>

        <div className="group" id="counter-challenge">
          <span className="tag">Week 12_1 code challenge</span>
          <p className="task-spec">
            <b>Task:</b> Build a <code>Counter</code> component using two state
            variables: <code>count</code> and <code>history</code> (an array). Every
            time the count changes, push the new value into history and keep only
            the last 5. Undo sets the count to <code>history[history.length - 2]</code> and
            removes the last item from history.
          </p>
          <div className="cards">
            <Card
              number="5"
              title="Counter with history & undo"
              text="Try it: change the count, watch the history, then undo."
              code={counterCode}
            >
              <CounterHistory />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}