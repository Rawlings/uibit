import '@uibit/effect-particles';
import manifest from '@uibit/effect-particles/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import basicExample from './examples/basic';
import basicRaw from './examples/basic?raw';
import snowExample from './examples/snow';
import snowRaw from './examples/snow?raw';
import rainExample from './examples/rain';
import rainRaw from './examples/rain?raw';
import neuralExample from './examples/neural';
import neuralRaw from './examples/neural?raw';
import matrixExample from './examples/matrix';
import matrixRaw from './examples/matrix?raw';
import waveExample from './examples/wave';
import waveRaw from './examples/wave?raw';
import vortexExample from './examples/vortex';
import vortexRaw from './examples/vortex?raw';
import smokeExample from './examples/smoke';
import smokeRaw from './examples/smoke?raw';
import bubblesExample from './examples/bubbles';
import bubblesRaw from './examples/bubbles?raw';
import gridExample from './examples/grid';
import gridRaw from './examples/grid?raw';
import auroraExample from './examples/aurora';
import auroraRaw from './examples/aurora?raw';
import noiseExample from './examples/noise';
import noiseRaw from './examples/noise?raw';
import ringsExample from './examples/rings';
import ringsRaw from './examples/rings?raw';

function EffectParticlesDemo() {
  return (
    <div style={{ height: '350px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <uibit-effect-particles count={80} speed={1.0} connect connect-distance={90} hover-effect="repel">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>Particle Field</h3>
          <p style={{ maxWidth: '400px', color: '#4b5563', lineHeight: '1.6' }}>
            Interactive canvas backdrops with thirteen animation modes. Hover to repel.
          </p>
        </div>
      </uibit-effect-particles>
    </div>
  );
}

const processedExamples = [
  { ...basicExample, code: { react: basicRaw } },
  { ...snowExample, code: { react: snowRaw } },
  { ...rainExample, code: { react: rainRaw } },
  { ...neuralExample, code: { react: neuralRaw } },
  { ...matrixExample, code: { react: matrixRaw } },
  { ...waveExample, code: { react: waveRaw } },
  { ...vortexExample, code: { react: vortexRaw } },
  { ...smokeExample, code: { react: smokeRaw } },
  { ...bubblesExample, code: { react: bubblesRaw } },
  { ...gridExample, code: { react: gridRaw } },
  { ...auroraExample, code: { react: auroraRaw } },
  { ...noiseExample, code: { react: noiseRaw } },
  { ...ringsExample, code: { react: ringsRaw } },
];

const data: ComponentDocData = {
  id: 'effect-particles',
  title: 'Effect Particles',
  description:
    'Renders animated canvas backgrounds across thirteen distinct modes — from drifting particles and code rain to flow fields, aurora curtains, and pulsing grids. All modes react to mouse gestures and compose cleanly as hero backgrounds.',
  packageName: '@uibit/effect-particles',
  tagName: 'uibit-effect-particles',
  manifest,
  Demo: EffectParticlesDemo,
  demoCode: {
    html: `<uibit-effect-particles count="80" speed="1" connect connect-distance="90" hover-effect="repel">
  <div>Content goes here</div>
</uibit-effect-particles>`,
    react: `import '@uibit/effect-particles';

function Demo() {
  return (
    <uibit-effect-particles count={80} speed={1.0} connect connect-distance={90} hover-effect="repel">
      <div>Content goes here</div>
    </uibit-effect-particles>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Canvas rendering uses pointer-events: none, so all slotted text, buttons, and links remain fully accessible to screen readers and keyboard users.',
      'Ensure particle colors have sufficient contrast against foreground text, or reduce opacity via --uibit-effect-particles-opacity.',
    ],
  },
  features: [
    'Thirteen animation modes: float, snow, rain, neural, matrix, wave, vortex, smoke, bubbles, grid, aurora, noise, rings',
    'Automatically scales to retina displays via devicePixelRatio',
    'Accepts multi-color palettes from space/comma-separated CSS custom properties',
    'Adapts to container size via ResizeObserver — works in any layout context',
    'Hover interaction modes: repel, attract, grab, or none — configurable per instance',
    'Aurora mode uses canvas blur filter for soft, glowing curtain effects',
    'Grid mode supports a ripple-wave pulse animation with per-dot phase offsets',
    'Noise mode traces particles through a sine/cosine flow field for organic movement',
  ],
};

export default data;
