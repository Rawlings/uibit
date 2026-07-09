import '@uibit/countdown';
import { UsageExample } from '../../../../types/docs';

function TargetDateDemo() {
  const target = new Date(Date.now() + 24 * 3600 * 1000 * 7).toISOString();

  return (
    <div className="max-w-md bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <uibit-countdown target={target} auto-start format="DD:HH:MM:SS"></uibit-countdown>
    </div>
  );
}

const example: UsageExample = {
  title: 'Target Date',
  description: 'Count down to a specific date using the target attribute.',
  code: {
    html: `<uibit-countdown target="2026-12-31T23:59:59" auto-start format="DD:HH:MM:SS"></uibit-countdown>`,
    react: `import '@uibit/countdown';

function SaleTimer() {
  const target = new Date(Date.now() + 24 * 3600 * 1000 * 7).toISOString();

  return (
    <uibit-countdown target={target} auto-start format="DD:HH:MM:SS"></uibit-countdown>
  );
}`,
  },
  Demo: TargetDateDemo,
};

export default example;
