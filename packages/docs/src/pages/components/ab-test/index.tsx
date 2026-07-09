import { useEffect, useState, useRef } from 'react';
import '@uibit/ab-test';
import manifest from '@uibit/ab-test/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import basicExample from './examples/basic';
import basicRaw from './examples/basic?raw';
import eventTrackingExample from './examples/event-tracking';
import eventTrackingRaw from './examples/event-tracking?raw';

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
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors cursor-pointer ${
            selectedVariant === 'a'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
          }`}
        >
          Variant A
        </button>
        <button
          onClick={() => forceVariant('b')}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors cursor-pointer ${
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
          <div slot="variant-a" className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <img src="https://picsum.photos/seed/product-a/480/220" alt="Minimal desk setup" className="w-full object-cover" style={{ height: '160px' }} />
            <div className="p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">New Arrival</p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Arc Desk Lamp</h3>
              <p className="text-gray-500 text-sm mb-4">Warm-toned ambient light with touch dimming. Ships in 2 days.</p>
              <button className="w-full bg-gray-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-700 transition cursor-pointer">Add to Cart — $89</button>
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
              <p className="text-gray-500 text-sm mb-4"><span className="line-through text-gray-400 mr-1">$89</span><span className="text-gray-900 font-semibold">$71</span> — Limited stock.</p>
              <button className="w-full border border-gray-900 text-gray-900 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-900 hover:text-white transition cursor-pointer">Claim Offer</button>
            </div>
          </div>
        </uibit-ab-test>
      </div>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...basicExample, code: { react: basicRaw } },
  { ...eventTrackingExample, code: { react: eventTrackingRaw } },
];

const data: ComponentDocData = {
  id: 'ab-test',
  title: 'A/B Test',
  description: 'A/B testing utility component for framework-agnostic experimentation. Integrates with storage keys for persistence and automatically assigns user variants.',
  packageName: '@uibit/ab-test',
  tagName: 'uibit-ab-test',
  manifest,
  Demo: ABTestDemo,
  demoCode: {
    html: `<uibit-ab-test storage-key="demo-ab-test-docs">
  <div slot="variant-a">
    <!-- Variant A content -->
    <img src="https://picsum.photos/seed/product-a/480/220" alt="Minimal desk setup" />
    <div>
      <p>New Arrival</p>
      <h3>Arc Desk Lamp</h3>
      <p>Warm-toned ambient light with touch dimming. Ships in 2 days.</p>
      <button>Add to Cart — $89</button>
    </div>
  </div>
  <div slot="variant-b">
    <!-- Variant B content -->
    <img src="https://picsum.photos/seed/product-b/480/220" alt="Minimal desk setup" />
    <span>SALE 20% OFF</span>
    <div>
      <p>Best Seller</p>
      <h3>Arc Desk Lamp</h3>
      <p><s>$89</s> $71 — Limited stock.</p>
      <button>Claim Offer</button>
    </div>
  </div>
</uibit-ab-test>`,
    react: `import { useEffect, useState, useRef } from 'react';
import '@uibit/ab-test';

const AB_STORAGE_KEY = 'demo-ab-test-docs';

function ABTestDemo() {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [mountKey, setMountKey] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handle = (e) => setSelectedVariant(e.detail.variant);
    container.addEventListener('variant-rendered', handle);
    return () => container.removeEventListener('variant-rendered', handle);
  }, []);

  const forceVariant = (v) => {
    localStorage.setItem(AB_STORAGE_KEY, v);
    setSelectedVariant(v);
    setMountKey((k) => k + 1);
  };

  return (
    <div>
      <div>
        <button onClick={() => forceVariant('a')}>Variant A</button>
        <button onClick={() => forceVariant('b')}>Variant B</button>
      </div>
      <div ref={containerRef}>
        <uibit-ab-test key={mountKey} storage-key={AB_STORAGE_KEY}>
          <div slot="variant-a">Variant A content</div>
          <div slot="variant-b">Variant B content</div>
        </uibit-ab-test>
      </div>
    </div>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The active variant slot is visible in the DOM while the inactive slot is hidden via display:none, preventing screen readers from announcing hidden content.',
      'No ARIA roles are added to the host element — slotted variant content is responsible for carrying its own semantic markup and ARIA attributes.',
      'Storage-key persistence ensures users consistently see the same variant, preventing disorienting layout shifts on repeat visits.',
    ],
  },
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
