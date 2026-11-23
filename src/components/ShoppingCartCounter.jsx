import { useState } from 'react';

const items = [
  { id: 1, name: '커피', price: 4500 },
  { id: 2, name: '샌드위치', price: 7000 },
  { id: 3, name: '물', price: 1000 },
];

// The in-class exercise component (named ShoppingCart in the task).
// State is an object mapping item id -> quantity, e.g. { 1: 2, 2: 0, 3: 1 }
export default function ShoppingCart() {
  const [quantities, setQuantities] = useState({ 1: 0, 2: 0, 3: 0 });

  function increase(id) {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }

  function decrease(id) {
    // quantity cannot go below 0
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  }

  // derived value, not stored in state
  const total = items.reduce((sum, item) => sum + item.price * quantities[item.id], 0);

  return (
    <div>
      <ul className="plain-list">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name} — ₩{item.price.toLocaleString()}</span>
            <span className="qty">
              <button onClick={() => decrease(item.id)}>−</button>
              <b>{quantities[item.id]}</b>
              <button onClick={() => increase(item.id)}>+</button>
            </span>
          </li>
        ))}
      </ul>
      <h3 className="total">Total: ₩{total.toLocaleString()}</h3>
    </div>
  );
}
