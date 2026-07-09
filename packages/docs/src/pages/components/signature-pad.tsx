import { useRef } from 'react';
import '@uibit/signature-pad';
import manifest from '@uibit/signature-pad/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function SignaturePadDemo() {
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
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-lg">
        <uibit-signature-pad
          ref={padRef}
          style={
            {
              '--uibit-signature-pad-height': '180px',
              '--uibit-signature-pad-stroke-color': '#111111',
              '--uibit-signature-pad-stroke-width': '2.5px',
            } as React.CSSProperties
          }
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
  );
}

const data: ComponentDocData = {
  id: 'signature-pad',
  title: 'Signature Pad',
  description:
    'A canvas drawing area that captures freehand signatures or messages using touch or mouse gestures, rendered immediately as smooth bezier-curved vector lines with simulated pen pressure.',
  packageName: '@uibit/signature-pad',
  tagName: 'uibit-signature-pad',
  manifest,
  Demo: SignaturePadDemo,
  usages: [
    {
      title: 'Basic',
      code: '<uibit-signature-pad></uibit-signature-pad>',
    },
    {
      title: 'Custom Labels (Slots)',
      code: `<uibit-signature-pad>
  <span slot="hint">Draw your signature below</span>
  <span slot="clear-label">Start over</span>
</uibit-signature-pad>`,
    },
    {
      title: 'Custom Theming',
      code: `<uibit-signature-pad
  style="
    --uibit-signature-pad-height: 240px;
    --uibit-signature-pad-stroke-color: #1d4ed8;
    --uibit-signature-pad-stroke-width: 3px;
    --uibit-signature-pad-border: 2px solid #1d4ed8;
    --uibit-signature-pad-border-radius: 4px;
  "
></uibit-signature-pad>`,
    },
    {
      title: 'Exporting',
      code: `const pad = document.querySelector('uibit-signature-pad');

// PNG data URL
const png = pad.toDataURL();

// Inline SVG string
const svg = pad.toSVG();

// Clear the canvas
pad.clear();`,
    },
    {
      title: 'Events',
      code: `pad.addEventListener('signature-change', (e) => {
  console.log('isEmpty:', e.detail.isEmpty);
  console.log('dataUrl:', e.detail.dataUrl);
});

pad.addEventListener('signature-clear', (e) => {
  console.log('was empty before:', e.detail.previouslyEmpty);
});`,
    },
  ],
};

export default data;
