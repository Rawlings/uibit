import '@uibit/number-increment';
import manifest from '@uibit/number-increment/custom-elements.json';
import type { ComponentDocData } from '../../../types/docs';
import statsGrid from './examples/stats-grid';
import statsGridRaw from './examples/stats-grid?raw';
import withRepeat from './examples/with-repeat';
import withRepeatRaw from './examples/with-repeat?raw';

function NumberTickerDemo() {
  return (
    <div className="text-6xl font-bold text-gray-900 tracking-tight">
      <uibit-number-increment
        value={12800}
        duration={1800}
        locale="en-US"
        options={{
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }}
      ></uibit-number-increment>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...statsGrid, code: { react: statsGridRaw } },
  { ...withRepeat, code: { react: withRepeatRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: NumberTickerDemo,
  demoCode: {
    html: `<uibit-number-increment
  value="12800"
  duration="1800"
  locale="en-US"
  options='{"style":"currency","currency":"USD","maximumFractionDigits":0}'
></uibit-number-increment>`,
    react: `import '@uibit/number-increment';

function Demo() {
  return (
    <uibit-number-increment
      value={12800}
      duration={1800}
      locale="en-US"
      options={{
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }}
    />
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The resolved numeric value is rendered as static text when animation completes, ensuring screen readers announce the final number even when animations are skipped.',
      'An aria-label is applied to convey the fully formatted value.',
      'The IntersectionObserver-triggered animation does not block focus or alter DOM structure.',
    ],
  },
  features: [
    'IntersectionObserver triggers animation only when the element enters the viewport',
    'Three easing curves: ease-out (cubic), ease-in-out (quadratic), linear',
    'Locale-aware number formatting via Intl.NumberFormat options',
    'Support for custom formatter functions for advanced formatting overrides',
    'Configurable decimal places, start value, and duration',
    'repeat attribute re-animates every time the element re-enters the viewport',
    'rAF-based loop — never causes layout thrash on the main thread',
  ],
};

export default data;
