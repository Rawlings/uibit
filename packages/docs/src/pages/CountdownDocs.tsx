import { Link } from 'react-router-dom';
import '@uibit/countdown';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/countdown/custom-elements.json';

function CountdownDocs() {

  const targetTime = new Date(Date.now() + 3600 * 1000 * 2.5).toISOString(); // 2.5 hours from now

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Countdown</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Countdown
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          Highly customizable countdown timer. Supports target date markers or set durations, reactive timers, and custom format templates.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/countdown
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Counting down to 2 hours and 30 minutes from now:</p>
          <div className="max-w-md bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <uibit-countdown target={targetTime} autoStart={true} format="HH:MM:SS"></uibit-countdown>
          </div>
        </div>
      </section>

      <ApiDocs manifest={manifest as any} tagName="uibit-countdown" />
      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">HTML Integration</h3>
            <pre className="code-block"><code>{`<uibit-countdown target="2026-12-31T23:59:59" format="DD:HH:MM:SS"></uibit-countdown>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">React Integration</h3>
            <pre className="code-block"><code>{`import '@uibit/countdown';

function SaleTimer() {
  const threeHours = 3 * 3600 * 1000;

  return (
    <uibit-countdown duration={threeHours} format="HH:MM:SS" />
  );
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Calculates offset once to prevent interval time drifting',
            'Internal count variables hidden from public API attributes',
            'Full support for customizable segment formatting (DD, HH, MM, SS)',
            'Polite ARIA live landmark alerts for screen readers',
            'Dynamic update hooks restart automatically when target date changes'
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gray-900 font-semibold mt-0.5">—</span>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CountdownDocs;
