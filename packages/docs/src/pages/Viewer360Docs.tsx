import { useEffect, useRef } from 'react';

function Viewer360Docs() {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    import('@uibit/360-viewer');
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">360-Viewer Component</h1>
        <p className="text-lg text-gray-600 mb-6">
          Display 360-degree product rotations with multiple images and full touch support.
        </p>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Live Demo</h2>
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <style>{`
              uibit-360-viewer {
                --viewer-bg: #f9fafb;
                --viewer-border: #e5e7eb;
              }
            `}</style>
            <uibit-360-viewer ref={viewerRef}>
              <div style={{
                width: '100%',
                height: '400px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                Product View 1
              </div>
              <div style={{
                width: '100%',
                height: '400px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                Product View 2
              </div>
              <div style={{
                width: '100%',
                height: '400px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                Product View 3
              </div>
            </uibit-360-viewer>
          </div>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <code className="block bg-gray-100 p-4 rounded font-mono text-sm">
            pnpm add @uibit/360-viewer
          </code>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">API Reference</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Properties</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left px-4 py-2 font-semibold">Property</th>
                      <th className="text-left px-4 py-2 font-semibold">Type</th>
                      <th className="text-left px-4 py-2 font-semibold">Default</th>
                      <th className="text-left px-4 py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-mono">autoRotate</td>
                      <td className="px-4 py-2 font-mono text-sm">boolean</td>
                      <td className="px-4 py-2 font-mono text-sm">false</td>
                      <td className="px-4 py-2">Enable automatic rotation</td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                      <td className="px-4 py-2 font-mono">rotationSpeed</td>
                      <td className="px-4 py-2 font-mono text-sm">number</td>
                      <td className="px-4 py-2 font-mono text-sm">100</td>
                      <td className="px-4 py-2">Speed of rotation (ms per image)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-mono">allowZoom</td>
                      <td className="px-4 py-2 font-mono text-sm">boolean</td>
                      <td className="px-4 py-2 font-mono text-sm">true</td>
                      <td className="px-4 py-2">Enable zoom controls</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
{`import '@uibit/360-viewer';

function ProductView() {
  return (
    <uibit-360-viewer autoRotate rotationSpeed={150}>
      <img src="view-1.jpg" alt="View 1" />
      <img src="view-2.jpg" alt="View 2" />
      <img src="view-3.jpg" alt="View 3" />
    </uibit-360-viewer>
  );
}`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <ul className="space-y-3">
            {[
              'Image rotation via mouse drag or touch swipe',
              'Auto-play for hands-free rotation',
              'Pinch-to-zoom on touch devices',
              'Fully responsive design',
              'Keyboard navigation support',
              'ARIA labels for accessibility'
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary-600 font-bold mt-0.5">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Viewer360Docs;
