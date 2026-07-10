import '@uibit/effect-particles';
import { UsageExample } from '../../../../types/docs';

function SnowDemo() {
  return (
    <div style={{
      height: '300px',
      backgroundColor: '#111827', // Dark slate/gray-900 background for contrast
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <uibit-effect-particles
        count={80}
        speed={1.0}
        mode="snow"
        hover-effect="none"
        style={{
          '--uibit-effect-particles-color': '#ffffff #f3f4f6 #e5e7eb #9ca3af',
          '--uibit-effect-particles-min-size': '0.05rem',
          '--uibit-effect-particles-max-size': '0.25rem'
        } as any}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          Winter Snow Fall Mode
        </div>
      </uibit-effect-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Snowy Breeze',
  description: 'Recreates falling snow using a dedicated snow physics mode and multi-toned greyscale color arrays.',
  Demo: SnowDemo,
};

export default example;
