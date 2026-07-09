import '@uibit/scroll-progress';
import { UsageExample } from '../../../../types/docs';

function WindowScrollDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Without a <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">target</code>{' '}
        attribute, the component tracks the window scroll position. The demo below simulates this
        with a scrollable mini-box — in a real page layout, place the component once at the very top
        of your layout shell:
      </p>

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
              Paragraph {i + 1} — scroll down to see the progress bar advance. On a real page this
              bar sits at the very top of your layout, tracking the browser window scroll.
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
