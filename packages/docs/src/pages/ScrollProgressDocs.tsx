import { useEffect } from 'react';

function ScrollProgressDocs() {
  useEffect(() => {
    import('@uibit/scroll-progress');
  }, []);

  return (
    <div className="bg-white">
      <div style={{ position: 'relative' }}>
        <uibit-scroll-progress></uibit-scroll-progress>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Scroll-Progress Component</h1>
        <p className="text-lg text-gray-600 mb-6">
          A lightweight progress bar showing how far down the page the user has scrolled.
        </p>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <code className="block bg-gray-100 p-4 rounded font-mono text-sm">
            pnpm add @uibit/scroll-progress
          </code>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
{`import '@uibit/scroll-progress';

export default function App() {
  return (
    <>
      <uibit-scroll-progress></uibit-scroll-progress>
      <main>{/* Your content */}</main>
    </>
  );
}`}
          </pre>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Customization</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
{`<style>
  uibit-scroll-progress {
    --progress-color: #3b82f6;
    --progress-height: 4px;
    --progress-bg: transparent;
  }
</style>

<uibit-scroll-progress></uibit-scroll-progress>`}
          </pre>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">CSS Variables</h2>
          <div className="space-y-4">
            <div className="border rounded p-4">
              <code className="font-mono text-primary-600">--progress-color</code>
              <p className="text-gray-600 mt-2">Color of the progress bar (default: #3b82f6)</p>
            </div>
            <div className="border rounded p-4">
              <code className="font-mono text-primary-600">--progress-height</code>
              <p className="text-gray-600 mt-2">Height of the progress bar (default: 4px)</p>
            </div>
            <div className="border rounded p-4">
              <code className="font-mono text-primary-600">--progress-bg</code>
              <p className="text-gray-600 mt-2">Background color of the progress bar area</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <ul className="space-y-3">
            {['Fixed positioning at top of viewport', 'Smooth GPU-accelerated animations', 'Throttled scroll events for performance', 'Respects prefers-reduced-motion', 'Minimal JavaScript footprint', 'Works with any page length'].map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ScrollProgressDocs;
