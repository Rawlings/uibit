import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function SplitAlternateDemo() {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#09090b', position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <uibit-effect-storytelling mode="sequence-fade" track-alignment="split-alternate" navigation>
        {/* Premium Dark Stage */}
        <div slot="stage" style={{ height: '100%', background: 'radial-gradient(circle at center, #1e1b4b 0%, #09090b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Step 1: Design Phase */}
            <div data-step style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.05em' }}>Visual Blueprint</span>
            </div>

            {/* Step 2: Code Phase */}
            <div data-step style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.05em' }}>Engine Architecture</span>
            </div>

            {/* Step 3: Deployment Phase */}
            <div data-step style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
              <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 0 20px rgba(245, 158, 11, 0.15)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5" />
                  <path d="M12 2v10" />
                  <path d="m17 7-5-5-5 5" />
                </svg>
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.05em' }}>Global Optimization</span>
            </div>

          </div>
        </div>

        {/* Narrative Track with alternating layout styling */}
        <div slot="track" style={{ padding: '4rem 0' }}>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
            <div style={{
              background: 'rgba(20, 20, 23, 0.8)',
              backdropFilter: 'blur(12px)',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              width: '100%'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>Phase 01</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#f4f4f5', letterSpacing: '-0.02em' }}>Interactive UX Prototyping</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
                Craft complex vector layouts and interactions. Standardize interface grids, sizing scales, and user flow checkpoints before production.
              </p>
            </div>
          </section>

          <section className="step" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
            <div style={{
              background: 'rgba(20, 20, 23, 0.8)',
              backdropFilter: 'blur(12px)',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              width: '100%'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>Phase 02</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#f4f4f5', letterSpacing: '-0.02em' }}>Declarative Engine Delivery</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
                Synthesize styling structures directly using shadow boundaries. Guarantee high-speed rendering pipelines and isolated logic threads.
              </p>
            </div>
          </section>

          <section className="step" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
            <div style={{
              background: 'rgba(20, 20, 23, 0.8)',
              backdropFilter: 'blur(12px)',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              width: '100%'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>Phase 03</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#f4f4f5', letterSpacing: '-0.02em' }}>Production-Ready Release</h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
                Deploy to global CDN architectures. Achieve instant loading priorities and perfect core web vitals across every device screen size.
              </p>
            </div>
          </section>
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'Split Alternate Layout',
  description: 'Slotted narrative track steps alternate left and right sides on scroll, keeping the visual stage fixed. Ideal for engaging editorial and marketing timelines.',
  Demo: SplitAlternateDemo,
};

export default example;
