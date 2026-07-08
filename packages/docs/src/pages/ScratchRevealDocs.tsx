import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function ScratchRevealDocs() {
  const elementRef = useRef<any>(null);

  useEffect(() => {
    import('@uibit/scratch-reveal');
  }, []);

  const handleReset = () => {
    if (elementRef.current) {
      elementRef.current.reset();
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Scratch Reveal</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Scratch Reveal
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          A gamified, accessible scratch-off panel component that reveals hidden content. Users can scratch off the overlay canvas layer by dragging or touching.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/scratch-reveal
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center gap-6">
          <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white shadow-md">
            {/* Component */}
            <uibit-scratch-reveal
              ref={elementRef}
              style={{
                '--uibit-scratch-reveal-width': '320px',
                '--uibit-scratch-reveal-height': '180px',
                '--uibit-scratch-reveal-background': '#ffffff',
                '--uibit-scratch-reveal-color': '#000000',
                '--uibit-scratch-reveal-overlay-color': '#cccccc',
              } as React.CSSProperties}
            >
              <div className="font-semibold text-lg">Antigravity Standard!</div>
            </uibit-scratch-reveal>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Reset Scratch Card
          </button>
        </div>
      </section>

      {/* API Reference */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">API</h2>
        
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Properties</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Property</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Default</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: 'revealPercentage', type: 'number', default: '0', desc: 'Read-only active scratch percentage (0-100)' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-gray-900">{row.prop}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.type}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.default}</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Slots</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Slot</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: '[default]', desc: 'The content block revealed behind the scratch-off overlay' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-gray-900">{row.name}</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Methods</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Method</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Parameters</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Return</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'reset()', params: '—', return: 'void', desc: 'Resets the scratch card and draws overlay canvas' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-gray-900">{row.name}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.params}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.return}</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Events</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Event</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'scratch-reveal', detail: '{ revealPercentage: number }', desc: 'Fires when scratch reveal meets or exceeds 50%' },
                  { name: 'scratch-progress', detail: '{ revealPercentage: number }', desc: 'Fires continuously as the user is scratching' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-gray-900">{row.name}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.detail}</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">CSS Custom Properties</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Variable</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Default</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: '--uibit-scratch-reveal-width', type: 'length', default: '300px', desc: 'Width of the scratch card' },
                  { prop: '--uibit-scratch-reveal-height', type: 'length', default: '200px', desc: 'Height of the scratch card' },
                  { prop: '--uibit-scratch-reveal-overlay-color', type: 'color', default: '#c0c0c0', desc: 'Solid color overlay to scratch off' },
                  { prop: '--uibit-scratch-reveal-background', type: 'color', default: '#f0f0f0', desc: 'Inner reveal canvas background color' },
                  { prop: '--uibit-scratch-reveal-color', type: 'color', default: '#000000', desc: 'Reveal text content color' },
                  { prop: '--uibit-scratch-reveal-brush-size', type: 'length', default: '40px', desc: 'Brush size/diameter used to scratch overlay' },
                  { prop: '--uibit-scratch-reveal-border-radius', type: 'length', default: '8px', desc: 'Container border radius' },
                  { prop: '--uibit-scratch-reveal-padding', type: 'length', default: '1rem', desc: 'Container content padding' },
                  { prop: '--uibit-scratch-reveal-font-size', type: 'length', default: '1rem', desc: 'Font size of the content text' },
                  { prop: '--uibit-scratch-reveal-font-weight', type: 'string', default: 'bold', desc: 'Font weight of the content text' },
                  { prop: '--uibit-scratch-reveal-instructions-font-size', type: 'length', default: '0.875rem', desc: 'Font size of instruction hint' },
                  { prop: '--uibit-scratch-reveal-instructions-color', type: 'color', default: 'rgba(0,0,0,0.6)', desc: 'Color of instructions text hint' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-gray-900">{row.prop}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.type}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.default}</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">CSS Shadow Parts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Part</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { part: 'container', desc: 'The scratch card outer container element' },
                  { part: 'content', desc: 'The revealed text content element' },
                  { part: 'canvas', desc: 'The overlay canvas overlay layer' },
                  { part: 'instructions', desc: 'The initial instructions overlay' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-gray-900">::part({row.part})</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic Scratch Reveal</h3>
            <pre className="code-block"><code>{`<uibit-scratch-reveal>
  <div>Discount Code: GOLD50</div>
</uibit-scratch-reveal>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Custom Theming</h3>
            <pre className="code-block"><code>{`<uibit-scratch-reveal 
  style="
    --uibit-scratch-reveal-width: 400px;
    --uibit-scratch-reveal-overlay-color: #333333;
    --uibit-scratch-reveal-background: #ffffff;
    --uibit-scratch-reveal-color: #000000;
  "
>
  <h3>WINNER!</h3>
</uibit-scratch-reveal>`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScratchRevealDocs;
