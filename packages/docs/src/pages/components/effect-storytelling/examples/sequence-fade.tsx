import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function SequenceFadeDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-storytelling mode="sequence-fade" track-alignment="right">
        <div slot="stage" style={{ background: '#f9fafb', height: '100%' }}>
          <div data-step style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem' }}>
            📦
          </div>
          <div data-step style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem' }}>
            🔧
          </div>
          <div data-step style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem' }}>
            🚀
          </div>
        </div>

        <div slot="track" style={{ padding: '0 2rem' }}>
          <section class="step" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 0' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Install</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>Add the package with a single command. Zero build configuration required.</p>
          </section>
          <section class="step" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 0' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Configure</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>Tune behaviour through attributes and CSS custom properties — no JavaScript API required.</p>
          </section>
          <section class="step" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 0' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Deploy</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>Ship to production. The component adds no runtime overhead beyond the scroll listener.</p>
          </section>
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'Sequence Fade',
  description: 'Stage children fade and slide as the corresponding track step scrolls into view. The classic step-by-step documentation layout.',
  Demo: SequenceFadeDemo,
};

export default example;
