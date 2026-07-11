import '@uibit/particles';
import { UsageExample } from '../../../../types/docs';

function ConstellationDemo() {
  return (
    <div style={{ height: '300px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-particles count={40} speed={0.8} connect connect-distance={120} hover-effect="grab">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#111827'
        }}>
          Constellation effect with Grab interaction
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Constellation Mode',
  description: 'Draws connecting lines between close particles and draws interactive lines to the mouse on grab.',
  Demo: ConstellationDemo,
};

export default example;
