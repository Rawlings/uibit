import '@uibit/image-comparison';
import manifest from '@uibit/image-comparison/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import horizontalExample from './examples/horizontal';
import horizontalRaw from './examples/horizontal?raw';
import diagonalExample from './examples/diagonal';
import diagonalRaw from './examples/diagonal?raw';
import radialExample from './examples/radial';
import radialRaw from './examples/radial?raw';

function ComparisonCurtainDemo() {
  return (
    <div style={{ width: '100%', height: '350px', maxWidth: '600px', margin: '0 auto' }}>
      <uibit-image-comparison mode="horizontal" progress={50}>
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
      </uibit-image-comparison>
    </div>
  );
}

const processedExamples = [
  { ...horizontalExample, code: { react: horizontalRaw } },
  { ...diagonalExample, code: { react: diagonalRaw } },
  { ...radialExample, code: { react: radialRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: ComparisonCurtainDemo,
  demoCode: {
    html: `<uibit-image-comparison mode="horizontal" progress="50">
  <img slot="before" src="before.jpg" alt="Before" />
  <img slot="after" src="after.jpg" alt="After" />
</uibit-image-comparison>`,
    react: `import '@uibit/image-comparison';

function Demo() {
  return (
    <uibit-image-comparison mode="horizontal" progress={50}>
      <img slot="before" src="before.jpg" alt="Before" />
      <img slot="after" src="after.jpg" alt="After" />
    </uibit-image-comparison>
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
