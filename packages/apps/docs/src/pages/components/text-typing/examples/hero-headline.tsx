import '@uibit/text-typing';
import type { UsageExample } from '../../../../types/docs';

function HeroHeadlineDemo() {
  return (
    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
      <uibit-text-typing type-speed="75" typo-rate="0.05">
        We help teams <span slot="text">ship faster.</span>
        <span slot="text">build better.</span>
        <span slot="text">scale confidently.</span>
        <span slot="text">move with clarity.</span>
      </uibit-text-typing>
    </h2>
  );
}

const heroHeadline: UsageExample = {
  title: 'Hero Headline',
  description:
    'Cycles through marketing phrases with realistic typing, deletion, and simulated typos.',
  Demo: HeroHeadlineDemo,
};

export default heroHeadline;
