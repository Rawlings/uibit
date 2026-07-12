import { useRef } from 'react';
import '@uibit/scratch-reveal';
import manifest from '@uibit/scratch-reveal/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import discountCard from './examples/discount-card';
import discountCardRaw from './examples/discount-card?raw';
import darkOverlay from './examples/dark-overlay';
import darkOverlayRaw from './examples/dark-overlay?raw';

function ScratchRevealDemo() {
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
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
          <span className="text-3xl">🎉</span>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">You've won</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">30% OFF</p>
          <p className="text-sm text-gray-500">
            Use code <span className="font-mono font-bold text-gray-800">LUCKY30</span> at checkout
          </p>
        </div>
      </uibit-scratch-reveal>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...discountCard, code: { react: discountCardRaw } },
  { ...darkOverlay, code: { react: darkOverlayRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: ScratchRevealDemo,
  demoCode: {
    html: `<uibit-scratch-reveal>
  <div>
    <p>You've won</p>
    <p>30% OFF</p>
    <p>Use code LUCKY30 at checkout</p>
  </div>
</uibit-scratch-reveal>`,
    react: `import { useRef } from 'react';
import '@uibit/scratch-reveal';

function ScratchRevealDemo() {
  const elementRef = useRef(null);

  const handleReset = () => {
    if (elementRef.current) {
      elementRef.current.reset();
    }
  };

  return (
    <div>
      <uibit-scratch-reveal
        ref={elementRef}
      >
        <div>
          <p>You've won</p>
          <p>30% OFF</p>
          <p>Use code LUCKY30 at checkout</p>
        </div>
      </uibit-scratch-reveal>
      <button onClick={handleReset}>Reset Scratch Card</button>
    </div>
  );
}`,
  },
  examples: processedExamples,
  features: [
    'Canvas-based scratching layer',
    'Customizable brush size and cover configuration',
    'Completion percentage threshold events',
    'Responsive canvas resizing',
    'Custom scratch cursor styling support'
  ],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The canvas overlay does not expose its drawn state to accessibility trees — the revealed content slot carries all semantic context for screen readers.',
      'A scratch-complete event fires when the reveal threshold is reached; use it to announce the revealed content via a polite live region.',
      'The component does not provide a keyboard-driven scratch alternative — pair it with a visible "Reveal" button for keyboard-only users.',
    ],
  },
};

export default data;
