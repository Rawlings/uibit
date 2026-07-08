import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '@uibit/ab-test';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/ab-test/custom-elements.json';

function ABTestDocs() {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const abTestRef = useRef<any>(null);

  useEffect(() => {
    const element = abTestRef.current;
    if (element) {
      const handleVariant = (e: any) => {
        setSelectedVariant(e.detail.variant);
      };
      element.addEventListener('variant-rendered', handleVariant);
      return () => {
        element.removeEventListener('variant-rendered', handleVariant);
      };
    }
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
          <span className="text-gray-900 font-medium">A/B Test</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          A/B Test
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          A/B testing utility component for framework-agnostic experimentation. Integrates with storage keys for persistence and automatically assigns user variants.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/ab-test
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          {selectedVariant && (
            <div className="mb-4 p-3 bg-white border border-gray-200 rounded text-sm max-w-md shadow-sm">
              Assigned Variant State: <span className="font-mono font-bold text-blue-600">{selectedVariant.toUpperCase()}</span>
            </div>
          )}
          
          <div className="max-w-md">
            <uibit-ab-test
              ref={abTestRef}
              storage-key="demo-ab-test-docs"
            >
              <div slot="variant-a" className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/product-a/480/220" alt="Minimal desk setup" className="w-full object-cover" style={{ height: '160px' }} />
                <div className="p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">New Arrival</p>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Arc Desk Lamp</h3>
                  <p className="text-gray-500 text-sm mb-4">Warm-toned ambient light with touch dimming. Ships in 2 days.</p>
                  <button className="w-full bg-gray-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-700 transition">
                    Add to Cart — $89
                  </button>
                </div>
              </div>
              <div slot="variant-b" className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img src="https://picsum.photos/seed/product-b/480/220" alt="Minimal desk setup" className="w-full object-cover" style={{ height: '160px' }} />
                  <span className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded">SALE 20% OFF</span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Best Seller</p>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Arc Desk Lamp</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    <span className="line-through text-gray-400 mr-1">$89</span>
                    <span className="text-gray-900 font-semibold">$71</span> — Limited stock.
                  </p>
                  <button className="w-full border border-gray-900 text-gray-900 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-900 hover:text-white transition">
                    Claim Offer
                  </button>
                </div>
              </div>
            </uibit-ab-test>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 leading-relaxed max-w-md">
            Tip: Clear your local storage or add <code className="bg-gray-100 px-1 font-mono">?variant=b</code> to the URL query parameters to force select and test a specific variant layout!
          </p>
        </div>
      </section>

      {/* API Reference */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
      <ApiDocs manifest={manifest as any} tagName="uibit-ab-test" />
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic Layout (HTML)</h3>
            <pre className="code-block"><code>{`<uibit-ab-test storage-key="hero-ab-test">
  <section slot="variant-a">Layout A</section>
  <section slot="variant-b">Layout B</section>
</uibit-ab-test>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">React Implementation</h3>
            <pre className="code-block"><code>{`import { useEffect, useRef } from 'react';
import '@uibit/ab-test';

function BannerTest() {
  const abRef = useRef(null);

  useEffect(() => {
    const el = abRef.current;
    const onRender = (e) => {
      console.log('Variant assigned:', e.detail.variant);
    };
    el?.addEventListener('variant-rendered', onRender);
    return () => el?.removeEventListener('variant-rendered', onRender);
  }, []);

  return (
    <uibit-ab-test ref={abRef} storage-key="banner-variant">
      <div slot="variant-a">Design A</div>
      <div slot="variant-b">Design B</div>
    </uibit-ab-test>
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
            'Automatic weight-based user variant assignments',
            'Saves variant locally to ensure user gets consistent layout on page reload',
            'Fully SSR/hydration safe (no server-side localstorage crashes)',
            'Dynamic property listener handles runtime updates reactively',
            'URL parameter overriding (?variant=b) to simplify debugging',
            'Standard slot integrations'
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

export default ABTestDocs;
