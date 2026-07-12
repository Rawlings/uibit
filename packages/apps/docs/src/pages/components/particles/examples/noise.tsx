import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function NoiseDemo() {
  return (
    <div style={{ height: '320px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fafafa' }}>
      <uibit-particles
        count={200}
        speed={1.0}
        mode="noise"
        hover-effect="none"
        style={{
          '--uibit-particles-color': '#9ca3af #6b7280 #d1d5db #4b5563',
          '--uibit-particles-min-size': '0.06rem',
          '--uibit-particles-max-size': '0.08rem',
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
          Flow Field
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Noise Flow Field',
  description: 'Particles follow a dynamic vector field driven by layered sine/cosine functions, producing organic swirling currents.',
  Demo: NoiseDemo,
};

export default example;
