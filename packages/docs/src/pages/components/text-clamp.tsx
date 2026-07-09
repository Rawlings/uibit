import '@uibit/text-clamp';
import manifest from '@uibit/text-clamp/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function TextClampDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        The paragraph below is clamped to 3 lines. Click "More" to expand it.
      </p>
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

const data: ComponentDocData = {
  id: 'text-clamp',
  title: 'Text Clamp',
  description:
    'Clamps slotted text to an exact line count via a lines attribute. When content overflows, a More/Less toggle appears inline. A ResizeObserver recalculates overflow on every viewport resize so the clamp is always mathematically correct.',
  packageName: '@uibit/text-clamp',
  tagName: 'uibit-text-clamp',
  manifest,
  Demo: TextClampDemo,
  usages: [
    {
      title: 'HTML Integration',
      code: `<uibit-text-clamp lines="3">
  Your long paragraph text goes here. It will be clamped to exactly
  3 lines and a "More" button will appear if content overflows.
</uibit-text-clamp>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/text-clamp';

function Article({ body }: { body: string }) {
  return (
    <uibit-text-clamp lines={4}>
      {body}
      <button slot="more">Read more</button>
      <button slot="less">Show less</button>
    </uibit-text-clamp>
  );
}`,
    },
    {
      title: 'Custom Toggle Labels (Bring Your Own UI)',
      description: 'Override the default More/Less buttons with your own elements.',
      code: `<uibit-text-clamp lines="2">
  <p>Your content...</p>
  <button slot="more">Read more</button>
  <button slot="less">Show less</button>
</uibit-text-clamp>`,
    },
    {
      title: 'Toggle Event',
      description: 'React to expand/collapse state changes.',
      code: `document.querySelector('uibit-text-clamp').addEventListener('toggle', e => {
  console.log('expanded:', e.detail.expanded);
});`,
    },
  ],
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
