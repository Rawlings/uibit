import '@uibit/text-rotator';
import manifest from '@uibit/text-rotator/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import slideTransition from './examples/slide-transition';
import slideTransitionRaw from './examples/slide-transition?raw';
import flipTransition from './examples/flip-transition';
import flipTransitionRaw from './examples/flip-transition?raw';

function TextRotatorDemo() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
      <uibit-text-rotator interval={2000} transition="slide">
        Build websites{' '}
        <span slot="text">faster</span>
        <span slot="text">better</span>
        <span slot="text">smarter</span>
        <span slot="text">together</span>
      </uibit-text-rotator>
    </h2>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...slideTransition, code: { react: slideTransitionRaw } },
  { ...flipTransition, code: { react: flipTransitionRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: TextRotatorDemo,
  demoCode: {
    html: `<h2>
  <uibit-text-rotator interval="2000" transition="slide">
    Build websites
    <span slot="text">faster</span>
    <span slot="text">better</span>
    <span slot="text">smarter</span>
    <span slot="text">together</span>
  </uibit-text-rotator>
</h2>`,
    react: `import '@uibit/text-rotator';

function TextRotatorDemo() {
  return (
    <h2>
      <uibit-text-rotator interval="2000" transition="slide">
        Build websites{' '}
        <span slot="text">faster</span>
        <span slot="text">better</span>
        <span slot="text">smarter</span>
        <span slot="text">together</span>
      </uibit-text-rotator>
    </h2>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The active word is rendered as visible text so screen readers can read it without special markup.',
      'A visually hidden aria-live="polite" region announces each word change for screen reader users.',
      'Rotation pauses when prefers-reduced-motion is enabled and the first word is displayed statically.',
    ],
  },
  features: [
    'Vertical slide and 3D CSS flip transitions selectable via the transition attribute',
    'Overflow-hidden host clips motion to a single-line boundary — no layout shift',
    'Automatic stage width tracking keeps the host fitted to the active word',
    'loop=false stops after the last word for one-shot hero reveals',
    'word-change event synchronises sibling elements to the active index',
  ],
};

export default data;
