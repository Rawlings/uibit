import '@uibit/comparison-curtain';
import { UsageExample } from '../../../../types/docs';

function HorizontalDemo() {
  return (
    <div style={{ height: '350px', maxWidth: '600px', margin: '0 auto' }}>
      <uibit-comparison-curtain mode="horizontal" progress={50}>
        <img
          slot="before"
          src="https://picsum.photos/seed/forest-summer/800/500"
          alt="Summer forest landscape"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <img
          slot="after"
          src="https://picsum.photos/seed/forest-winter/800/500"
          alt="Winter forest landscape"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </uibit-comparison-curtain>
    </div>
  );
}

const example: UsageExample = {
  title: 'Horizontal Split',
  description: 'A traditional left-to-right slider showing a transition between summer and winter views.',
  Demo: HorizontalDemo,
};

export default example;
