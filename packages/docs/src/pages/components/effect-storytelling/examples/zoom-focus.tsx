import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function ZoomFocusDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'visible', background: '#fafafa', position: 'relative' }}>
      <uibit-effect-storytelling mode="zoom-focus" track-alignment="right" navigation>
        <div slot="stage" style={{ height: '100%' }}>
          {/* Step 1 */}
          <div
            data-step
            style={{
              background: '#09090b',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '1rem',
            }}
          >
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.4))' }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#60a5fa', letterSpacing: '0.1em' }}>01 / DISCOVER</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f4f4f5' }}>User Research</span>
          </div>

          {/* Step 2 */}
          <div
            data-step
            style={{
              background: '#18181b',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '1rem',
            }}
          >
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.4))' }}>
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#a78bfa', letterSpacing: '0.1em' }}>02 / DESIGN</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f4f4f5' }}>Prototyping</span>
          </div>

          {/* Step 3 */}
          <div
            data-step
            style={{
              background: '#27272a',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '1rem',
            }}
          >
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(52, 211, 153, 0.4))' }}>
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#34d399', letterSpacing: '0.1em' }}>03 / BUILD</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f4f4f5' }}>Engineering</span>
          </div>

          {/* Step 4 */}
          <div
            data-step
            style={{
              background: '#3f3f46',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: '1rem',
            }}
          >
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))' }}>
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#f59e0b', letterSpacing: '0.1em' }}>04 / SHIPPED</span>
            <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f4f4f5' }}>Launch</span>
          </div>
        </div>

        <div slot="track">
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.12em', color: '#60a5fa', marginBottom: '0.5rem' }}>01 / DISCOVER</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>User Discovery</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              We research market requirements, conduct user surveys, and define core specifications for our products.
            </p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.12em', color: '#a78bfa', marginBottom: '0.5rem' }}>02 / DESIGN</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>UI/UX Design</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              Wireframes are translated to high-fidelity designs, interactive prototypes, and design system tokens.
            </p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.12em', color: '#34d399', marginBottom: '0.5rem' }}>03 / BUILD</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Component Engineering</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              Development teams implement semantic component markup, modular styling, and unit test suites.
            </p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.12em', color: '#f59e0b', marginBottom: '0.5rem' }}>04 / LAUNCH</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Release & Deploy</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              The component is published, docs sites are updated, and telemetry monitors performance metrics.
            </p>
          </section>
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
