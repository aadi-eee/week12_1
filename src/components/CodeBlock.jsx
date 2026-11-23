// "Show code" box: uses the same <details> look as the old site
export default function CodeBlock({ code }) {
  return (
    <details className="example">
      <summary>Show code</summary>
      <pre><code>{code}</code></pre>
    </details>
  );
}