import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function MatrixDemo() {
  return (
    <div style={{
      height: '300px',
      backgroundColor: '#030712', // Black terminal screen
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <uibit-particles
        count={80}
        speed={1.0}
        mode="matrix"
        hover-effect="none"
        style={{
          '--uibit-particles-color': '#e5e7eb #9ca3af #4b5563 #111827',
          '--uibit-particles-min-size': '0.1rem',
          '--uibit-particles-max-size': '0.2rem'
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
          fontFamily: 'monospace',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          Matrix Binary Rain Mode
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Binary Rain (Matrix)',
  description: 'Simulates falling binary code streams in high contrast greyscale terminal styling.',
  Demo: MatrixDemo,
};

export default example;
