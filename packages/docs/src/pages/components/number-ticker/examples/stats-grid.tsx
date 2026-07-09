import '@uibit/number-ticker';
import { UsageExample } from '../../../../types/docs';

function StatsGridDemo() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            <uibit-number-ticker value={12800} prefix="$" locale="en-US" duration={1800}></uibit-number-ticker>
          </div>
          <div className="text-sm text-gray-500">Revenue generated</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            <uibit-number-ticker value={99.9} suffix="%" decimals={1} easing="ease-in-out" duration={2200}></uibit-number-ticker>
          </div>
          <div className="text-sm text-gray-500">Uptime SLA</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            <uibit-number-ticker value={4200} suffix="+" duration={1500}></uibit-number-ticker>
          </div>
          <div className="text-sm text-gray-500">Active users</div>
        </div>
      </div>
    </div>
  );
}

const statsGrid: UsageExample = {
  title: 'Stats grid',
  description: 'A three-column stat card layout. Each ticker starts when the section scrolls into view.',
  Demo: StatsGridDemo,
};

export default statsGrid;
