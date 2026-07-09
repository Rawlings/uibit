import '@uibit/scroll-progress';
import { UsageExample } from '../../../../types/docs';

function WindowScrollDemo() {
  return (
    <div>
      <div
        id="window-scroll-demo-box"
        className="relative border border-gray-300 rounded-lg h-64 overflow-y-scroll bg-white shadow-inner"
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

        <div className="p-6 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="text-sm text-gray-600 leading-relaxed">
              Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const windowScrollExample: UsageExample = {
  title: 'Window Scroll',
  description:
    'Without a `target` attribute the component tracks the browser window scroll position. Place it once at the top of your page layout shell — typically as the first child of your outermost wrapper — so it persists across all page content.',
  code: {
    html: `<!-- Place once at the top of your page layout -->
<uibit-scroll-progress
  style="--uibit-scroll-progress-color: #000000; --uibit-scroll-progress-height: 5px;"
  class="sticky top-0 z-10 block"
></uibit-scroll-progress>

<main>
  <!-- page content -->
</main>`,
    react: `// Place once at the top of your layout component
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <uibit-scroll-progress
        style={{
          '--uibit-scroll-progress-color': '#000000',
          '--uibit-scroll-progress-height': '5px',
        } as React.CSSProperties}
        class="sticky top-0 z-10 block"
      ></uibit-scroll-progress>
      <main>{children}</main>
    </>
  );
}`,
  },
  Demo: WindowScrollDemo,
};

export default windowScrollExample;
