import manifest from '@uibit/scroll-progress/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'scroll-progress',
  title: 'Scroll Progress',
  description:
    'Lightweight, accessible scroll progress indicator. Tracks viewport scrolling by default, or can be targeting a specific scrollable element using selectors.',
  packageName: '@uibit/scroll-progress',
  tagName: 'uibit-scroll-progress',
  manifest,
  usages: [
    {
      title: 'Basic Window Scrolling',
      code: '<uibit-scroll-progress style="--uibit-scroll-progress-color: #000000; --uibit-scroll-progress-height: 5px;"></uibit-scroll-progress>',
    },
    {
      title: 'Custom Element Container Scrolling',
      code: `<!-- HTML container with overflow-y -->
<div id="scrollable-block" style="height: 300px; overflow-y: scroll; position: relative;">
  <uibit-scroll-progress 
    target="#scrollable-block" 
    style="--uibit-scroll-progress-color: #000000;"
  ></uibit-scroll-progress>
  <div style="height: 1000px;">
    Lots of scrollable content...
  </div>
</div>`,
    },
  ],
  features: [
    'Tracks standard window viewport scrolling by default',
    'Fully supports tracking custom scroll containers via CSS selectors',
    'Correctly handles component attachment/removal, preventing scroll listener leaks',
    'GPU-accelerated reactive layout renders',
    'Full progressbar ARIA semantics for screen readers',
    'Supports dynamic customization using CSS custom properties',
  ],
};

export default data;
