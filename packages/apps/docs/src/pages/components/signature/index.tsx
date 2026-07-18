import { useRef } from 'react';
import '@uibit/signature';
import manifest from '@uibit/signature/custom-elements.json';
import type { ComponentDocData } from '../../../types/docs';
import withExport from './examples/with-export';
import withExportRaw from './examples/with-export?raw';
import customStyle from './examples/custom-style';
import customStyleRaw from './examples/custom-style?raw';

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
        <uibit-signature ref={padRef} />
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-gray-900 transition-colors"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleExportPng}
          className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Export PNG
        </button>
        <button
          type="button"
          onClick={handleExportSvg}
          className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Export SVG
        </button>
      </div>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...withExport, code: { react: withExportRaw } },
  { ...customStyle, code: { react: customStyleRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: SignaturePadDemo,
  demoCode: {
    html: `<uibit-signature></uibit-signature>`,
    react: `import { useRef } from 'react';
import '@uibit/signature';

function SignaturePadDemo() {
  const padRef = useRef(null);

  return (
    <uibit-signature
      ref={padRef}
    />
  );
}`,
  },
  examples: processedExamples,
  features: [
    'Smooth vector stroke drawing and smoothing',
    'Responsive canvas with automatic scale adjustments',
    'Customizable brush thickness and line colors',
    'Built-in data URI export methods',
    'Drawing start/change/end event callbacks',
  ],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The signature canvas uses role="img" with an aria-label of "Signature pad" to communicate its purpose to screen readers.',
      'Screen readers cannot interact with the drawing surface — consider pairing the component with a typed-name fallback field for fully accessible signature flows.',
      'External Clear and Export controls should carry descriptive accessible names (e.g. "Clear signature", "Export signature as PNG").',
    ],
  },
};

export default data;
