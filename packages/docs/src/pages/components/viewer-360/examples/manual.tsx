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
  code: {
    html: `<uibit-360-viewer>
  <img src="frame-1.jpg" alt="Frame 1" />
  <img src="frame-2.jpg" alt="Frame 2" />
  <img src="frame-3.jpg" alt="Frame 3" />
  <img src="frame-4.jpg" alt="Frame 4" />
</uibit-360-viewer>`,
    react: `import '@uibit/360-viewer';

function ManualViewer() {
  const frames = ['frame-1.jpg', 'frame-2.jpg', 'frame-3.jpg', 'frame-4.jpg'];

  return (
    <uibit-360-viewer>
      {frames.map((src, idx) => (
        <img key={idx} src={src} alt={\`Frame \${idx + 1}\`} />
      ))}
    </uibit-360-viewer>
  );
}`,
  },
  Demo: ManualDemo,
};

export default manualExample;
