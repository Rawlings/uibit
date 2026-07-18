import '@uibit/countdown';
import type { UsageExample } from '../../../../types/docs';

function TargetDateDemo() {
  const target = new Date(Date.now() + 24 * 3600 * 1000 * 7).toISOString();

  return (
    <uibit-countdown
      target={target}
      auto-start
      format="DD:HH:MM:SS"
    ></uibit-countdown>
  );
}

const example: UsageExample = {
  title: 'Target Date',
  description: 'Count down to a specific date using the target attribute.',
  Demo: TargetDateDemo,
};

export default example;
