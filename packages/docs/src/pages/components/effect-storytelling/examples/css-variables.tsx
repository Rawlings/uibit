import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

/*
  Demonstrates user-authored effects driven entirely by the CSS custom properties
  that the component broadcasts onto :host:
    --story-progress     (0 → 1, continuous)
    --story-step-active  (integer)
    --story-step-count   (integer)
    --story-stage-height (e.g. "100vh")
*/
function CssVariablesDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <style>{`
        .css-var-demo {
          --uibit-effect-storytelling-stage-height: 80vh;
        }
        .css-var-demo .custom-stage {
          height: 100%;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .css-var-demo .progress-ring {
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          border: 0.25rem solid #e5e7eb;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }
        /* Rotate a pseudo-element based on --story-progress */
        @property --story-progress {
          syntax: '<number>';
          initial-value: 0;
          inherits: true;
        }
        .css-var-demo .progress-arc {
          position: absolute;
          inset: -0.25rem;
          border-radius: 50%;
          background: conic-gradient(
            #111827 calc(var(--story-progress, 0) * 360deg),
            transparent 0
          );
          mask: radial-gradient(farthest-side, transparent calc(100% - 0.35rem), #000 0);
        }
      `}</style>

      <uibit-effect-storytelling class="css-var-demo" mode="sequence-fade" track-alignment="right">
        <div slot="stage" class="custom-stage">
          <div class="progress-ring">
            <div class="progress-arc"></div>
            <span>scroll</span>
          </div>
        </div>

        <div slot="track">
          {[1, 2, 3].map(n => (
            <section
              key={n}
              class="step"
              style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Step {n}</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
                The ring above is drawn entirely with <code>conic-gradient</code> reading
                {' '}<code>--story-progress</code> — zero JavaScript.
              </p>
            </section>
          ))}
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'CSS Custom Properties',
  description: 'Use --story-progress and --story-step-active in your own stylesheets to drive completely bespoke animations without writing any JavaScript.',
  Demo: CssVariablesDemo,
};

export default example;
