import { useEffect } from 'react';

function HotspotDocs() {
  useEffect(() => {
    import('@uibit/hotspot');
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotspot Component</h1>
        <p className="text-lg text-gray-600 mb-6">
          Add interactive hotspots to images that open popovers or trigger custom actions.
        </p>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <code className="block bg-gray-100 p-4 rounded font-mono text-sm">
            pnpm add @uibit/hotspot
          </code>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
{`import '@uibit/hotspot';

function ProductImage() {
  const hotspots = [
    { id: '1', x: 30, y: 40, label: 'Material' },
    { id: '2', x: 70, y: 60, label: 'Size' },
  ];

  return (
    <uibit-hotspot hotspots={hotspots}>
      <img src="product.jpg" alt="Product" />
    </uibit-hotspot>
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
                  <code className="font-mono text-primary-600">hotspots</code>
                  <p className="text-gray-600 text-sm mt-2">Array of hotspot objects with id, x, y, label properties</p>
                </div>
                <div className="border rounded p-4">
                  <code className="font-mono text-primary-600">interactive</code>
                  <p className="text-gray-600 text-sm mt-2">Enable/disable hotspot interactions (default: true)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Events</h3>
              <div className="border rounded p-4">
                <code className="font-mono text-primary-600">hotspot-click</code>
                <p className="text-gray-600 text-sm mt-2">Fired when a hotspot is clicked with the hotspot object as detail</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <ul className="space-y-3">
            {['Position hotspots with x/y coordinates', 'Custom labels and content', 'Click event handlers', 'Touch support on mobile', 'Keyboard accessible', 'Responsive scaling'].map((f, i) => (
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

export default HotspotDocs;
