import '@uibit/text-typing';
import manifest from '@uibit/text-typing/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import heroHeadline from './examples/hero-headline';
import heroHeadlineRaw from './examples/hero-headline?raw';
import oneShot from './examples/one-shot';
import oneShotRaw from './examples/one-shot?raw';

function TextTypingDemo() {
  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
          We help teams{' '}
          <uibit-text-typing
            type-speed="75"
            typo-rate="0.05"
            style={{ color: '#111827' }}
          >
            <span>ship faster.</span>
            <span>build better.</span>
            <span>scale confidently.</span>
            <span>move with clarity.</span>
          </uibit-text-typing>
        </h2>
      </div>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...heroHeadline, code: { react: heroHeadlineRaw } },
  { ...oneShot, code: { react: oneShotRaw } },
];

const data: ComponentDocData = {
  id: 'text-typing',
  title: 'Text Typing',
  description:
    'Headline text block that cycles through marketing phrases with a realistic typing and deleting animation. Includes speed variance, simulated auto-correcting typos, and a blinking cursor.',
  packageName: '@uibit/text-typing',
  tagName: 'uibit-text-typing',
  manifest,
  Demo: TextTypingDemo,
  demoCode: {
    html: `<h2>
  We help teams
  <uibit-text-typing type-speed="75" typo-rate="0.05">
    <span>ship faster.</span>
    <span>build better.</span>
    <span>scale confidently.</span>
    <span>move with clarity.</span>
  </uibit-text-typing>
</h2>`,
    react: `import '@uibit/text-typing';

function Hero() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
      We help teams{' '}
      <uibit-text-typing type-speed="75" typo-rate="0.05">
        <span>ship faster.</span>
        <span>build better.</span>
        <span>scale confidently.</span>
        <span>move with clarity.</span>
      </uibit-text-typing>
    </h2>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The blinking cursor element is marked aria-hidden so it is not narrated by screen readers.',
      'When loop="false" the component stops on the last phrase and the final text remains stable in the DOM.',
      'Typing animation respects prefers-reduced-motion and skips directly to the final phrase when motion is reduced.',
    ],
  },
  features: [
    'setTimeout state machine with typing, pause, delete, and inter-phrase pause phases',
    'Per-keystroke speed jitter (±40%) for organic, human-feeling motion',
    'Configurable typo rate injects wrong characters that immediately self-correct',
    'Blinking cursor node styled and paced entirely via CSS custom properties',
    'Cursor animation pauses between phrases to signal a natural break',
    'loop=false stops cleanly on the last phrase for one-shot animations',
  ],
};

export default data;
