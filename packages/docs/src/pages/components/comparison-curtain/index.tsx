import '@uibit/comparison-curtain';
import manifest from '@uibit/comparison-curtain/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import horizontalExample from './examples/horizontal';
import horizontalRaw from './examples/horizontal?raw';
import diagonalExample from './examples/diagonal';
import diagonalRaw from './examples/diagonal?raw';
import radialExample from './examples/radial';
import radialRaw from './examples/radial?raw';

function ComparisonCurtainDemo() {
  return (
    <div style={{ height: '350px', maxWidth: '600px', margin: '0 auto' }}>
      <uibit-comparison-curtain mode="horizontal" progress={50}>
        <img
          slot="before"
          src="https://picsum.photos/seed/forest-summer/800/500"
          alt="Summer forest landscape"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <img
          slot="after"
          src="https://picsum.photos/seed/forest-winter/800/500"
          alt="Winter forest landscape"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </uibit-comparison-curtain>
    </div>
  );
}

const processedExamples = [
  { ...horizontalExample, code: { react: horizontalRaw } },
  { ...diagonalExample, code: { react: diagonalRaw } },
  { ...radialExample, code: { react: radialRaw } },
];

const data: ComponentDocData = {
  id: 'comparison-curtain',
  title: 'Comparison Curtain',
  description:
    'Displays overlapping before/after content layers with interactive diagonal, radial, horizontal, or vertical splits.',
  packageName: '@uibit/comparison-curtain',
  tagName: 'uibit-comparison-curtain',
  manifest,
  Demo: ComparisonCurtainDemo,
  demoCode: {
    html: `<uibit-comparison-curtain mode="horizontal" progress="50">
  <img slot="before" src="before.jpg" alt="Before" />
  <img slot="after" src="after.jpg" alt="After" />
</uibit-comparison-curtain>`,
    react: `import '@uibit/comparison-curtain';

function Demo() {
  return (
    <uibit-comparison-curtain mode="horizontal" progress={50}>
      <img slot="before" src="before.jpg" alt="Before" />
      <img slot="after" src="after.jpg" alt="After" />
    </uibit-comparison-curtain>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The component has role="slider" and supports standard slider keyboard focus.',
      'Keyboard arrow keys (ArrowLeft, ArrowRight, ArrowUp, ArrowDown) adjust progress dynamically.',
      'Always provide clear alternative text attributes on slotted images for screen readers.',
    ],
  },
  features: [
    'Provides four distinct comparative clipping modes',
    'Supports touch gestures and captures pointer events correctly',
    'Features keyboard controls with customizable step increments',
    'Stylable handle, border, and divider configurations using CSS custom properties',
  ],
};

export default data;
