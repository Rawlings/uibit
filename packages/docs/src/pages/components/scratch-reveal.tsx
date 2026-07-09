import { useRef } from 'react';
import '@uibit/scratch-reveal';
import manifest from '@uibit/scratch-reveal/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function ScratchRevealDemo() {
  const elementRef = useRef<any>(null);

  const handleReset = () => {
    if (elementRef.current) {
      elementRef.current.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white shadow-md">
        <uibit-scratch-reveal
          ref={elementRef}
          style={
            {
              '--uibit-scratch-reveal-width': '320px',
              '--uibit-scratch-reveal-height': '200px',
              '--uibit-scratch-reveal-background': '#ffffff',
              '--uibit-scratch-reveal-color': '#000000',
              '--uibit-scratch-reveal-overlay-color': '#b0b0b0',
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
            <span className="text-3xl">🎉</span>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              You've won
            </p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">30% OFF</p>
            <p className="text-sm text-gray-500">
              Use code <span className="font-mono font-bold text-gray-800">LUCKY30</span> at checkout
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Valid until midnight · One use per customer
            </p>
          </div>
        </uibit-scratch-reveal>
      </div>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Reset Scratch Card
      </button>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'scratch-reveal',
  title: 'Scratch Reveal',
  description:
    'A gamified, accessible scratch-off panel component that reveals hidden content. Users can scratch off the overlay canvas layer by dragging or touching.',
  packageName: '@uibit/scratch-reveal',
  tagName: 'uibit-scratch-reveal',
  manifest,
  Demo: ScratchRevealDemo,
  usages: [
    {
      title: 'Basic Scratch Reveal',
      code: `<uibit-scratch-reveal>
  <div>Discount Code: GOLD50</div>
</uibit-scratch-reveal>`,
    },
    {
      title: 'Custom Theming',
      code: `<uibit-scratch-reveal 
  style="
    --uibit-scratch-reveal-width: 400px;
    --uibit-scratch-reveal-overlay-color: #333333;
    --uibit-scratch-reveal-background: #ffffff;
    --uibit-scratch-reveal-color: #000000;
  "
>
  <h3>WINNER!</h3>
</uibit-scratch-reveal>`,
    },
  ],
};

export default data;
