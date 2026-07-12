import '@uibit/image-reveal';
import manifest from '@uibit/image-reveal/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import basic from './examples/basic';
import basicRaw from './examples/basic?raw';
import customLens from './examples/custom-lens';
import customLensRaw from './examples/custom-lens?raw';

function ImageXrayDemo() {
  return (
    <uibit-image-reveal>
      <img
        src="https://picsum.photos/seed/carexterior/800/450"
        alt="Vehicle exterior"
        style={{ display: 'block', width: '100%' }}
      />
      <img
        slot="reveal"
        src="https://picsum.photos/seed/carbattery/800/450"
        alt="Battery and motor layout"
        style={{ display: 'block', width: '100%' }}
      />
    </uibit-image-reveal>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...basic, code: { react: basicRaw } },
  { ...customLens, code: { react: customLensRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: ImageXrayDemo,
  demoCode: {
    html: `<uibit-image-reveal>
  <img src="https://picsum.photos/seed/carexterior/800/450" alt="Vehicle exterior" style="display: block; width: 100%;" />
  <img slot="reveal" src="https://picsum.photos/seed/carbattery/800/450" alt="Battery and motor layout" style="display: block; width: 100%;" />
</uibit-image-reveal>`,
    react: `import '@uibit/image-reveal';

function ImageXrayDemo() {
  return (
    <uibit-image-reveal>
      <img src="https://picsum.photos/seed/carexterior/800/450" alt="Vehicle exterior" style={{ display: 'block', width: '100%' }} />
      <img slot="reveal" src="https://picsum.photos/seed/carbattery/800/450" alt="Battery and motor layout" style={{ display: 'block', width: '100%' }} />
    </uibit-image-reveal>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Both the primary and xray images must have descriptive alt attributes, as the lens effect provides visual-only context for the secondary layer.',
      'The xray overlay is purely decorative — no ARIA role or live region is applied to lens movement.',
      'Touch events are supported alongside pointer events for mobile accessibility.',
    ],
  },
  features: [
    'Pixel-perfect alignment: the xray image is offset so the cursor position maps identically to both layers',
    'Smooth opacity transition on cursor enter and leave',
    'Touch support with passive/non-passive event handling for mobile',
    'Lens size configurable via CSS custom property or attribute',
    'Fires reveal-move events with percentage x/y for chaining effects',
    'Shadow DOM isolated — no style leakage into host page',
  ],
};

export default data;
