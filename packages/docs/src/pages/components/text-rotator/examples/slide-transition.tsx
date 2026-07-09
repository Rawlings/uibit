import '@uibit/text-rotator';
import { UsageExample } from '../../../../types/docs';

function SlideTransitionDemo() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
      Build websites{' '}
      <uibit-text-rotator interval="2000" transition="slide">
        <span>faster</span>
        <span>better</span>
        <span>smarter</span>
        <span>together</span>
      </uibit-text-rotator>
    </h2>
  );
}

const slideTransition: UsageExample = {
  title: 'Slide transition',
  description: 'Words slide vertically into view. The default transition style.',
  Demo: SlideTransitionDemo,
};

export default slideTransition;
