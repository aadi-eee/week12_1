import { useState } from 'react';

const products = [
  { id: 1, name: 'Linen Tote Bag', price: 18, image: 'https://picsum.photos/seed/tote/400/300' },
  { id: 2, name: 'Ceramic Mug', price: 12, image: 'https://picsum.photos/seed/mug/400/300' },
  { id: 3, name: 'Sketchbook', price: 9, image: 'https://picsum.photos/seed/sketchbook/400/300' },
  { id: 4, name: 'Scented Candle', price: 15, image: 'https://picsum.photos/seed/candle/400/300' },
  { id: 5, name: 'Film Camera', price: 85, image: 'https://picsum.photos/seed/camera/400/300' },
  { id: 6, name: 'Dried Flower Set', price: 22, image: 'https://picsum.photos/seed/flowers/400/300' },
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
            <p className="price">${p.price.toFixed(2)}</p>
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
              <span>{i.name}<br /><small>${i.price.toFixed(2)} each</small></span>
              <span className="qty">
                <button onClick={() => changeQuantity(i.id, -1)}>−</button>
                <b>{i.quantity}</b>
                <button onClick={() => changeQuantity(i.id, 1)}>+</button>
              </span>
            </li>
          ))}
        </ul>
        <h3 className="total">Total: ${totalPrice.toFixed(2)}</h3>
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
