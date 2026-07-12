import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function FlyToCartDemo() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col justify-between shadow-sm max-w-sm mx-auto relative overflow-hidden">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-6">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Minimalist Shop</span>
        <div
          id="premium-cart-target"
          className="flex items-center space-x-1.5 bg-black py-1 px-3 rounded-full text-xs font-bold text-white transition-all hover:bg-gray-900"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="font-mono">{cartCount}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full h-36 bg-gray-50 rounded-md flex items-center justify-center mb-4 border border-gray-100">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e5e7eb" strokeWidth="1">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <div className="text-center mb-6">
          <h5 className="text-sm font-bold text-gray-900">Serene Ceramic Cup</h5>
          <p className="text-xs text-gray-500 font-mono mt-0.5">$32.00</p>
        </div>

        <uibit-effect-trigger
          trigger="click"
          density={1}
          velocity="750ms"
          destination-selector="#premium-cart-target"
        >
          <button
            onClick={() => setCartCount((prev) => prev + 1)}
            slot="trigger"
            className="w-full bg-black hover:bg-gray-900 text-white font-medium text-xs py-2 px-8 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Add to Bag
          </button>
          
          <div slot="asset" className="w-2.5 h-2.5 bg-black rounded-full shadow-md"></div>
        </uibit-effect-trigger>
      </div>
    </div>
  );
}

const flyToCartExample: UsageExample = {
  title: 'Add-to-Bag Flyover',
  description:
    'Perfect for high-end e-commerce sites, this curves a clean minimalist vector particle directly into the header bag widget using destination selectors.',
  Demo: FlyToCartDemo,
};

export default flyToCartExample;
