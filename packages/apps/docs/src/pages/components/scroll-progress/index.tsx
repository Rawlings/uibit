import '@uibit/scroll-progress';
import manifest from '@uibit/scroll-progress/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import scrollContainerExample from './examples/scroll-container';
import scrollContainerRaw from './examples/scroll-container?raw';
import windowScrollExample from './examples/window-scroll';
import windowScrollRaw from './examples/window-scroll?raw';

function ScrollProgressDemo() {
  return (
    <div
      id="demo-scroll-box"
      className="relative h-64 overflow-y-scroll"
      style={{ scrollbarWidth: 'thin' }}
    >
      <uibit-scroll-progress
        target-selector="#demo-scroll-box"
        className="sticky top-0 z-10 block"
      ></uibit-scroll-progress>

      <div className="space-y-4 py-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="text-sm text-gray-600 leading-relaxed">
            Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        ))}
      </div>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...scrollContainerExample, code: { react: scrollContainerRaw } },
  { ...windowScrollExample, code: { react: windowScrollRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: ScrollProgressDemo,
  demoCode: {
    html: `<div id="scrollable-block" style="height: 24rem; overflow-y: scroll; position: relative;">
  <uibit-scroll-progress
    target-selector="#scrollable-block"
    class="sticky top-0 z-10 block"
  ></uibit-scroll-progress>
  <div style="padding: 1.5rem;">
    <!-- scrollable content -->
  </div>
</div>`,
    react: `<div
  id="scrollable-block"
  className="relative h-96 overflow-y-scroll"
>
  <uibit-scroll-progress
    target-selector="#scrollable-block"
    class="sticky top-0 z-10 block"
  ></uibit-scroll-progress>
  <div className="p-6">
    {/* scrollable content */}
  </div>
</div>`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The component renders with role="progressbar", aria-valuemin="0", and aria-valuemax="100" so screen readers can report scroll progress.',
      'aria-valuenow is updated on each scroll frame with the current progress percentage.',
      'The progress bar is decorative and does not intercept any focus or keyboard events.',
    ],
  },
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
