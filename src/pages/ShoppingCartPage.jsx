import { useState } from 'react';

// photos live in public/images
const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;

const formatWon = (amount) =>
  new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(amount);

const products = [
  { id: 1, name: 'Linen Tote Bag', price: 18, image: img('tote.jpg') },
  { id: 2, name: 'Ceramic Mug', price: 12, image: img('mug.jpg') },
  { id: 3, name: 'Sketchbook', price: 9, image: img('sketchbook.jpg') },
  { id: 4, name: 'Scented Candle', price: 15, image: img('candle.jpg') },
  { id: 5, name: 'Film Camera', price: 85, image: img('camera.jpg') },
  { id: 6, name: 'Dried Flower Set', price: 22, image: img('flowers.jpg') },
];

// cart state = array of { id, name, price, quantity }
export function ShoppingCart() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function changeQuantity(id, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0) // dropping to 0 removes the item
    );
  }

  // computed from state, never stored
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const inCart = (id) => cart.some((i) => i.id === id);

  return (
    <div className="shop">
      <section className="products">
        {products.map((p) => (
          <article className="product" key={p.id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{formatWon(p.price)}</p>
            <div className="row">
              <button onClick={() => addToCart(p)}>Add</button>
              <button className="ghost" disabled={!inCart(p.id)} onClick={() => removeFromCart(p.id)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <aside className="sidebar">
        <h2>Your cart ({totalItems})</h2>
        {cart.length === 0 && <p className="muted">Your cart is empty.</p>}
        <ul className="plain-list">
          {cart.map((i) => (
            <li key={i.id}>
              <span>{i.name}<br /><small>{formatWon(i.price)} each</small></span>
              <span className="qty">
                <button onClick={() => changeQuantity(i.id, -1)}>−</button>
                <b>{i.quantity}</b>
                <button onClick={() => changeQuantity(i.id, 1)}>+</button>
              </span>
            </li>
          ))}
        </ul>
        <h3 className="total">Total: {formatWon(totalPrice)}</h3>
      </aside>
    </div>
  );
}

export default function ShoppingCartPage() {
  return (
    <main className="page wide">
      <a className="back" href="#/">← Back to exercises</a>
      <header className="hero">
        <p className="script">homework</p>
        <h1>Interactive Shopping Cart</h1>
      </header>
      <ShoppingCart />
    </main>
  );
}
