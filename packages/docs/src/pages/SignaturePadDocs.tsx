import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '@uibit/signature-pad';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/signature-pad/custom-elements.json';

function SignaturePadDocs() {
  const padRef = useRef<any>(null);

  const handleClear = () => {
    padRef.current?.clear();
  };

  const handleExportPng = () => {
    const dataUrl = padRef.current?.toDataURL();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'signature.png';
    a.click();
  };

  const handleExportSvg = () => {
    const svg = padRef.current?.toSVG();
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'signature.svg';
    a.click();
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
          <span className="text-gray-900 font-medium">Signature Pad</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Signature Pad
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          A canvas drawing area that captures freehand signatures or messages using touch or mouse gestures, rendered immediately as smooth bezier-curved vector lines with simulated pen pressure.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/signature-pad
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-lg">
            <uibit-signature-pad
              ref={padRef}
              style={{
                '--uibit-signature-pad-height': '180px',
                '--uibit-signature-pad-stroke-color': '#111111',
                '--uibit-signature-pad-stroke-width': '2.5px',
              } as React.CSSProperties}
            />
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-gray-900 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleExportPng}
              className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Export PNG
            </button>
            <button
              onClick={handleExportSvg}
              className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Export SVG
            </button>
          </div>
        </div>
      </section>

      <ApiDocs manifest={manifest as any} tagName="uibit-signature-pad" />

      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic</h3>
            <pre className="code-block"><code>{`<uibit-signature-pad></uibit-signature-pad>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Custom Labels (Slots)</h3>
            <pre className="code-block"><code>{`<uibit-signature-pad>
  <span slot="hint">Draw your signature below</span>
  <span slot="clear-label">Start over</span>
</uibit-signature-pad>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Custom Theming</h3>
            <pre className="code-block"><code>{`<uibit-signature-pad
  style="
    --uibit-signature-pad-height: 240px;
    --uibit-signature-pad-stroke-color: #1d4ed8;
    --uibit-signature-pad-stroke-width: 3px;
    --uibit-signature-pad-border: 2px solid #1d4ed8;
    --uibit-signature-pad-border-radius: 4px;
  "
></uibit-signature-pad>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Exporting</h3>
            <pre className="code-block"><code>{`const pad = document.querySelector('uibit-signature-pad');

// PNG data URL
const png = pad.toDataURL();

// Inline SVG string
const svg = pad.toSVG();

// Clear the canvas
pad.clear();`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Events</h3>
            <pre className="code-block"><code>{`pad.addEventListener('signature-change', (e) => {
  console.log('isEmpty:', e.detail.isEmpty);
  console.log('dataUrl:', e.detail.dataUrl);
});

pad.addEventListener('signature-clear', (e) => {
  console.log('was empty before:', e.detail.previouslyEmpty);
});`}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignaturePadDocs;
