import { useEffect, useState } from 'react';

function ABTestDocs() {
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  useEffect(() => {
    import('@uibit/ab-test');
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">A/B Test Component</h1>
        <p className="text-lg text-gray-600 mb-6">
          Harness component for A/B testing with automatic variant distribution and persistence.
        </p>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Live Demo</h2>
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            {selectedVariant && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                Selected variant: <span className="font-mono font-bold">{selectedVariant}</span>
              </div>
            )}
            <uibit-ab-test
              storage-key="demo-ab-test"
              onVariantRendered={(e: any) => setSelectedVariant(e.detail.variant)}
            >
              <div slot="variant-a" className="p-6 bg-purple-50 border-2 border-purple-200 rounded">
                <h3 className="text-2xl font-bold text-purple-900 mb-2">Variant A</h3>
                <p className="text-purple-700">This is version A of the component</p>
              </div>
              <div slot="variant-b" className="p-6 bg-blue-50 border-2 border-blue-200 rounded">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Variant B</h3>
                <p className="text-blue-700">This is version B of the component</p>
              </div>
            </uibit-ab-test>
          </div>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <code className="block bg-gray-100 p-4 rounded font-mono text-sm">
            pnpm add @uibit/ab-test
          </code>
        </section>

        <section className="mb-12 border-b pb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
{`import '@uibit/ab-test';

function MyApp() {
  return (
    <uibit-ab-test storage-key="my-test">
      <div slot="variant-a">
        <button>Sign Up Now</button>
      </div>
      <div slot="variant-b">
        <button>Get Started Free</button>
      </div>
    </uibit-ab-test>
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
                  <code className="font-mono text-primary-600">storage-key</code>
                  <p className="text-gray-600 text-sm mt-2">localStorage key for persistence</p>
                </div>
                <div className="border rounded p-4">
                  <code className="font-mono text-primary-600">variant-distribution</code>
                  <p className="text-gray-600 text-sm mt-2">Object with weights (e.g., {'{a: 50, b: 50}'})</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Events</h3>
              <div className="border rounded p-4">
                <code className="font-mono text-primary-600">variant-rendered</code>
                <p className="text-gray-600 text-sm mt-2">Fired with {'{variant, isNewUser}'} detail</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <ul className="space-y-3">
            {['Automatic variant distribution', 'localStorage persistence', 'Event dispatch on render', 'Weighted distributions', 'No external tracking', 'Lightweight and fast'].map((f, i) => (
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

export default ABTestDocs;
