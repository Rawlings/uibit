import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function ZoomFocusDemo() {
  const items = [
    { label: '01', title: 'Research', bg: '#fafafa' },
    { label: '02', title: 'Design', bg: '#f5f5f5' },
    { label: '03', title: 'Build', bg: '#f0f0f0' },
    { label: '04', title: 'Launch', bg: '#ebebeb' },
  ];

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-storytelling mode="zoom-focus" track-alignment="right">
        <div slot="stage" style={{ height: '100%' }}>
          {items.map(({ label, title, bg }) => (
            <div
              key={label}
              data-step
              style={{
                background: bg,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '100%', gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.12em', color: '#9ca3af' }}>{label}</span>
              <span style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827' }}>{title}</span>
            </div>
          ))}
        </div>

        <div slot="track">
          {items.map(({ label, title }) => (
            <section
              key={label}
              class="step"
              style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.12em', color: '#9ca3af', marginBottom: '0.5rem' }}>{label}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>{title}</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
                The stage zooms into this step as scroll position reaches it — others blur and recede continuously.
              </p>
            </section>
          ))}
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'Zoom Focus',
  description: 'A continuous effect driven by raw scroll progress. Each step scales up and sharpens as the scroll position reaches it, then recedes and blurs as it passes.',
  Demo: ZoomFocusDemo,
};

export default example;
