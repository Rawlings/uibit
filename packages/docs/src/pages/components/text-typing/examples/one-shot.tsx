import '@uibit/text-typing';
import { UsageExample } from '../../../../types/docs';

function OneShotDemo() {
  return (
    <p className="text-2xl font-medium text-gray-900 tracking-tight">
      <uibit-text-typing loop="false" pause-after="2000" type-speed="80">
        <span slot="text">Loading complete.</span>
        <span slot="text">Welcome back.</span>
      </uibit-text-typing>
    </p>
  );
}

const oneShot: UsageExample = {
  title: 'One-shot (no loop)',
  description: 'Types through all phrases once and stops on the last. Good for loading states or one-time reveals.',
  Demo: OneShotDemo,
};

export default oneShot;
