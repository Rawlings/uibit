import { useRef } from 'react';
import '@uibit/signature-pad';
import { UsageExample } from '../../../../types/docs';

function WithExportDemo() {
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

const withExport: UsageExample = {
  title: 'With Export',
  description: 'Draw a signature and export it as PNG or SVG using the component\'s built-in methods.',
  Demo: WithExportDemo,
};

export default withExport;
