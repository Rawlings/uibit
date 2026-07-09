import { useEffect, useState, useRef } from 'react';
import '@uibit/ab-test';
import manifest from '@uibit/ab-test/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const AB_STORAGE_KEY = 'demo-ab-test-docs';

function ABTestDemo() {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [mountKey, setMountKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handle = (e: any) => setSelectedVariant(e.detail.variant);
    container.addEventListener('variant-rendered', handle);
    return () => container.removeEventListener('variant-rendered', handle);
  }, []);

  const forceVariant = (v: string) => {
    try {
      localStorage.setItem(AB_STORAGE_KEY, v);
    } catch (_) {}
    setSelectedVariant(v);
    setMountKey((k) => k + 1);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-600">Force variant:</span>
        <button
          onClick={() => forceVariant('a')}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            selectedVariant === 'a'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
          }`}
        >
          Variant A
        </button>
        <button
          onClick={() => forceVariant('b')}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            selectedVariant === 'b'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
          }`}
        >
          Variant B
        </button>
      </div>

      <div className="max-w-md" ref={containerRef}>
        <uibit-ab-test key={mountKey} storage-key={AB_STORAGE_KEY}>
          <div
            slot="variant-a"
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src="https://picsum.photos/seed/product-a/480/220"
              alt="Minimal desk setup"
              className="w-full object-cover"
              style={{ height: '160px' }}
            />
            <div className="p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                New Arrival
              </p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Arc Desk Lamp</h3>
              <p className="text-gray-500 text-sm mb-4">
                Warm-toned ambient light with touch dimming. Ships in 2 days.
              </p>
              <button className="w-full bg-gray-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-700 transition">
                Add to Cart — $89
              </button>
            </div>
          </div>
          <div
            slot="variant-b"
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src="https://picsum.photos/seed/product-b/480/220"
                alt="Minimal desk setup"
                className="w-full object-cover"
                style={{ height: '160px' }}
              />
              <span className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded">
                SALE 20% OFF
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                Best Seller
              </p>
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
    </div>
  );
}

const data: ComponentDocData = {
  id: 'ab-test',
  title: 'A/B Test',
  description:
    'A/B testing utility component for framework-agnostic experimentation. Integrates with storage keys for persistence and automatically assigns user variants.',
  packageName: '@uibit/ab-test',
  tagName: 'uibit-ab-test',
  manifest,
  Demo: ABTestDemo,
  usages: [
    {
      title: 'Basic Layout (HTML)',
      code: `<uibit-ab-test storage-key="hero-ab-test">
  <section slot="variant-a">Layout A</section>
  <section slot="variant-b">Layout B</section>
</uibit-ab-test>`,
    },
    {
      title: 'React Implementation',
      code: `import { useEffect, useRef } from 'react';
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
}`,
    },
  ],
  features: [
    'Automatic weight-based user variant assignments',
    'Saves variant locally to ensure user gets consistent layout on page reload',
    'Fully SSR/hydration safe (no server-side localstorage crashes)',
    'Dynamic property listener handles runtime updates reactively',
    'URL parameter overriding (?variant=b) to simplify debugging',
    'Standard slot integrations',
  ],
};

export default data;
