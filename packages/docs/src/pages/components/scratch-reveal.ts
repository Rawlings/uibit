import manifest from '@uibit/scratch-reveal/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'scratch-reveal',
  title: 'Scratch Reveal',
  description:
    'A gamified, accessible scratch-off panel component that reveals hidden content. Users can scratch off the overlay canvas layer by dragging or touching.',
  packageName: '@uibit/scratch-reveal',
  tagName: 'uibit-scratch-reveal',
  manifest,
  usages: [
    {
      title: 'Basic Scratch Reveal',
      code: `<uibit-scratch-reveal>
  <div>Discount Code: GOLD50</div>
</uibit-scratch-reveal>`,
    },
    {
      title: 'Custom Theming',
      code: `<uibit-scratch-reveal 
  style="
    --uibit-scratch-reveal-width: 400px;
    --uibit-scratch-reveal-overlay-color: #333333;
    --uibit-scratch-reveal-background: #ffffff;
    --uibit-scratch-reveal-color: #000000;
  "
>
  <h3>WINNER!</h3>
</uibit-scratch-reveal>`,
    },
  ],
};

export default data;
