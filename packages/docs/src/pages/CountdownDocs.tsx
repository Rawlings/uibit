import { useEffect } from 'react';

function CountdownDocs() {
  useEffect(() => {
    import('@uibit/countdown');
  }, []);

  // Set target to 1 hour from now for demo
  const targetTime = new Date(Date.now() + 3600000).toISOString();

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Countdown Component</h1>
        <p className="text-lg text-gray-600 mb-6">
          Display countdown timers to a target date or duration with customizable formatting.
        </p>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Live Demo</h2>
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Counting down to 1 hour from now...</p>
            <uibit-countdown target={targetTime} auto-start={true}></uibit-countdown>
          </div>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <code className="block bg-gray-100 p-4 rounded font-mono text-sm">
            pnpm add @uibit/countdown
          </code>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
{`import '@uibit/countdown';

function SaleCountdown() {
  return (
    <uibit-countdown
      target="2025-12-25T00:00:00"
      auto-start
    ></uibit-countdown>
  );
}`}
          </pre>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">API Reference</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Properties</h3>
              <div className="space-y-4">
                <div className="border rounded p-4">
                  <code className="font-mono text-primary-600">target</code>
                  <p className="text-gray-600 text-sm mt-2">ISO date string for countdown target</p>
                </div>
                <div className="border rounded p-4">
                  <code className="font-mono text-primary-600">duration</code>
                  <p className="text-gray-600 text-sm mt-2">Milliseconds to count down (alternative to target)</p>
                </div>
                <div className="border rounded p-4">
                  <code className="font-mono text-primary-600">auto-start</code>
                  <p className="text-gray-600 text-sm mt-2">Start counting on mount (default: true)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Methods</h3>
              <div className="space-y-2 text-sm">
                <div>• <code className="font-mono">start()</code> - Begin counting</div>
                <div>• <code className="font-mono">stop()</code> - Pause counting</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Events</h3>
              <div className="space-y-4">
                <div className="border rounded p-4">
                  <code className="font-mono text-primary-600">countdown-tick</code>
                  <p className="text-gray-600 text-sm mt-2">Fired every second with time details</p>
                </div>
                <div className="border rounded p-4">
                  <code className="font-mono text-primary-600">countdown-complete</code>
                  <p className="text-gray-600 text-sm mt-2">Fired when countdown reaches zero</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <ul className="space-y-3">
            {['Target date or fixed duration', 'Customizable format', 'Event dispatch', 'Auto-start capability', 'Pause/resume control', 'Accessible with live regions'].map((f, i) => (
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

export default CountdownDocs;
