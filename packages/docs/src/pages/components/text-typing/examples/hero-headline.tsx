import '@uibit/text-typing';
import { UsageExample } from '../../../../types/docs';

function HeroHeadlineDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        The headline below cycles through phrases with realistic typing and deletion:
      </p>
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
          We help teams{' '}
          <uibit-text-typing
            type-speed="75"
            typo-rate="0.05"
            style={{ color: '#111827' }}
          >
            <span>ship faster.</span>
            <span>build better.</span>
            <span>scale confidently.</span>
            <span>move with clarity.</span>
          </uibit-text-typing>
        </h2>
        <p className="text-gray-500 mt-4 text-sm">
          Slight speed variance and auto-correcting typos make the animation feel human.
        </p>
      </div>
    </div>
  );
}

const heroHeadline: UsageExample = {
  title: 'Hero Headline',
  description: 'Cycles through marketing phrases with realistic typing, deletion, and simulated typos.',
  code: {
    html: `<h2>
  We help teams
  <uibit-text-typing type-speed="75" typo-rate="0.05">
    <span>ship faster.</span>
    <span>build better.</span>
    <span>scale confidently.</span>
    <span>move with clarity.</span>
  </uibit-text-typing>
</h2>`,
    react: `import '@uibit/text-typing';

function Hero() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900">
      We help teams{' '}
      <uibit-text-typing type-speed="75" typo-rate="0.05">
        <span>ship faster.</span>
        <span>build better.</span>
        <span>scale confidently.</span>
        <span>move with clarity.</span>
      </uibit-text-typing>
    </h2>
  );
}`,
  },
  Demo: HeroHeadlineDemo,
};

export default heroHeadline;
