import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function SystemUpgradeDemo() {
  const [status, setStatus] = useState<'idle' | 'upgrading' | 'done'>('idle');

  const handleUpgrade = () => {
    setStatus('upgrading');
    setTimeout(() => {
      const trigger = document.getElementById('system-vortex-trigger') as any;
      if (trigger) trigger.ignite();
      setStatus('done');
    }, 1500);
  };

  const handleParticleCreate = (e: any) => {
    const clone = e.detail.particle;
    clone.innerHTML = `
      <svg viewBox="0 0 24 24" width="12" height="12" fill="#000000">
        <circle cx="12" cy="12" r="8" />
      </svg>
    `;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-sm mx-auto shadow-sm text-center relative">
      <uibit-effect-trigger
        id="system-vortex-trigger"
        trigger="custom"
        behavior="vortex-attractor"
        density={12}
        velocity="1.4s"
        randomize
        onUibitParticleCreate={handleParticleCreate}
      >
        <div slot="trigger" style={{ display: 'none' }}></div>
        <span slot="asset"></span>
      </uibit-effect-trigger>

      <h4 className="text-sm font-bold text-gray-900 mb-1">Server Core Cluster</h4>
      <p className="text-xs text-gray-500 mb-6">Upgrade nodes to the latest release bundle.</p>

      <div className="flex justify-center mb-6">
        <div className={`w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center transition-all ${
          status === 'upgrading' ? 'border-dashed border-black animate-spin' : status === 'done' ? 'bg-black text-white border-black' : 'bg-gray-50'
        }`}>
          {status === 'done' ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
          )}
        </div>
      </div>

      {status === 'upgrading' ? (
        <div className="text-xs text-gray-400 font-medium">Re-routing network paths...</div>
      ) : (
        <button
          onClick={handleUpgrade}
          className="w-full bg-black hover:bg-gray-900 text-white font-medium text-xs py-2 px-4 rounded transition-colors focus:outline-none"
        >
          {status === 'done' ? 'Upgrade Again' : 'Trigger Node Upgrade'}
        </button>
      )}
    </div>
  );
}

const systemUpgradeExample: UsageExample = {
  title: 'System Cluster Upgrade',
  description:
    'Simulates a cluster node synchronization where floating bundle blocks spiral inwards via the vortex attractor path toward the main server hub on upgrade success.',
  code: {
    html: '',
    react: '',
  },
  Demo: SystemUpgradeDemo,
};

export default systemUpgradeExample;
