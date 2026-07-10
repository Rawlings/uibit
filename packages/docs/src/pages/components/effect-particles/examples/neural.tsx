import '@uibit/effect-particles';
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
      <uibit-effect-particles
        count={50}
        speed={1.0}
        mode="neural"
        connect-distance={110}
        hover-effect="grab"
        style={{
          '--uibit-effect-particles-color': '#f3f4f6 #9ca3af #4b5563',
          '--uibit-effect-particles-line-color': '#374151',
          '--uibit-effect-particles-min-size': '0.08rem',
          '--uibit-effect-particles-max-size': '0.15rem'
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
      </uibit-effect-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Neural Network',
  description: 'Simulates a mesh grid representing active AI nodes with glowing data packets transmitting along coordinates.',
  Demo: NeuralDemo,
};

export default example;
