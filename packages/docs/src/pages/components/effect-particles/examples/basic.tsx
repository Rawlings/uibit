import '@uibit/effect-particles';
import { UsageExample } from '../../../../types/docs';

function BasicDemo() {
  return (
    <div style={{ height: '300px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-particles count={60} speed={1.2} hover-effect="repel">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#111827'
        }}>
          Hover to repel the particles
        </div>
      </uibit-effect-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Basic Drift',
  description: 'A standard particle field that drifts slowly and repels when hovered.',
  Demo: BasicDemo,
};

export default example;
