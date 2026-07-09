import '@uibit/360-viewer';
import { UsageExample } from '../../../../types/docs';

function AutoRotateDemo() {
  const frames = [
    'https://picsum.photos/seed/sneaker1/600/400',
    'https://picsum.photos/seed/sneaker2/600/400',
    'https://picsum.photos/seed/sneaker3/600/400',
    'https://picsum.photos/seed/sneaker4/600/400',
    'https://picsum.photos/seed/sneaker5/600/400',
    'https://picsum.photos/seed/sneaker6/600/400',
  ];

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg p-4 border border-gray-200">
      <uibit-360-viewer auto-rotate="true" rotation-speed={150}>
        {frames.map((src, idx) => (
          <img key={idx} src={src} alt={`Frame ${idx + 1}`} />
        ))}
      </uibit-360-viewer>
    </div>
  );
}

const autoRotateExample: UsageExample = {
  title: 'Auto-rotate',
  description: 'The viewer rotates automatically and pauses when the user drags, resuming after 2 seconds of idle.',
  code: {
    html: `<uibit-360-viewer auto-rotate="true" rotation-speed="150">
  <img src="frame-1.jpg" alt="Frame 1" />
  <img src="frame-2.jpg" alt="Frame 2" />
  <img src="frame-3.jpg" alt="Frame 3" />
  <img src="frame-4.jpg" alt="Frame 4" />
  <img src="frame-5.jpg" alt="Frame 5" />
  <img src="frame-6.jpg" alt="Frame 6" />
</uibit-360-viewer>`,
    react: `import '@uibit/360-viewer';

function AutoRotateViewer() {
  const frames = [
    'frame-1.jpg', 'frame-2.jpg', 'frame-3.jpg',
    'frame-4.jpg', 'frame-5.jpg', 'frame-6.jpg',
  ];

  return (
    <uibit-360-viewer auto-rotate="true" rotation-speed={150}>
      {frames.map((src, idx) => (
        <img key={idx} src={src} alt={\`Frame \${idx + 1}\`} />
      ))}
    </uibit-360-viewer>
  );
}`,
  },
  Demo: AutoRotateDemo,
};

export default autoRotateExample;
