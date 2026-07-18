import '@uibit/particles';
import type { UsageExample } from '../../../../types/docs';

function BubblesDemo() {
  return (
    <div
      style={{
        height: '320px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <uibit-particles
        count={35}
        speed={0.8}
        mode="bubbles"
        hover-effect="repel"
        interactive-radius={80}
        style={
          {
            '--uibit-particles-color': '#94a3b8 #cbd5e1 #64748b #475569',
            '--uibit-particles-min-size': '0.4rem',
            '--uibit-particles-max-size': '1.4rem',
          } as any
        }
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontSize: '1.25rem',
            fontWeight: '500',
            color: '#334155',
          }}
        >
          Hover to scatter
        </div>
      </uibit-particles>
    </div>
  );
}

const example: UsageExample = {
  title: 'Rising Bubbles',
  description:
    'Hollow circles of varying sizes float upward and fade at the surface. Mouse hover repels the nearest bubbles.',
  Demo: BubblesDemo,
};

export default example;
