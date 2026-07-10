import '@uibit/text-rotator';
import { UsageExample } from '../../../../types/docs';

function SlideTransitionDemo() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
      <uibit-text-rotator interval="2000" transition="slide">
        Build websites{' '}
        <span slot="text">faster</span>
        <span slot="text">better</span>
        <span slot="text">smarter</span>
        <span slot="text">together</span>
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
