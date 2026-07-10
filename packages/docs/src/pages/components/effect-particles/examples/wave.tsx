import '@uibit/effect-particles';
import { UsageExample } from '../../../../types/docs';

function WaveDemo() {
  return (
    <div style={{ height: '300px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-particles
        count={80}
        speed={0.9}
        mode="wave"
        hover-effect="none"
        style={{
          '--uibit-effect-particles-color': '#9ca3af #6b7280 #4b5563 #d1d5db',
          '--uibit-effect-particles-min-size': '0.15rem',
          '--uibit-effect-particles-max-size': '0.2rem',
        } as any}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#111827',
        }}>
          Undulating Waves
        </div>
      </uibit-effect-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Wave Flow',
  description: 'Particles drift horizontally in layered rows, each oscillating with a sine wave to create a rippling ocean effect.',
  Demo: WaveDemo,
};

export default example;
