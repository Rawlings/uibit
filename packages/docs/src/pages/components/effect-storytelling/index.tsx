import '@uibit/effect-storytelling';
import manifest from '@uibit/effect-storytelling/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import sequenceFadeExample from './examples/sequence-fade';
import sequenceFadeRaw from './examples/sequence-fade?raw';
import revealWipeExample from './examples/reveal-wipe';
import revealWipeRaw from './examples/reveal-wipe?raw';
import layerDepthExample from './examples/layer-depth';
import layerDepthRaw from './examples/layer-depth?raw';
import zoomFocusExample from './examples/zoom-focus';
import zoomFocusRaw from './examples/zoom-focus?raw';
import splitAlternateExample from './examples/split-alternate';
import splitAlternateRaw from './examples/split-alternate?raw';
import stickyTopExample from './examples/sticky-top';
import stickyTopRaw from './examples/sticky-top?raw';

function EffectStorytellingDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'visible', background: '#fafafa', position: 'relative' }}>
      <uibit-effect-storytelling mode="sequence-fade" track-alignment="right">
        <div slot="stage" style={{ background: '#09090b', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Step 1: Core Blueprint */}
          <div
            data-step
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '1.5rem', width: '100%', padding: '2rem',
              boxSizing: 'border-box',
            }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.4))' }}>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6366f1', letterSpacing: '0.15em', textTransform: 'uppercase' }}>01 / Blueprint</span>
            <h4 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f4f4f5', margin: 0, textAlign: 'center' }}>Reactive Core</h4>
          </div>

          {/* Step 2: Shadow DOM */}
          <div
            data-step
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '1.5rem', width: '100%', padding: '2rem',
              boxSizing: 'border-box',
            }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#10b981', letterSpacing: '0.15em', textTransform: 'uppercase' }}>02 / Isolation</span>
            <h4 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f4f4f5', margin: 0, textAlign: 'center' }}>Shadow DOM Encapsulation</h4>
          </div>

          {/* Step 3: Accessibility */}
          <div
            data-step
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '1.5rem', width: '100%', padding: '2rem',
              boxSizing: 'border-box',
            }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))' }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8a2.5 2.5 0 0 1 2 2" />
              <path d="M12 12h.01" />
              <path d="M16 16c-1.5 1.5-3.5 2-5.5 1.5s-4-2-4.5-4" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#f59e0b', letterSpacing: '0.15em', textTransform: 'uppercase' }}>03 / Accessibility</span>
            <h4 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f4f4f5', margin: 0, textAlign: 'center' }}>Inclusive Foundations</h4>
          </div>
        </div>

        <div slot="track">
          <section
            className="step"
            style={{
              minHeight: '80vh', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '4rem 3rem',
            }}
          >
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#09090b', letterSpacing: '-0.02em' }}>Declarative & Reactive</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.8', maxWidth: '28rem', fontSize: '0.95rem' }}>
              UIBit components leverage Lit's fast reactive properties. The element automatically re-renders only when observed state changes, ensuring lightning-fast updates without a heavy virtual DOM.
            </p>
          </section>
          <section
            className="step"
            style={{
              minHeight: '80vh', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '4rem 3rem',
            }}
          >
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#09090b', letterSpacing: '-0.02em' }}>Scoped Styles</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.8', maxWidth: '28rem', fontSize: '0.95rem' }}>
              Every component uses Shadow DOM to fully isolate its CSS rules. Global styles won't bleed in, and component styles won't break your site layout. Safe, predictable, and fully modular.
            </p>
          </section>
          <section
            className="step"
            style={{
              minHeight: '80vh', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '4rem 3rem',
            }}
          >
            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#09090b', letterSpacing: '-0.02em' }}>WCAG Compliant</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.8', maxWidth: '28rem', fontSize: '0.95rem' }}>
              Designed from the ground up to support screen readers, keyboard navigation, and custom focus outlines. Accessibility isn't an afterthought; it is built into the blueprint.
            </p>
          </section>
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const processedExamples = [
  { ...sequenceFadeExample, code: { react: sequenceFadeRaw } },
  { ...revealWipeExample, code: { react: revealWipeRaw } },
  { ...layerDepthExample, code: { react: layerDepthRaw } },
  { ...zoomFocusExample, code: { react: zoomFocusRaw } },
  { ...splitAlternateExample, code: { react: splitAlternateRaw } },
  { ...stickyTopExample, code: { react: stickyTopRaw } },
];

const data: ComponentDocData = {
  id: 'effect-storytelling',
  title: 'Effect Storytelling',
  description:
    'A scroll-driven layout orchestrator that creates a sticky visual stage synchronized with a scrollable narrative track using native CSS Scroll-driven Animations.',
  packageName: '@uibit/effect-storytelling',
  tagName: 'uibit-effect-storytelling',
  manifest,
  Demo: EffectStorytellingDemo,
  demoCode: {
    html: `<uibit-effect-storytelling mode="sequence-fade" track-alignment="right">

  <div slot="stage">
    <div data-step>Visual A</div>
    <div data-step>Visual B</div>
    <div data-step>Visual C</div>
  </div>

  <div slot="track">
    <section class="step">Step 1 narrative</section>
    <section class="step">Step 2 narrative</section>
    <section class="step">Step 3 narrative</section>
  </div>

</uibit-effect-storytelling>`,
    react: `import '@uibit/effect-storytelling';

function Demo() {
  return (
    <uibit-effect-storytelling mode="sequence-fade" track-alignment="right">
      <div slot="stage">
        <div data-step>Visual A</div>
        <div data-step>Visual B</div>
        <div data-step>Visual C</div>
      </div>
      <div slot="track">
        <section class="step">Step 1 narrative</section>
        <section class="step">Step 2 narrative</section>
        <section class="step">Step 3 narrative</section>
      </div>
    </uibit-effect-storytelling>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Narrative content in slot="track" is always in the natural reading order and fully accessible to screen readers.',
      'Stage visuals are decorative by default; add descriptive aria-label or role="img" + aria-label to slotted stage content when it conveys meaning.',
      'The component respects prefers-reduced-motion: all built-in transitions are disabled when the user prefers reduced motion.',
      'Progress and step-change custom events can be used to drive ARIA live regions for step announcements.',
    ],
  },
  features: [
    'Four built-in modes: sequence-fade, reveal-wipe, layer-depth, zoom-focus',
    'Three composable slots: stage (sticky visuals), track (narrative), overlay (HUD layer)',
    'Comprehensive layout system: split-left, split-right, split-alternate, overlay-center, overlay-bottom, sticky-top, sticky-bottom, headless',
    'Native CSS Scroll-driven Animations view-timeline integrations',
    'Optional CSS scroll-snap on track steps via snap-points attribute',
    'Respects prefers-reduced-motion',
  ],
};

export default data;
