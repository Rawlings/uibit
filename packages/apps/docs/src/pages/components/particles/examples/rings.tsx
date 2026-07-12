import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function RingsDemo() {
  return (
    <div style={{
      height: '320px',
      backgroundColor: '#111827',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <uibit-particles
        count={25}
        speed={0.9}
        mode="rings"
        hover-effect="none"
        style={{
          '--uibit-particles-color': '#6b7280 #9ca3af #4b5563 #d1d5db',
          '--uibit-particles-min-size': '0.05rem',
          '--uibit-particles-max-size': '0.1rem',
        } as any}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '1.25rem',
          fontWeight: '300',
          letterSpacing: '0.15em',
          color: '#e5e7eb',
          textTransform: 'uppercase',
        }}>
          Ripple Field
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Expanding Rings',
  description: 'Concentric circles expand outward from scattered points, fading as they grow — like droplets in still water, staggered across the canvas.',
  Demo: RingsDemo,
};

export default example;
