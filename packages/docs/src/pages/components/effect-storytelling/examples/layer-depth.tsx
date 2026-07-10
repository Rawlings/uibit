import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function LayerDepthDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'visible', background: '#fafafa', position: 'relative' }}>
      <uibit-effect-storytelling mode="layer-depth" track-alignment="left" navigation>
        <div slot="stage" style={{ height: '100%' }}>
          {/* Layer 1: Front-end */}
          <div
            data-step
            style={{
              background: '#09090b',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '1rem',
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.4))' }}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#60a5fa', letterSpacing: '0.1em' }}>01 / PRESENTATION</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f4f4f5' }}>User Interface</span>
          </div>

          {/* Layer 2: API */}
          <div
            data-step
            style={{
              background: '#18181b',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '1rem',
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(52, 211, 153, 0.4))' }}>
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#34d399', letterSpacing: '0.1em' }}>02 / APPLICATION</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f4f4f5' }}>Logic & APIs</span>
          </div>

          {/* Layer 3: Database */}
          <div
            data-step
            style={{
              background: '#27272a',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '1rem',
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))' }}>
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#f59e0b', letterSpacing: '0.1em' }}>03 / STORAGE</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f4f4f5' }}>Database Infrastructure</span>
          </div>
        </div>

        <div slot="track">
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Presentation Layer</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              The client-facing UI built with lightweight, fast components. Displays state changes and receives user actions.
            </p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Logic & API Gateway</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              The gateway handling authorization, validation, and core service queries. Acts as the mediator between database and frontend.
            </p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Database Engine</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              Distributed transactional database cluster ensuring durability, consistency, and sub-millisecond retrieval.
            </p>
          </section>
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'Layer Depth',
  description: 'Stage steps recede in 3D perspective space as focus shifts. The active step is brought forward; siblings blur and fade behind it.',
  Demo: LayerDepthDemo,
};

export default example;
