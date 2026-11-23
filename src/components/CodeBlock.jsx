import { useState } from 'react';

export default function CodeBlock({ code }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="code-wrap">
      <button className="ghost" onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide code' : 'Show code'}
      </button>
      {open && (
        <pre className="code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}