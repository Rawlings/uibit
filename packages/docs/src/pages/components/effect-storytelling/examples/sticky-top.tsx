import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function StickyTopDemo() {
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#09090b', position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <uibit-effect-storytelling mode="zoom-focus" track-alignment="sticky-top">
        {/* Sticky Top Visual Stage */}
        <div slot="stage" style={{ height: '100%', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Step A: OLED Screen */}
            <div data-step style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem' }}>
              <div style={{ width: '120px', height: '60px', borderRadius: '8px', border: '2px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)', boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: '4px', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '4px' }}></div>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.05em' }}>LTPO OLED Display</span>
            </div>

            {/* Step B: Battery Module */}
            <div data-step style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem' }}>
              <div style={{ width: '100px', height: '50px', borderRadius: '6px', border: '2px solid #10b981', background: 'rgba(16, 185, 129, 0.05)', position: 'relative', display: 'flex', alignItems: 'center', padding: '3px', boxSizing: 'border-box' }}>
                <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', borderRadius: '3px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)' }}></div>
                <div style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)', width: '4px', height: '16px', background: '#10b981', borderRadius: '0 2px 2px 0' }}></div>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.05em' }}>Lithium-Polymer Cells</span>
            </div>

            {/* Step C: Camera Lens */}
            <div data-step style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #fbbf24', background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.1) 0%, rgba(0,0,0,0) 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(251, 191, 36, 0.15)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid rgba(251, 191, 36, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fbbf24' }}></div>
                </div>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f4f4f5', letterSpacing: '0.05em' }}>Optics & Image Array</span>
            </div>

          </div>
        </div>

        {/* Narrative Track */}
        <div slot="track" style={{ padding: '0 1.5rem', background: '#09090b' }}>
          <section className="step" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#3b82f6', letterSpacing: '-0.01em' }}>Fluid OLED Panels</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '0.9rem', margin: 0 }}>
              Deploy ultra-high dynamic contrast ratios. Standardize display layers with adaptive refresh cycles ranging dynamically between 1Hz and 120Hz.
            </p>
          </section>

          <section className="step" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#10b981', letterSpacing: '-0.01em' }}>Optimized Energy Storage</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '0.9rem', margin: 0 }}>
              Maximize uptime capabilities using intelligent power distribution algorithms coupled with high-density charging circuits.
            </p>
          </section>

          <section className="step" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fbbf24', letterSpacing: '-0.01em' }}>Precision Aperture Array</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontSize: '0.9rem', margin: 0 }}>
              Deliver absolute clarity across low-light situations. Standardize noise reduction filters and depth sensor tracking natively.
            </p>
          </section>
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'Sticky Top Layout',
  description: 'Visual stage is fixed to the top half of the screen while narrative content scrolls underneath. Perfect for mobile-first product specs.',
  Demo: StickyTopDemo,
};

export default example;
