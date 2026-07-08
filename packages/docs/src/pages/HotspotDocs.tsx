import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function HotspotDocs() {
  useEffect(() => {
    import('@uibit/hotspot');
  }, []);

  const hotspots = [
    { 
      id: '1', 
      x: 25, 
      y: 35, 
      label: 'High-Fidelity Drivers', 
      title: 'High-Fidelity Drivers', 
      content: 'Custom acoustic chambers deliver deep bass, ultra-low distortion, and crisp high frequencies.' 
    },
    { 
      id: '2', 
      x: 70, 
      y: 45, 
      label: 'Memory Foam Cushioning', 
      title: 'Memory Foam Cushioning', 
      content: 'Wrapped in breathable mesh and soft memory foam for all-day comfort without ear fatigue.' 
    },
    { 
      id: '3', 
      x: 48, 
      y: 75, 
      label: 'Adaptive ANC Microphone', 
      title: 'Adaptive ANC Microphone', 
      content: 'Continuously monitors ambient noise to cancel sound or enable transparency mode.' 
    }
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Hotspot</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Hotspot
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          Interactive hotspot annotations for images. Display contextual tooltip cards on click or hover with custom content overlays and animations.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/hotspot
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Click the blinking pulse triggers below to open the annotation details:</p>
          <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-2 overflow-hidden shadow-sm">
            <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="click">
              <img 
                src="https://placehold.co/800x450/f3f4f6/1f2937?text=Premium+Headphones+Showcase" 
                alt="Product showcase"
                className="w-full rounded-lg"
              />
            </uibit-hotspot>
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
                  { prop: 'hotspots', type: 'HotspotItem[]', default: '[]', desc: 'Array of hotspots with id, x, y, label, title, content' },
                  { prop: 'interactive', type: 'boolean', default: 'true', desc: 'Enables interactive pulse highlights and popover activations' },
                  { prop: 'trigger', type: '"click" | "hover"', default: '"click"', desc: 'Action trigger to show tooltips: on click or mouse hover' },
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">HTML Example</h3>
            <pre className="code-block"><code>{`<uibit-hotspot id="product-demo" trigger="hover">
  <img src="product.jpg" alt="Product Image" />
</uibit-hotspot>

<script>
  const widget = document.getElementById('product-demo');
  widget.hotspots = [
    { id: '1', x: 45, y: 55, title: 'Zoom Lens', content: 'F/2.8 premium optic assembly.' }
  ];
</script>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">React Example</h3>
            <pre className="code-block"><code>{`import '@uibit/hotspot';

function ProductShowcase() {
  const points = [
    { id: '1', x: 30, y: 40, title: 'Material', content: 'Sustainable bamboo fibers' }
  ];

  return (
    <uibit-hotspot hotspots={JSON.stringify(points)}>
      <img src="bamboo-cup.jpg" alt="Bamboo Cup" />
    </uibit-hotspot>
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
            'Position coordinates with responsive percentage scales',
            'Pulse beacon animations to naturally draw attention',
            'Frictionless click and hover tooltip activations',
            'Keyboard focusability and Escape dismissals built-in',
            'Glassmorphic tooltip styling with pointer orientation offsets',
            'Screen-reader compatible ARIA mapping'
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

export default HotspotDocs;
