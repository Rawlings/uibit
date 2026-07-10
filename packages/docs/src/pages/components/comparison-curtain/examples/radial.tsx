import '@uibit/comparison-curtain';
import { UsageExample } from '../../../../types/docs';

function RadialDemo() {
  return (
    <div style={{ height: '350px', maxWidth: '600px', margin: '0 auto' }}>
      <uibit-comparison-curtain mode="radial" progress={30} hover-reveal>
        <img
          slot="before"
          src="https://picsum.photos/seed/vintage-car/800/500"
          alt="Vintage black and white photo"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
        />
        <img
          slot="after"
          src="https://picsum.photos/seed/vintage-car/800/500"
          alt="Vintage color photo"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </uibit-comparison-curtain>
    </div>
  );
}

const example: UsageExample = {
  title: 'Radial Reveal & Hover Tracking',
  description: 'Triggers a circular magnification reveal that tracks the mouse movement without requiring dragging.',
  Demo: RadialDemo,
};

export default example;
