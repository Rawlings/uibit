import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function AuroraDemo() {
  return (
    <div style={{
      height: '320px',
      backgroundColor: '#020617',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <uibit-particles
        count={6}
        speed={0.6}
        mode="aurora"
        hover-effect="none"
        style={{
          '--uibit-particles-color': '#e2e8f0 #cbd5e1 #94a3b8 #64748b #475569 #334155',
        } as any}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '1.4rem',
          fontWeight: '300',
          letterSpacing: '0.2em',
          color: '#e2e8f0',
          textTransform: 'uppercase',
        }}>
          Northern Lights
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Aurora',
  description: 'Soft, blurred curtains of light drift across a dark canvas — like the northern lights. Each band is a slowly shifting sine-wave shape.',
  Demo: AuroraDemo,
};

export default example;
