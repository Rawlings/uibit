import manifest from '@uibit/signature-pad/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'signature-pad',
  title: 'Signature Pad',
  description:
    'A canvas drawing area that captures freehand signatures or messages using touch or mouse gestures, rendered immediately as smooth bezier-curved vector lines with simulated pen pressure.',
  packageName: '@uibit/signature-pad',
  tagName: 'uibit-signature-pad',
  manifest,
  usages: [
    {
      title: 'Basic',
      code: '<uibit-signature-pad></uibit-signature-pad>',
    },
    {
      title: 'Custom Labels (Slots)',
      code: `<uibit-signature-pad>
  <span slot="hint">Draw your signature below</span>
  <span slot="clear-label">Start over</span>
</uibit-signature-pad>`,
    },
    {
      title: 'Custom Theming',
      code: `<uibit-signature-pad
  style="
    --uibit-signature-pad-height: 240px;
    --uibit-signature-pad-stroke-color: #1d4ed8;
    --uibit-signature-pad-stroke-width: 3px;
    --uibit-signature-pad-border: 2px solid #1d4ed8;
    --uibit-signature-pad-border-radius: 4px;
  "
></uibit-signature-pad>`,
    },
    {
      title: 'Exporting',
      code: `const pad = document.querySelector('uibit-signature-pad');

// PNG data URL
const png = pad.toDataURL();

// Inline SVG string
const svg = pad.toSVG();

// Clear the canvas
pad.clear();`,
    },
    {
      title: 'Events',
      code: `pad.addEventListener('signature-change', (e) => {
  console.log('isEmpty:', e.detail.isEmpty);
  console.log('dataUrl:', e.detail.dataUrl);
});

pad.addEventListener('signature-clear', (e) => {
  console.log('was empty before:', e.detail.previouslyEmpty);
});`,
    },
  ],
};

export default data;
