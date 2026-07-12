import '@uibit/image-comparison';
import { UsageExample } from '../../../../types/docs';

function DiagonalDemo() {
  return (
    <div style={{ width: '100%', height: '350px', maxWidth: '600px', margin: '0 auto' }}>
      <uibit-image-comparison mode="diagonal" progress={45}>
        <img
          slot="before"
          src="https://picsum.photos/seed/city-day/800/500"
          alt="City day view"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <img
          slot="after"
          src="https://picsum.photos/seed/city-night/800/500"
          alt="City night view"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </uibit-image-comparison>
    </div>
  );
}

const example: UsageExample = {
  title: 'Diagonal Peel',
  description: 'Slopes the reveal cut line diagonally, sliding it from top-left to bottom-right.',
  Demo: DiagonalDemo,
};

export default example;
