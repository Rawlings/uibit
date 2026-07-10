import '@uibit/text-rotator';
import { UsageExample } from '../../../../types/docs';

function FlipTransitionDemo() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
      <uibit-text-rotator interval="2500" transition="flip">
        Ship code with{' '}
        <span slot="text">confidence</span>
        <span slot="text">clarity</span>
        <span slot="text">purpose</span>
        <span slot="text">speed</span>
      </uibit-text-rotator>
    </h2>
  );
}

const flipTransition: UsageExample = {
  title: 'Flip transition',
  description: 'Words rotate in on a 3D perspective axis for a more dramatic reveal.',
  Demo: FlipTransitionDemo,
};

export default flipTransition;
