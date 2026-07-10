import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function RevealWipeDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-storytelling mode="reveal-wipe" track-alignment="right">
        <div slot="stage" style={{ height: '100%' }}>
          {/* Base layer — visible underneath */}
          <div data-step style={{
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
          }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: '#9ca3af' }}>Before</span>
          </div>
          {/* Reveal layer — wipes in from left as you scroll */}
          <div data-step style={{
            background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
          }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: '#f9fafb' }}>After</span>
          </div>
        </div>

        <div slot="track">
          <section class="step" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Before</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>The original state. Scroll down to see the transformation unfold.</p>
          </section>
          <section class="step" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>After</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>The reveal layer wipes in continuously, perfectly tracking your scroll position.</p>
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
