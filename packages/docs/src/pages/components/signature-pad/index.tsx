import { useRef } from 'react';
import '@uibit/signature-pad';
import manifest from '@uibit/signature-pad/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import withExport from './examples/with-export';
import customStyle from './examples/custom-style';

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
  demoCode: {
    html: `<uibit-signature-pad
  style="
    --uibit-signature-pad-height: 180px;
    --uibit-signature-pad-stroke-color: #111111;
    --uibit-signature-pad-stroke-width: 2.5px;
  "
></uibit-signature-pad>`,
    react: `import { useRef } from 'react';
import '@uibit/signature-pad';

function SignaturePadDemo() {
  const padRef = useRef(null);

  return (
    <uibit-signature-pad
      ref={padRef}
      style={{
        '--uibit-signature-pad-height': '180px',
        '--uibit-signature-pad-stroke-color': '#111111',
        '--uibit-signature-pad-stroke-width': '2.5px',
      }}
    />
  );
}`,
  },
  examples: [withExport, customStyle],
};

export default data;
