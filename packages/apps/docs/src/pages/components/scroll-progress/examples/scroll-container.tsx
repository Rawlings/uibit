import '@uibit/scroll-progress';
import { UsageExample } from '../../../../types/docs';

function ScrollContainerDemo() {
  return (
    <div
      id="example-scroll-container"
      className="relative h-64 overflow-y-scroll"
      style={{ scrollbarWidth: 'thin' }}
    >
      <uibit-scroll-progress
        target-selector="#example-scroll-container"
        className="sticky top-0 z-10 block"
      ></uibit-scroll-progress>

      <div className="space-y-4 py-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i} className="text-sm text-gray-600 leading-relaxed">
            Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  );
}

const scrollContainerExample: UsageExample = {
  title: 'Scroll Container',
  description:
    'Track scroll progress within a specific scrollable element by passing a CSS selector to the `target-selector` attribute. Place the component as the first child of the container with `sticky top-0` so it stays pinned to the top as you scroll.',
  Demo: ScrollContainerDemo,
};

export default scrollContainerExample;
