import '@uibit/countdown';
import manifest from '@uibit/countdown/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function CountdownDemo() {
  const targetTime = new Date(Date.now() + 3600 * 1000 * 2.5).toISOString(); // 2.5 hours from now

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Counting down to 2 hours and 30 minutes from now:
      </p>
      <div className="max-w-md bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <uibit-countdown target={targetTime} autoStart={true} format="HH:MM:SS"></uibit-countdown>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'countdown',
  title: 'Countdown',
  description:
    'Highly customizable countdown timer. Supports target date markers or set durations, reactive timers, and custom format templates.',
  packageName: '@uibit/countdown',
  tagName: 'uibit-countdown',
  manifest,
  Demo: CountdownDemo,
  usages: [
    {
      title: 'HTML Integration',
      code: '<uibit-countdown target="2026-12-31T23:59:59" format="DD:HH:MM:SS"></uibit-countdown>',
    },
    {
      title: 'React Integration',
      code: `import '@uibit/countdown';

function SaleTimer() {
  const threeHours = 3 * 3600 * 1000;

  return (
    <uibit-countdown duration={threeHours} format="HH:MM:SS" />
  );
}`,
    },
  ],
  features: [
    'Calculates offset once to prevent interval time drifting',
    'Internal count variables hidden from public API attributes',
    'Full support for customizable segment formatting (DD, HH, MM, SS)',
    'Polite ARIA live landmark alerts for screen readers',
    'Dynamic update hooks restart automatically when target date changes',
  ],
};

export default data;
