import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function NeuralDemo() {
  return (
    <div style={{
      height: '300px',
      backgroundColor: '#030712', // Black background
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <uibit-particles
        count={50}
        speed={1.0}
        mode="neural"
        connect-distance={110}
        hover-effect="grab"
        style={{
          '--uibit-particles-color': '#f3f4f6 #9ca3af #4b5563',
          '--uibit-particles-line-color': '#374151',
          '--uibit-particles-min-size': '0.08rem',
          '--uibit-particles-max-size': '0.15rem'
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
          Neural Network Mode (AI Pulses)
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Neural Network',
  description: 'Simulates a mesh grid representing active AI nodes with glowing data packets transmitting along coordinates.',
  Demo: NeuralDemo,
};

export default example;
