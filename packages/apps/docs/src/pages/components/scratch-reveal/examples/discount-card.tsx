import { useRef } from 'react';
import '@uibit/scratch-reveal';
import type { UsageExample } from '../../../../types/docs';

function DiscountCardDemo() {
  const elementRef = useRef<any>(null);

  const handleReset = () => {
    if (elementRef.current) {
      elementRef.current.reset();
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
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
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            30% OFF
          </p>
          <p className="text-sm text-gray-500">
            Use code{' '}
            <span className="font-mono font-bold text-gray-800">LUCKY30</span>{' '}
            at checkout
          </p>
        </div>
      </uibit-scratch-reveal>

      <button
        type="button"
        onClick={handleReset}
        className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}

const discountCard: UsageExample = {
  title: 'Discount Card',
  description:
    'A promotional scratch card that reveals a discount code with a reset button.',
  Demo: DiscountCardDemo,
};

export default discountCard;
