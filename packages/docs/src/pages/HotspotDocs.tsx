import { Link } from 'react-router-dom';
import '@uibit/hotspot';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/hotspot/custom-elements.json';

function HotspotDocs() {

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
                src="https://picsum.photos/seed/headphones/800/450"
                alt="Premium over-ear headphones on a minimal surface"
                className="w-full rounded-lg"
              />
            </uibit-hotspot>
          </div>
        </div>
      </section>

      <ApiDocs manifest={manifest as any} tagName="uibit-hotspot" />

      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">HTML Example (with Composable Slots)</h3>
            <pre className="code-block"><code>{`<uibit-hotspot id="product-demo">
  <img src="product.jpg" alt="Product Image" />
  
  <!-- Slotted popover content for hotspot with id="1" -->
  <div slot="popover-1" class="p-2 text-center">
    <h4 style="margin: 0; font-weight: bold;">Zoom Lens</h4>
    <p style="margin: 4px 0 0 0; font-size: 0.8rem;">F/2.8 premium optic assembly.</p>
    <a href="/shop" style="color: black; text-decoration: underline; font-size: 0.75rem;">Shop Now</a>
  </div>
</uibit-hotspot>

<script>
  const widget = document.getElementById('product-demo');
  widget.hotspots = [
    { id: '1', x: 45, y: 55 }
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
