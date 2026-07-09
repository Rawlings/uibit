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

const withExport: UsageExample = {
  title: 'With Export',
  description: 'Draw a signature and export it as PNG or SVG using the component\'s built-in methods.',
  code: {
    html: `<uibit-signature-pad
  style="
    --uibit-signature-pad-height: 180px;
    --uibit-signature-pad-stroke-color: #111111;
    --uibit-signature-pad-stroke-width: 2.5px;
  "
></uibit-signature-pad>

<button id="clear">Clear</button>
<button id="export-png">Export PNG</button>
<button id="export-svg">Export SVG</button>

<script>
  const pad = document.querySelector('uibit-signature-pad');

  document.getElementById('clear').addEventListener('click', () => pad.clear());

  document.getElementById('export-png').addEventListener('click', () => {
    const dataUrl = pad.toDataURL();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'signature.png';
    a.click();
  });

  document.getElementById('export-svg').addEventListener('click', () => {
    const svg = pad.toSVG();
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'signature.svg';
    a.click();
  });
</script>`,
    react: `import { useRef } from 'react';
import '@uibit/signature-pad';

function SignaturePadWithExport() {
  const padRef = useRef(null);

  const handleClear = () => padRef.current?.clear();

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
    <div>
      <uibit-signature-pad
        ref={padRef}
        style={{
          '--uibit-signature-pad-height': '180px',
          '--uibit-signature-pad-stroke-color': '#111111',
          '--uibit-signature-pad-stroke-width': '2.5px',
        }}
      />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleExportPng}>Export PNG</button>
      <button onClick={handleExportSvg}>Export SVG</button>
    </div>
  );
}`,
  },
  Demo: WithExportDemo,
};

export default withExport;
