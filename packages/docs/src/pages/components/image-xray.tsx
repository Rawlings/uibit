import '@uibit/image-xray';
import manifest from '@uibit/image-xray/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function ImageXrayDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Move your cursor (or drag on touch) over the image to reveal the hidden layer beneath:
      </p>
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
  usages: [
    {
      title: 'HTML Integration',
      code: `<uibit-image-xray>
  <img src="exterior.jpg" alt="Car exterior" />
  <img slot="xray" src="chassis.jpg" alt="Battery and motor layout" />
</uibit-image-xray>`,
    },
    {
      title: 'Custom Lens Size',
      description: 'Control the lens diameter with the CSS custom property or the size attribute.',
      code: `<uibit-image-xray style="--uibit-image-xray-lens-size: 18rem;">
  <img src="watch-face.jpg" alt="Watch exterior" />
  <img slot="xray" src="watch-movement.jpg" alt="Movement and gears" />
</uibit-image-xray>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/image-xray';

function ProductReveal() {
  return (
    <uibit-image-xray>
      <img src="/exterior.jpg" alt="Product exterior" />
      <img slot="xray" src="/cutaway.jpg" alt="Internal components" />
    </uibit-image-xray>
  );
}`,
    },
  ],
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
