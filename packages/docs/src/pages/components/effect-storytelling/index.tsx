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
import cssVariablesExample from './examples/css-variables';
import cssVariablesRaw from './examples/css-variables?raw';

function EffectStorytellingDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-storytelling mode="sequence-fade" track-alignment="right">
        <div slot="stage" style={{ background: '#f9fafb', height: '100%' }}>
          <div
            data-step
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '1rem',
            }}
          >
            <div style={{ fontSize: '3.5rem' }}>📦</div>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.08em' }}>INSTALL</span>
          </div>
          <div
            data-step
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '1rem',
            }}
          >
            <div style={{ fontSize: '3.5rem' }}>⚡</div>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.08em' }}>COMPOSE</span>
          </div>
          <div
            data-step
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '1rem',
            }}
          >
            <div style={{ fontSize: '3.5rem' }}>🚀</div>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.08em' }}>SHIP</span>
          </div>
        </div>

        <div slot="track">
          <section
            class="step"
            style={{
              minHeight: '100vh', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '4rem 2rem',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }}>One package</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              Drop in <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '0.1em 0.3em', borderRadius: '4px' }}>@uibit/effect-storytelling</code> and
              you have the complete scroll theatre — sticky stage, scrollable track, live CSS variables.
            </p>
          </section>
          <section
            class="step"
            style={{
              minHeight: '100vh', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '4rem 2rem',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }}>Slots, not props</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              Drop any HTML into <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '0.1em 0.3em', borderRadius: '4px' }}>slot="stage"</code> and{' '}
              <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '0.1em 0.3em', borderRadius: '4px' }}>slot="track"</code>.
              Images, code blocks, canvas, video — it doesn't care.
            </p>
          </section>
          <section
            class="step"
            style={{
              minHeight: '100vh', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '4rem 2rem',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }}>Zero JS required</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              Build custom animations purely in CSS using <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '0.1em 0.3em', borderRadius: '4px' }}>--story-progress</code>,{' '}
              <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '0.1em 0.3em', borderRadius: '4px' }}>--story-step-active</code>, and{' '}
              <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '0.1em 0.3em', borderRadius: '4px' }}>--story-step-count</code>.
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
  { ...cssVariablesExample, code: { react: cssVariablesRaw } },
];

const data: ComponentDocData = {
  id: 'effect-storytelling',
  title: 'Effect Storytelling',
  description:
    'A scroll-driven layout orchestrator that creates a sticky visual stage synchronized with a scrollable narrative track. Broadcasts live scroll state as CSS custom properties for composable, zero-dependency animations.',
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
    'Four track alignment layouts: right, left, center, overlap',
    'Broadcasts --story-progress, --story-step-active, --story-step-count, --story-stage-height as CSS custom properties',
    'Fires story-progress and story-step custom events for JavaScript-driven extensions',
    'IntersectionObserver-based step detection with configurable threshold',
    'Optional CSS scroll-snap on track steps via snap-points attribute',
    'Respects prefers-reduced-motion',
  ],
};

export default data;
