import '@uibit/360-viewer';
import { UsageExample } from '../../../../types/docs';

function ManualDemo() {
  const frames = [
    'https://picsum.photos/seed/orbit1/600/400',
    'https://picsum.photos/seed/orbit2/600/400',
    'https://picsum.photos/seed/orbit3/600/400',
    'https://picsum.photos/seed/orbit4/600/400',
  ];

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
  description: 'Without auto-rotate the viewer is fully driven by the user — drag, swipe, or use the arrow keys to spin.',
  Demo: ManualDemo,
};

export default manualExample;
