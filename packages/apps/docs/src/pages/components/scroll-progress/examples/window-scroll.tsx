import '@uibit/scroll-progress';
import type { UsageExample } from '../../../../types/docs';

function WindowScrollDemo() {
  return (
    <div>
      <uibit-scroll-progress className="fixed top-0 left-0 right-0 z-50 block"></uibit-scroll-progress>

      <div className="space-y-4 py-2">
        <p className="text-xs text-gray-500 italic">
          Note: Scroll the browser window to see the progress bar filled at the
          very top of the viewport.
        </p>
        {Array.from({ length: 4 }).map((_, i) => (
          <p key={i} className="text-sm text-gray-600 leading-relaxed">
            Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  );
}

const windowScrollExample: UsageExample = {
  title: 'Window Scroll',
  description:
    'Without a `target-selector` attribute the component tracks the browser window scroll position. Place it once at the top of your page layout shell — typically as the first child of your outermost wrapper — so it persists across all page content.',
  Demo: WindowScrollDemo,
};

export default windowScrollExample;
