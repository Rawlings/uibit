import '@uibit/text-typing';
import manifest from '@uibit/text-typing/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function TextTypingDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        The headline below cycles through phrases with realistic typing and deletion:
      </p>
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
        <p className="text-gray-500 mt-4 text-sm">
          Slight speed variance and auto-correcting typos make the animation feel human.
        </p>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'text-typing',
  title: 'Text Typing',
  description:
    'Headline text block that cycles through marketing phrases with a realistic typing and deleting animation. Includes speed variance, simulated auto-correcting typos, and a blinking cursor.',
  packageName: '@uibit/text-typing',
  tagName: 'uibit-text-typing',
  manifest,
  Demo: TextTypingDemo,
  usages: [
    {
      title: 'HTML Integration',
      code: `<h1>
  We help teams
  <uibit-text-typing>
    <span>ship faster</span>
    <span>build better</span>
    <span>scale confidently</span>
  </uibit-text-typing>
</h1>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/text-typing';

function Hero() {
  return (
    <h1>
      We help teams
      <uibit-text-typing type-speed="80">
        <span>Ship faster</span>
        <span>Build better</span>
        <span>Scale confidently</span>
      </uibit-text-typing>
    </h1>
  );
}`,
    },
    {
      title: 'One-shot (no loop)',
      description: 'Run through all phrases once and stop on the last one.',
      code: `<uibit-text-typing
  loop="false"
  pause-after="3000"
>
  <span>Loading complete.</span>
  <span>Welcome back.</span>
</uibit-text-typing>`,
    },
    {
      title: 'Phrase Change Event',
      description: 'Sync other elements to the active phrase index.',
      code: `document.querySelector('uibit-text-typing').addEventListener('phrase-change', e => {
  console.log(e.detail.phrase, e.detail.index);
});`,
    },
  ],
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
