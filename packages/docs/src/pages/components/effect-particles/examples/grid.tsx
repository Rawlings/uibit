import '@uibit/effect-particles';
import { UsageExample } from '../../../../types/docs';

function GridDemo() {
  return (
    <div style={{ height: '320px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-particles
        count={150}
        speed={1.0}
        mode="grid"
        hover-effect="repel"
        interactive-radius={70}
        style={{
          '--uibit-effect-particles-color': '#6b7280',
          '--uibit-effect-particles-min-size': '0.18rem',
          '--uibit-effect-particles-max-size': '0.22rem',
        } as any}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>Pulse Grid</span>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Move your mouse over the dots</span>
        </div>
      </uibit-effect-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Pulse Grid',
  description: 'A regular dot matrix breathes with a ripple wave propagating outward from the center. Mouse repels dots back into place.',
  Demo: GridDemo,
};

export default example;
