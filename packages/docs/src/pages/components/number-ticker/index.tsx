import '@uibit/number-ticker';
import manifest from '@uibit/number-ticker/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import statsGrid from './examples/stats-grid';
import statsGridRaw from './examples/stats-grid?raw';
import withRepeat from './examples/with-repeat';
import withRepeatRaw from './examples/with-repeat?raw';

function NumberTickerDemo() {
  return (
    <div className="text-6xl font-bold text-gray-900 tracking-tight">
      <uibit-number-ticker
        value={12800}
        duration={1800}
        locale="en-US"
        options={{
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }}
      ></uibit-number-ticker>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...statsGrid, code: { react: statsGridRaw } },
  { ...withRepeat, code: { react: withRepeatRaw } },
];

const data: ComponentDocData = {
  id: 'number-ticker',
  title: 'Number Ticker',
  description:
    'Intersection-aware numeric counter that animates to a target value with easing curves, locale-aware formatting, and custom formatter function overrides. Triggers once the element scrolls into the viewport.',
  packageName: '@uibit/number-ticker',
  tagName: 'uibit-number-ticker',
  manifest,
  Demo: NumberTickerDemo,
  demoCode: {
    html: `<uibit-number-ticker
  value="12800"
  duration="1800"
  locale="en-US"
  options='{"style":"currency","currency":"USD","maximumFractionDigits":0}'
></uibit-number-ticker>`,
    react: `import '@uibit/number-ticker';

function Demo() {
  return (
    <uibit-number-ticker
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
