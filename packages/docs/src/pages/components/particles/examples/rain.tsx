import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function RainDemo() {
  return (
    <div style={{
      height: '300px',
      backgroundColor: '#030712', // Black surface
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <uibit-particles
        count={120}
        speed={1.5}
        mode="rain"
        hover-effect="none"
        style={{
          '--uibit-particles-color': '#6b7280 #9ca3af #4b5563',
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
          Rain Storm Mode
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Digital Storm (Rain)',
  description: 'Uses fast vertical vector line streaks to simulate a sleek rain storm backdrop.',
  Demo: RainDemo,
};

export default example;
