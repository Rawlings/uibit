import '@uibit/countdown';
import manifest from '@uibit/countdown/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import targetDateExample from './examples/target-date';
import targetDateRaw from './examples/target-date?raw';
import customLabelsExample from './examples/custom-labels';
import customLabelsRaw from './examples/custom-labels?raw';

function CountdownDemo() {
  const targetTime = new Date(Date.now() + 3600 * 1000 * 2.5).toISOString(); // 2.5 hours from now

  return (
    <uibit-countdown target={targetTime} auto-start format="HH:MM:SS"></uibit-countdown>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...targetDateExample, code: { react: targetDateRaw } },
  { ...customLabelsExample, code: { react: customLabelsRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: CountdownDemo,
  demoCode: {
    html: `<uibit-countdown target="2026-12-31T23:59:59" auto-start format="HH:MM:SS"></uibit-countdown>`,
    react: `import '@uibit/countdown';

function CountdownDemo() {
  const targetTime = new Date(Date.now() + 3600 * 1000 * 2.5).toISOString();

  return (
    <uibit-countdown target={targetTime} auto-start format="HH:MM:SS"></uibit-countdown>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The countdown region uses role="timer" and aria-live="polite" to announce time updates at screen-reader-appropriate intervals.',
      'Unit labels are rendered so screen readers read full unit names rather than abbreviations.',
      'Completion is announced with a polite live region update.',
    ],
  },
  features: [
    'Calculates offset once to prevent interval time drifting',
    'Internal count variables hidden from public API attributes',
    'Full support for customizable segment formatting (DD, HH, MM, SS)',
    'Polite ARIA live landmark alerts for screen readers',
    'Dynamic update hooks restart automatically when target date changes',
  ],
};

export default data;
