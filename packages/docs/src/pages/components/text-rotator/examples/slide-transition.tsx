import '@uibit/text-rotator';
import { UsageExample } from '../../../../types/docs';

function SlideTransitionDemo() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
      <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
        Build websites{' '}
        <uibit-text-rotator
          interval="2000"
          transition="slide"
          style={{ color: '#111827' }}
        >
          <span>faster</span>
          <span>better</span>
          <span>smarter</span>
          <span>together</span>
        </uibit-text-rotator>
      </h2>
    </div>
  );
}

const slideTransition: UsageExample = {
  title: 'Slide transition',
  description: 'Words slide vertically into view. The default transition style.',
  code: {
    html: `<h2>
  Build websites
  <uibit-text-rotator interval="2000" transition="slide">
    <span>faster</span>
    <span>better</span>
    <span>smarter</span>
    <span>together</span>
  </uibit-text-rotator>
</h2>`,
    react: `import '@uibit/text-rotator';

function Hero() {
  return (
    <h2>
      Build websites{' '}
      <uibit-text-rotator interval="2000" transition="slide">
        <span>faster</span>
        <span>better</span>
        <span>smarter</span>
        <span>together</span>
      </uibit-text-rotator>
    </h2>
  );
}`,
  },
  Demo: SlideTransitionDemo,
};

export default slideTransition;
