import '@uibit/text-rotator';
import { UsageExample } from '../../../../types/docs';

function FlipTransitionDemo() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
      <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
        Ship code with{' '}
        <uibit-text-rotator
          interval="2500"
          transition="flip"
          style={{ color: '#111827' }}
        >
          <span>confidence</span>
          <span>clarity</span>
          <span>purpose</span>
          <span>speed</span>
        </uibit-text-rotator>
      </h2>
    </div>
  );
}

const flipTransition: UsageExample = {
  title: 'Flip transition',
  description: 'Words rotate in on a 3D perspective axis for a more dramatic reveal.',
  code: {
    html: `<h2>
  Ship code with
  <uibit-text-rotator interval="2500" transition="flip">
    <span>confidence</span>
    <span>clarity</span>
    <span>purpose</span>
    <span>speed</span>
  </uibit-text-rotator>
</h2>`,
    react: `import '@uibit/text-rotator';

function Hero() {
  return (
    <h2>
      Ship code with{' '}
      <uibit-text-rotator interval="2500" transition="flip">
        <span>confidence</span>
        <span>clarity</span>
        <span>purpose</span>
        <span>speed</span>
      </uibit-text-rotator>
    </h2>
  );
}`,
  },
  Demo: FlipTransitionDemo,
};

export default flipTransition;
