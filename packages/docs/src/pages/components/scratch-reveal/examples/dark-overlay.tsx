import '@uibit/scratch-reveal';
import { UsageExample } from '../../../../types/docs';

function DarkOverlayDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative border border-gray-700 rounded-lg overflow-hidden shadow-md">
        <uibit-scratch-reveal
          style={
            {
              '--uibit-scratch-reveal-width': '320px',
              '--uibit-scratch-reveal-height': '200px',
              '--uibit-scratch-reveal-background': '#111111',
              '--uibit-scratch-reveal-color': '#f5f5f5',
              '--uibit-scratch-reveal-overlay-color': '#1a1a1a',
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
            <span className="text-3xl">✨</span>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Secret reward
            </p>
            <p className="text-2xl font-bold text-white tracking-tight">Free Shipping</p>
            <p className="text-sm text-gray-300">
              On your next order over{' '}
              <span className="font-mono font-bold text-white">$50</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              No code needed · Applied automatically
            </p>
          </div>
        </uibit-scratch-reveal>
      </div>
    </div>
  );
}

const darkOverlay: UsageExample = {
  title: 'Dark Overlay',
  description: 'A dark themed scratch card with a near-black overlay and light revealed content.',
  code: {
    html: `<uibit-scratch-reveal
  style="
    --uibit-scratch-reveal-width: 320px;
    --uibit-scratch-reveal-height: 200px;
    --uibit-scratch-reveal-background: #111111;
    --uibit-scratch-reveal-color: #f5f5f5;
    --uibit-scratch-reveal-overlay-color: #1a1a1a;
  "
>
  <div>
    <p>Secret reward</p>
    <p>Free Shipping</p>
    <p>On your next order over $50</p>
  </div>
</uibit-scratch-reveal>`,
    react: `import '@uibit/scratch-reveal';

function DarkOverlay() {
  return (
    <uibit-scratch-reveal
      style={{
        '--uibit-scratch-reveal-width': '320px',
        '--uibit-scratch-reveal-height': '200px',
        '--uibit-scratch-reveal-background': '#111111',
        '--uibit-scratch-reveal-color': '#f5f5f5',
        '--uibit-scratch-reveal-overlay-color': '#1a1a1a',
      }}
    >
      <div>
        <p>Secret reward</p>
        <p>Free Shipping</p>
        <p>On your next order over $50</p>
      </div>
    </uibit-scratch-reveal>
  );
}`,
  },
  Demo: DarkOverlayDemo,
};

export default darkOverlay;
