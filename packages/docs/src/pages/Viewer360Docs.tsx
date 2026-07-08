import { Link } from 'react-router-dom';
import '@uibit/360-viewer';

function Viewer360Docs() {

  const demoImages = [
    'https://placehold.co/600x400/3b82f6/white?text=Frame+1+ (Drag+ Me)',
    'https://placehold.co/600x400/10b981/white?text=Frame+2',
    'https://placehold.co/600x400/f59e0b/white?text=Frame+3',
    'https://placehold.co/600x400/ef4444/white?text=Frame+4+ (Keep+ Dragging)',
    'https://placehold.co/600x400/8b5cf6/white?text=Frame+5',
    'https://placehold.co/600x400/ec4899/white?text=Frame+6',
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
          <span className="text-gray-900 font-medium">360-Viewer</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          360-Viewer
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          Interactive 360-degree image viewer component. Display products and objects from every angle with smooth mouse/touch dragging, auto-rotation, and preloading.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/360-viewer
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Drag the image or use the buttons/arrow keys to rotate the 360 view:</p>
          <div className="max-w-xl mx-auto bg-white rounded-lg p-4 border border-gray-200">
            <uibit-360-viewer 
              images={JSON.stringify(demoImages)} 
              auto-rotate="true" 
              rotation-speed={150}
            ></uibit-360-viewer>
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
                  { prop: 'images', type: 'string[]', default: '[]', desc: 'Array of image source URLs representing the 360 frames' },
                  { prop: 'autoRotate', type: 'boolean', default: 'false', desc: 'Automatically rotate the image frames' },
                  { prop: 'rotationSpeed', type: 'number', default: '150', desc: 'Rotation cycle speed per frame in milliseconds' },
                  { prop: 'dragSensitivity', type: 'number', default: '15', desc: 'Horizontal drag distance in pixels to trigger next/prev frame' },
                  { prop: 'showControls', type: 'boolean', default: 'true', desc: 'Show interactive left/right overlay buttons' },
                  { prop: 'showProgressBar', type: 'boolean', default: 'true', desc: 'Show index progress bar at the bottom' },
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
          {/* HTML Integration */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">HTML Example</h3>
            <pre className="code-block"><code>{`<uibit-360-viewer id="product-viewer" auto-rotate="true" rotation-speed="200"></uibit-360-viewer>

<script>
  const viewer = document.getElementById('product-viewer');
  viewer.images = [
    'frame-1.jpg',
    'frame-2.jpg',
    'frame-3.jpg',
    'frame-4.jpg'
  ];
</script>`}</code></pre>
          </div>

          {/* React Integration */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">React Integration</h3>
            <pre className="code-block"><code>{`import '@uibit/360-viewer';

function ProductView() {
  const images = ['frame-1.jpg', 'frame-2.jpg', 'frame-3.jpg', 'frame-4.jpg'];

  return (
    <uibit-360-viewer 
      images={JSON.stringify(images)} 
      auto-rotate="true" 
      rotation-speed={150}
    />
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
            'Smooth pointer tracking for swipe and drag actions',
            'Preloads adjacent frames to prevent visual flickering',
            'Automatic rotation with automatic pause on user drag and 2s idle resume',
            'Standard keyboard navigation using ArrowLeft and ArrowRight',
            'Glassmorphic overlay navigation controls',
            'Progress tracking bar showing active frame ratio',
            'Aria-compatible landmarks and labels'
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

export default Viewer360Docs;
