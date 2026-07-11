import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function SmokeDemo() {
  return (
    <div style={{
      height: '320px',
      backgroundColor: '#030712',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <uibit-particles
        count={40}
        speed={0.7}
        mode="smoke"
        hover-effect="none"
        style={{
          '--uibit-particles-color': '#374151 #4b5563 #6b7280 #9ca3af',
          '--uibit-particles-min-size': '0.5rem',
          '--uibit-particles-max-size': '0.8rem',
        } as any}
      >
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          height: '100%',
          paddingBottom: '2rem',
          fontSize: '1.1rem',
          fontWeight: '500',
          color: '#9ca3af',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          Ethereal Smoke
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Smoke Drift',
  description: 'Soft plumes rise from the bottom, expanding and fading as they climb — good for dark, dramatic hero backgrounds.',
  Demo: SmokeDemo,
};

export default example;
