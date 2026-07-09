import '@uibit/text-rotator';
import manifest from '@uibit/text-rotator/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import slideTransition from './examples/slide-transition';
import flipTransition from './examples/flip-transition';

function TextRotatorDemo() {
  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Build websites{' '}
          <uibit-text-rotator
            interval="2000"
            transition="slide"
            style={{ color: '#111827' }}
          >
            <span>faster</span>
            <span>better</span>
            <span>smarter</span>
            <span>together</span>
          </uibit-text-rotator>
        </h2>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'text-rotator',
  title: 'Text Rotator',
  description:
    'Rotates a single word inside a static sentence block with smooth vertical slide or 3D flip transitions. Designed to pull attention to changing value propositions.',
  packageName: '@uibit/text-rotator',
  tagName: 'uibit-text-rotator',
  manifest,
  Demo: TextRotatorDemo,
  demoCode: {
    html: `<h2>
  Build websites
  <uibit-text-rotator interval="2000" transition="slide">
    <span>faster</span>
    <span>better</span>
    <span>smarter</span>
    <span>together</span>
  </uibit-text-rotator>
</h2>`,
    react: `import '@uibit/text-rotator';

function TextRotatorDemo() {
  return (
    <h2>
      Build websites{' '}
      <uibit-text-rotator interval="2000" transition="slide">
        <span>faster</span>
        <span>better</span>
        <span>smarter</span>
        <span>together</span>
      </uibit-text-rotator>
    </h2>
  );
}`,
  },
  examples: [slideTransition, flipTransition],
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
