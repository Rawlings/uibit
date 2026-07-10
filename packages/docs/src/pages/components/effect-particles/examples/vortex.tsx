import '@uibit/effect-particles';
import { UsageExample } from '../../../../types/docs';

function VortexDemo() {
  return (
    <div style={{
      height: '320px',
      backgroundColor: '#111827',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <uibit-effect-particles
        count={120}
        speed={1.0}
        mode="vortex"
        hover-effect="none"
        style={{
          '--uibit-effect-particles-color': '#f9fafb #e5e7eb #9ca3af #6b7280 #4b5563',
          '--uibit-effect-particles-min-size': '0.1rem',
          '--uibit-effect-particles-max-size': '0.18rem',
        } as any}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#f9fafb',
        }}>
          Orbital Vortex
        </div>
      </uibit-effect-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Vortex Orbit',
  description: 'Particles orbit a central point at radii following Kepler-like physics — inner rings rotate faster, creating a galaxy spiral effect.',
  Demo: VortexDemo,
};

export default example;
