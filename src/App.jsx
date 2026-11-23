import { useState, useEffect } from 'react';
import ToggleDetail from './components/ToggleDetail.jsx';
import TaskList from './components/TaskList.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import ShoppingCartCounter from './components/ShoppingCartCounter.jsx';
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';

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

function Card({ number, title, children }) {
  return (
    <section className="card">
      <span className="card-no">{number}</span>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const hash = useHashRoute();

  if (hash === '#/cart') return <ShoppingCartPage />;

  return (
    <main className="page">
      <header className="hero">
        <p className="script">week eleven</p>
        <h1>React State &amp; Props</h1>
        <p className="sub">All exercises on one page. The homework shopping cart lives on its own page.</p>
        <a className="cta" href="#/cart">Open the Interactive Shopping Cart →</a>
      </header>

      <div className="grid">
        <Card number="01" title="Toggle visibility">
          <ToggleDetail />
        </Card>
        <Card number="02" title="Task list">
          <TaskList />
        </Card>
        <Card number="03" title="Scoreboard (props)">
          <ScoreBoard />
        </Card>
        <Card number="04" title="Shopping cart counter">
          <ShoppingCartCounter />
        </Card>
      </div>
    </main>
  );
}
