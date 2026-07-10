import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function LayerDepthDemo() {
  const layers = [
    { label: 'Surface', bg: '#f9fafb', color: '#111827' },
    { label: 'Logic', bg: '#f3f4f6', color: '#1f2937' },
    { label: 'Core', bg: '#e5e7eb', color: '#374151' },
  ];

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-storytelling mode="layer-depth" track-alignment="left">
        <div slot="stage" style={{ height: '100%' }}>
          {layers.map(({ label, bg, color }) => (
            <div
              key={label}
              data-step
              style={{
                background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
                fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.02em', color,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div slot="track">
          {layers.map(({ label }) => (
            <section
              key={label}
              class="step"
              style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>{label} Layer</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
                Each layer recedes in 3D as focus shifts to the next. Track is on the left in this example.
              </p>
            </section>
          ))}
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
