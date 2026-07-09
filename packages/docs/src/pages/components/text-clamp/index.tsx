import '@uibit/text-clamp';
import manifest from '@uibit/text-clamp/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import basic from './examples/basic';
import basicRaw from './examples/basic?raw';
import customLabels from './examples/custom-labels';
import customLabelsRaw from './examples/custom-labels?raw';

function TextClampDemo() {
  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm max-w-xl">
        <uibit-text-clamp lines={3} style={{ fontSize: '1rem', lineHeight: '1.625' }}>
          Scandinavian design is defined by simplicity, minimalism, and functionality.
          Its roots trace back to the 1950s when Nordic designers began blending fine
          art with everyday utility. The movement prioritises clean lines, natural
          materials, and a restrained palette — resulting in objects that feel both
          timeless and deeply human. In a world of visual noise, the quiet confidence
          of this aesthetic continues to resonate. Furniture, typography, and
          architecture from this tradition share a common thread: nothing is added
          that does not serve a purpose, and nothing that serves a purpose is left
          without care.
        </uibit-text-clamp>
      </div>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...basic, code: { react: basicRaw } },
  { ...customLabels, code: { react: customLabelsRaw } },
];

const data: ComponentDocData = {
  id: 'text-clamp',
  title: 'Text Clamp',
  description:
    'Clamps slotted text to an exact line count via a lines attribute. When content overflows, a More/Less toggle appears inline. A ResizeObserver recalculates overflow on every viewport resize so the clamp is always mathematically correct.',
  packageName: '@uibit/text-clamp',
  tagName: 'uibit-text-clamp',
  manifest,
  Demo: TextClampDemo,
  demoCode: {
    html: `<uibit-text-clamp lines="3">
  Scandinavian design is defined by simplicity, minimalism, and functionality.
  Its roots trace back to the 1950s when Nordic designers began blending fine
  art with everyday utility. The movement prioritises clean lines, natural
  materials, and a restrained palette — resulting in objects that feel both
  timeless and deeply human.
</uibit-text-clamp>`,
    react: `import '@uibit/text-clamp';

function Example() {
  return (
    <uibit-text-clamp lines={3}>
      Scandinavian design is defined by simplicity, minimalism, and functionality.
      Its roots trace back to the 1950s when Nordic designers began blending fine
      art with everyday utility. The movement prioritises clean lines, natural
      materials, and a restrained palette — resulting in objects that feel both
      timeless and deeply human.
    </uibit-text-clamp>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The expand/collapse toggle is a native <button> element with an aria-expanded attribute that reflects the current state.',
      'Screen readers announce the toggle state change when the user activates the button.',
      'The clamped text remains in the DOM at all times — only its visual overflow is controlled — so screen readers can access the full content regardless of visual clamp state.',
    ],
    keyboardNav: [
      { key: 'Tab', description: 'Move focus to the More/Less toggle button.' },
      { key: 'Enter / Space', description: 'Toggle between the clamped and expanded state.' },
    ],
  },
  features: [
    '-webkit-line-clamp clamping with accurate line-count calculation via scrollHeight comparison',
    'ResizeObserver re-evaluates overflow on every container resize — correct across all viewport widths',
    'Inline More/Less toggle rendered as a <button> for full keyboard and screen reader support',
    'aria-expanded attribute on the toggle reflects current state',
    'CSS custom properties for every visual dimension — no overrides needed',
    'more-label and less-label attributes for full localisation support',
  ],
};

export default data;
