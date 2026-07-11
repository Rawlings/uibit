import '@uibit/number-increment';
import { UsageExample } from '../../../../types/docs';

function StatsGridDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-1">
          <uibit-number-increment
            value={12800}
            duration={1800}
            locale="en-US"
            options={{
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }}
          ></uibit-number-increment>
        </div>
        <div className="text-sm text-gray-500">Revenue generated</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-1">
          <uibit-number-increment
            value={0.999}
            easing="ease-in-out"
            duration={2200}
            options={{
              style: 'percent',
              minimumFractionDigits: 1,
            }}
          ></uibit-number-increment>
        </div>
        <div className="text-sm text-gray-500">Uptime SLA</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-1">
          <uibit-number-increment
            value={4200}
            duration={1500}
            locale="en-US"
          ></uibit-number-increment>+
        </div>
        <div className="text-sm text-gray-500">Active users</div>
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
