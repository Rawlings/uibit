import '@uibit/image-xray';
import manifest from '@uibit/image-xray/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import basic from './examples/basic';
import customLens from './examples/custom-lens';

function ImageXrayDemo() {
  return (
    <div>
      <div className="max-w-2xl mx-auto rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <uibit-image-xray>
          <img
            src="https://picsum.photos/seed/carexterior/800/450"
            alt="Vehicle exterior"
            style={{ display: 'block', width: '100%' }}
          />
          <img
            slot="xray"
            src="https://picsum.photos/seed/carbattery/800/450"
            alt="Battery and motor layout"
            style={{ display: 'block', width: '100%' }}
          />
        </uibit-image-xray>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'image-xray',
  title: 'Image Xray',
  description:
    'A floating circular lens that follows the cursor or touch point, revealing a synchronized secondary image exactly where the user looks. Built for luxury and high-tech product storytelling.',
  packageName: '@uibit/image-xray',
  tagName: 'uibit-image-xray',
  manifest,
  Demo: ImageXrayDemo,
  demoCode: {
    html: `<uibit-image-xray>
  <img src="https://picsum.photos/seed/carexterior/800/450" alt="Vehicle exterior" style="display: block; width: 100%;" />
  <img slot="xray" src="https://picsum.photos/seed/carbattery/800/450" alt="Battery and motor layout" style="display: block; width: 100%;" />
</uibit-image-xray>`,
    react: `import '@uibit/image-xray';

function ImageXrayDemo() {
  return (
    <uibit-image-xray>
      <img src="https://picsum.photos/seed/carexterior/800/450" alt="Vehicle exterior" style={{ display: 'block', width: '100%' }} />
      <img slot="xray" src="https://picsum.photos/seed/carbattery/800/450" alt="Battery and motor layout" style={{ display: 'block', width: '100%' }} />
    </uibit-image-xray>
  );
}`,
  },
  examples: [basic, customLens],
  features: [
    'Pixel-perfect alignment: the xray image is offset so the cursor position maps identically to both layers',
    'Smooth opacity transition on cursor enter and leave',
    'Touch support with passive/non-passive event handling for mobile',
    'Lens size configurable via CSS custom property or attribute',
    'Fires xray-move events with percentage x/y for chaining effects',
    'Shadow DOM isolated — no style leakage into host page',
  ],
};

export default data;
