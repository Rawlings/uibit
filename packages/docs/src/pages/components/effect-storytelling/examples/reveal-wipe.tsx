import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function RevealWipeDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'visible', background: '#fafafa', position: 'relative' }}>
      <uibit-effect-storytelling mode="reveal-wipe" track-alignment="right">
        <div slot="stage" style={{ height: '100%' }}>
          {/* Base layer — Wireframe */}
          <div data-step style={{
            background: '#09090b',
            display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
          }}>
            <div style={{
              width: '18rem', padding: '1.5rem', borderRadius: '8px', border: '1px dashed #3f3f46',
              background: 'transparent', display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              <div style={{ width: '4rem', height: '0.5rem', background: '#27272a', borderRadius: '2px' }}></div>
              <div style={{ width: '100%', height: '3.5rem', background: '#27272a', borderRadius: '4px', border: '1px dashed #3f3f46' }}></div>
              <div style={{ width: '10rem', height: '0.5rem', background: '#27272a', borderRadius: '2px' }}></div>
              <div style={{ width: '7rem', height: '0.5rem', background: '#27272a', borderRadius: '2px' }}></div>
            </div>
          </div>
          {/* Reveal layer — High-Fidelity Dashboard Card */}
          <div data-step style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
          }}>
            <div style={{
              width: '18rem', padding: '1.5rem', borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}>
              <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600, letterSpacing: '0.05em' }}>ANALYTICS</span>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f4f4f5', letterSpacing: '-0.03em' }}>
                $48,259.00
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#34d399', fontSize: '0.875rem', fontWeight: 600 }}>+12.4%</span>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>vs last month</span>
              </div>
              <div style={{ width: '100%', height: '3.5rem', position: 'relative', overflow: 'hidden' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0 25 Q 20 5, 40 20 T 80 10 T 100 5 L 100 30 L 0 30 Z" fill="rgba(99, 102, 241, 0.15)" />
                  <path d="M0 25 Q 20 5, 40 20 T 80 10 T 100 5" fill="none" stroke="#6366f1" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div slot="track">
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Wireframe Blueprint</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>The initial conceptual wireframe layout. Scroll down to see the design come to life.</p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>High-Fidelity Finish</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>The high-fidelity glassmorphic dashboard card wipes in, mapping 1:1 with your scroll progress.</p>
          </section>
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'Reveal Wipe',
  description: 'The second stage child wipes in from left as scroll progress increases. Ideal for before/after comparisons or product reveal sequences.',
  Demo: RevealWipeDemo,
};

export default example;
