import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ScrollProgressDocs() {
  useEffect(() => {
    import('@uibit/scroll-progress');
  }, []);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Scroll Progress</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Scroll Progress
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          Lightweight, accessible scroll progress indicator. Tracks viewport scrolling by default, or can be targeting a specific scrollable element using selectors.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/scroll-progress
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Scroll inside the container below to see the local progress bar update at the top of the box:</p>
          
          <div 
            id="demo-scroll-box" 
            className="relative border border-gray-300 rounded-lg h-60 overflow-y-scroll bg-white shadow-inner"
            style={{ scrollbarWidth: 'thin' }}
          >
            {/* Scroll Progress Component anchored inside this container */}
            <uibit-scroll-progress target="#demo-scroll-box" color="#10b981" height={4}></uibit-scroll-progress>
            
            <div className="p-6 space-y-4">
              <h3 className="text-base font-semibold text-gray-900">Custom Container Scroll Demo</h3>
              <p className="text-sm text-gray-600">
                This is a scrollable container. Notice the green progress bar at the top of this box.
              </p>
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i} className="text-sm text-gray-600">
                  Paragraph {i + 1}: Scrolling down this card updates the scroll progress bar relative to this card's height rather than the full viewport window. This highlights the custom target-selector option of the component.
                </p>
              ))}
              <p className="text-sm font-semibold text-gray-800">You reached the bottom! Progress is now 100%.</p>
            </div>
          </div>
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
                  { prop: 'height', type: 'number', default: '4', desc: 'Height of the progress bar in pixels' },
                  { prop: 'color', type: 'string', default: '"#3b82f6"', desc: 'Background color of the progress bar fill' },
                  { prop: 'target', type: 'string', default: 'undefined', desc: 'CSS selector of the scroll container to observe. Defaults to window scrolling' },
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
      </section>

      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic Window Scrolling</h3>
            <pre className="code-block"><code>{`<uibit-scroll-progress color="#ef4444" height="5"></uibit-scroll-progress>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Custom Element Container Scrolling</h3>
            <pre className="code-block"><code>{`<!-- HTML container with overflow-y -->
<div id="scrollable-block" style="height: 300px; overflow-y: scroll; position: relative;">
  <uibit-scroll-progress target="#scrollable-block" color="#10b981"></uibit-scroll-progress>
  <div style="height: 1000px;">
    Lots of scrollable content...
  </div>
</div>`}</code></pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Tracks standard window viewport scrolling by default',
            'Fully supports tracking custom scroll containers via CSS selectors',
            'Correctly handles component attachment/removal, preventing scroll listener leaks',
            'GPU-accelerated reactive layout renders',
            'Full progressbar ARIA semantics for screen readers',
            'Supports dynamic color and height styling properties'
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

export default ScrollProgressDocs;
