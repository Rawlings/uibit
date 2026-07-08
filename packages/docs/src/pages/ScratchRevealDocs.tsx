import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '@uibit/scratch-reveal';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/scratch-reveal/custom-elements.json';

function ScratchRevealDocs() {
  const elementRef = useRef<any>(null);

  const handleReset = () => {
    if (elementRef.current) {
      elementRef.current.reset();
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Scratch Reveal</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Scratch Reveal
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          A gamified, accessible scratch-off panel component that reveals hidden content. Users can scratch off the overlay canvas layer by dragging or touching.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/scratch-reveal
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center gap-6">
          <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white shadow-md">
            {/* Component */}
            <uibit-scratch-reveal
              ref={elementRef}
              style={{
                '--uibit-scratch-reveal-width': '320px',
                '--uibit-scratch-reveal-height': '180px',
                '--uibit-scratch-reveal-background': '#ffffff',
                '--uibit-scratch-reveal-color': '#000000',
                '--uibit-scratch-reveal-overlay-color': '#cccccc',
              } as React.CSSProperties}
            >
              <div className="font-semibold text-lg">Antigravity Standard!</div>
            </uibit-scratch-reveal>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Reset Scratch Card
          </button>
        </div>
      </section>

      <ApiDocs manifest={manifest as any} tagName="uibit-scratch-reveal" />
      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic Scratch Reveal</h3>
            <pre className="code-block"><code>{`<uibit-scratch-reveal>
  <div>Discount Code: GOLD50</div>
</uibit-scratch-reveal>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Custom Theming</h3>
            <pre className="code-block"><code>{`<uibit-scratch-reveal 
  style="
    --uibit-scratch-reveal-width: 400px;
    --uibit-scratch-reveal-overlay-color: #333333;
    --uibit-scratch-reveal-background: #ffffff;
    --uibit-scratch-reveal-color: #000000;
  "
>
  <h3>WINNER!</h3>
</uibit-scratch-reveal>`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScratchRevealDocs;
