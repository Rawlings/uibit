import '@uibit/360-viewer';
import type { UsageExample } from '../../../../types/docs';

const frames = Array.from(
  { length: 73 },
  (_, i) =>
    `https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/orange-${i + 1}.jpg`,
);

function ManualDemo() {
  return (
    <uibit-360-viewer>
      {frames.map((src, idx) => (
        <img key={idx} src={src} alt={`Frame ${idx + 1}`} />
      ))}
    </uibit-360-viewer>
  );
}

const manualExample: UsageExample = {
  title: 'Manual / drag-only',
  description:
    'Without auto-rotate the viewer is fully driven by the user — drag, swipe, or use the arrow keys to spin.',
  Demo: ManualDemo,
};

export default manualExample;
