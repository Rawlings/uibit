import '@uibit/text-typing';
import { UsageExample } from '../../../../types/docs';

function OneShotDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Types through two phrases once and stops on the last — no looping or deletion after the final phrase:
      </p>
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
        <p className="text-2xl font-medium text-gray-900 tracking-tight">
          <uibit-text-typing
            loop="false"
            pause-after="2000"
            type-speed="80"
            style={{ color: '#111827' }}
          >
            <span>Loading complete.</span>
            <span>Welcome back.</span>
          </uibit-text-typing>
        </p>
        <p className="text-gray-500 mt-4 text-sm">
          Useful for loading states, onboarding reveals, or any one-time message sequence.
        </p>
      </div>
    </div>
  );
}

const oneShot: UsageExample = {
  title: 'One-shot (no loop)',
  description: 'Types through all phrases once and stops on the last. Good for loading states or one-time reveals.',
  code: {
    html: `<uibit-text-typing loop="false" pause-after="2000" type-speed="80">
  <span>Loading complete.</span>
  <span>Welcome back.</span>
</uibit-text-typing>`,
    react: `import '@uibit/text-typing';

function LoadingReveal() {
  return (
    <p>
      <uibit-text-typing loop="false" pause-after="2000" type-speed="80">
        <span>Loading complete.</span>
        <span>Welcome back.</span>
      </uibit-text-typing>
    </p>
  );
}`,
  },
  Demo: OneShotDemo,
};

export default oneShot;
