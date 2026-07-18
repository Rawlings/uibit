import '@uibit/360-viewer';
import type { UsageExample } from '../../../../types/docs';

const frames = Array.from(
  { length: 73 },
  (_, i) =>
    `https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/orange-${i + 1}.jpg`,
);

function AutoRotateDemo() {
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
  description:
    'The viewer rotates automatically and pauses when the user drags, resuming after 2 seconds of idle.',
  Demo: AutoRotateDemo,
};

export default autoRotateExample;
