import '@uibit/text-typing';
import { UsageExample } from '../../../../types/docs';

function HeroHeadlineDemo() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
      We help teams{' '}
      <uibit-text-typing type-speed="75" typo-rate="0.05">
        <span>ship faster.</span>
        <span>build better.</span>
        <span>scale confidently.</span>
        <span>move with clarity.</span>
      </uibit-text-typing>
    </h2>
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
