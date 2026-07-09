import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function PaymentSuccessDemo() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      const trigger = document.getElementById('payment-success-trigger') as any;
      if (trigger) trigger.ignite();
    }, 1200);
  };

  const handleParticleCreate = (e: any) => {
    const clone = e.detail.particle;
    clone.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#000000" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    `;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-sm mx-auto shadow-sm text-center relative">
      <uibit-effect-trigger
        id="payment-success-trigger"
        trigger="custom"
        behavior="orbit-halo"
        density={8}
        velocity="1.2s"
        randomize
        onUibitParticleCreate={handleParticleCreate}
      >
        <div slot="trigger" style={{ display: 'none' }}></div>
        <span slot="asset"></span>
      </uibit-effect-trigger>

      <div className="mb-4">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1">Invoice #8809</span>
        <div className="text-2xl font-bold text-gray-900">$99.00</div>
      </div>

      {status === 'success' ? (
        <div className="py-4 flex flex-col items-center">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="text-xs font-bold text-gray-900">Payment completed</div>
          <p className="text-xs text-gray-500 mt-0.5">Receipt sent to billing email.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-xs font-semibold text-gray-400 hover:text-black transition-colors"
          >
            Reset Payment
          </button>
        </div>
      ) : (
        <button
          onClick={handlePay}
          disabled={status === 'processing'}
          className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium text-xs py-2.5 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {status === 'processing' ? 'Processing...' : 'Pay $99.00'}
        </button>
      )}
    </div>
  );
}

const paymentSuccessExample: UsageExample = {
  title: 'Financial Payment Success',
  description:
    'Fires a circular halo of micro checkmarks when a mock invoice credit card payment transaction resolves successfully.',
  code: {
    html: `<uibit-effect-trigger trigger="custom" behavior="orbit-halo" density="8">
  <button slot="trigger" style="display:none"></button>
</uibit-effect-trigger>`,
    react: '',
  },
  Demo: PaymentSuccessDemo,
};

export default paymentSuccessExample;
