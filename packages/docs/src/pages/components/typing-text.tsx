import '@uibit/typing-text';
import manifest from '@uibit/typing-text/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function TypingTextDemo() {
  const phrases = JSON.stringify([
    'ship faster.',
    'build better.',
    'scale confidently.',
    'move with clarity.',
  ]);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        The headline below cycles through phrases with realistic typing and deletion:
      </p>
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
          We help teams{' '}
          <uibit-typing-text
            phrases={phrases}
            type-speed="75"
            typo-rate="0.05"
            style={{ color: '#111827' }}
          ></uibit-typing-text>
        </h2>
        <p className="text-gray-500 mt-4 text-sm">
          Slight speed variance and auto-correcting typos make the animation feel human.
        </p>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'typing-text',
  title: 'Typing Text',
  description:
    'Headline text block that cycles through marketing phrases with a realistic typing and deleting animation. Includes speed variance, simulated auto-correcting typos, and a blinking cursor.',
  packageName: '@uibit/typing-text',
  tagName: 'uibit-typing-text',
  manifest,
  Demo: TypingTextDemo,
  usages: [
    {
      title: 'HTML Integration',
      code: `<h1>
  We help teams
  <uibit-typing-text
    phrases='["ship faster", "build better", "scale confidently"]'
  ></uibit-typing-text>
</h1>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/typing-text';

const phrases = JSON.stringify(['Ship faster', 'Build better', 'Scale confidently']);

function Hero() {
  return (
    <h1>
      We help teams <uibit-typing-text phrases={phrases} type-speed="80" />
    </h1>
  );
}`,
    },
    {
      title: 'One-shot (no loop)',
      description: 'Run through all phrases once and stop on the last one.',
      code: `<uibit-typing-text
  phrases='["Loading complete.", "Welcome back."]'
  loop="false"
  pause-after="3000"
></uibit-typing-text>`,
    },
    {
      title: 'Phrase Change Event',
      description: 'Sync other elements to the active phrase index.',
      code: `document.querySelector('uibit-typing-text').addEventListener('phrase-change', e => {
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
