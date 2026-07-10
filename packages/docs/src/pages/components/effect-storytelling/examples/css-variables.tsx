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
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'visible', background: '#fafafa', position: 'relative' }}>
      <style>{`
        .css-var-demo {
          --uibit-effect-storytelling-stage-height: 80vh;
        }
        .css-var-demo .custom-stage {
          height: 100%;
          background: #09090b;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .css-var-demo .progress-ring {
          width: 10rem;
          height: 10rem;
          border-radius: 50%;
          border: 0.25rem solid #1f2937;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          color: #f4f4f5;
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
            #6366f1 calc(var(--story-progress, 0) * 360deg),
            transparent 0
          );
          mask: radial-gradient(farthest-side, transparent calc(100% - 0.35rem), #000 0);
          filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));
        }
      `}</style>

      <uibit-effect-storytelling className="css-var-demo" mode="sequence-fade" track-alignment="right">
        <div slot="stage" className="custom-stage">
          <div className="progress-ring">
            <div className="progress-arc"></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Progress</span>
            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#f4f4f5' }}>KPI</span>
          </div>
        </div>

        <div slot="track">
          {[1, 2, 3].map(n => (
            <section
              key={n}
              className="step"
              style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 2rem' }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Dashboard Step {n}</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
                The radial gauge visualizes scroll depth using CSS custom property <code>--story-progress</code> — completely layout scoped, zero Javascript runtime needed.
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
