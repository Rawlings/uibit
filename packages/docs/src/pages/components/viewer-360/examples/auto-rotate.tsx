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
    <uibit-360-viewer auto-rotate="true" rotation-speed={150}>
      {frames.map((src, idx) => (
        <img key={idx} src={src} alt={`Frame ${idx + 1}`} />
      ))}
    </uibit-360-viewer>
  );
}

const autoRotateExample: UsageExample = {
  title: 'Auto-rotate',
  description: 'The viewer rotates automatically and pauses when the user drags, resuming after 2 seconds of idle.',
  Demo: AutoRotateDemo,
};

export default autoRotateExample;
