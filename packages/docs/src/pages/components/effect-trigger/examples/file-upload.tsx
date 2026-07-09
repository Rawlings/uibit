import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function FileUploadDemo() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'complete'>('idle');

  const handleSelect = () => {
    setFileName('financial_report_q3.pdf');
    setStatus('idle');
  };

  const handleUpload = () => {
    setStatus('uploading');
    setTimeout(() => {
      setStatus('complete');
      const trigger = document.getElementById('file-upload-trigger') as any;
      if (trigger) trigger.ignite();
    }, 1500);
  };

  const handleParticleCreate = (e: any) => {
    const clone = e.detail.particle;
    clone.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#4b5563" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    `;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-sm mx-auto shadow-sm relative">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Document Drive</span>
        <div id="cloud-upload-target" className="text-gray-400 hover:text-black transition-colors">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 10a6 6 0 0 0-12 0 6 6 0 0 0-3 5.14A4.86 4.86 0 0 0 7.86 20h10.28A4.86 4.86 0 0 0 23 15.14 6 6 0 0 0 18 10z" />
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
          </svg>
        </div>
      </div>

      {!fileName ? (
        <button
          onClick={handleSelect}
          className="w-full border border-dashed border-gray-200 hover:border-black rounded-lg py-8 text-center text-xs text-gray-400 hover:text-black transition-all cursor-pointer focus:outline-none"
        >
          Select file for upload
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded p-2.5">
            <div className="flex items-center space-x-2">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-xs font-medium text-gray-700 truncate max-w-[180px]">{fileName}</span>
            </div>
            <button
              onClick={() => setFileName(null)}
              className="text-gray-400 hover:text-black text-xs"
              disabled={status === 'uploading'}
            >
              ✕
            </button>
          </div>

          {status === 'complete' ? (
            <div className="text-center py-2 text-xs font-bold text-gray-900">
              Upload finished successfully.
            </div>
          ) : (
            <uibit-effect-trigger
              id="file-upload-trigger"
              trigger="custom"
              velocity="1.2s"
              density={1}
              destination-selector="#cloud-upload-target"
              onUibitParticleCreate={handleParticleCreate}
              class="w-full"
            >
              <button
                onClick={handleUpload}
                disabled={status === 'uploading'}
                slot="trigger"
                className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium text-xs py-2 px-4 rounded transition-colors focus:outline-none"
              >
                {status === 'uploading' ? 'Syncing...' : 'Upload to Cloud'}
              </button>
              <span slot="asset"></span>
            </uibit-effect-trigger>
          )}
        </div>
      )}
    </div>
  );
}

const fileUploadExample: UsageExample = {
  title: 'Cloud Document Sync',
  description:
    'Sweeps a micro PDF vector document upwards from the action item directly into a cloud repository storage icon using the destination selector.',
  code: {
    html: `<uibit-effect-trigger trigger="custom" destination-selector="#cloud" density="1">
  <button slot="trigger">Upload file</button>
  <div slot="asset"></div>
</uibit-effect-trigger>`,
    react: '',
  },
  Demo: FileUploadDemo,
};

export default fileUploadExample;
