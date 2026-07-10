import '@uibit/scroll-progress';
import { UsageExample } from '../../../../types/docs';

function WindowScrollDemo() {
  return (
    <div
      id="window-scroll-demo-box"
      className="relative h-64 overflow-y-scroll"
      style={{ scrollbarWidth: 'thin' }}
    >
      <uibit-scroll-progress
        target="#window-scroll-demo-box"
        style={
          {
            '--uibit-scroll-progress-color': '#000000',
            '--uibit-scroll-progress-height': '3px',
          } as React.CSSProperties
        }
        class="sticky top-0 z-10 block"
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

const windowScrollExample: UsageExample = {
  title: 'Window Scroll',
  description:
    'Without a `target` attribute the component tracks the browser window scroll position. Place it once at the top of your page layout shell — typically as the first child of your outermost wrapper — so it persists across all page content.',
  Demo: WindowScrollDemo,
};

export default windowScrollExample;
