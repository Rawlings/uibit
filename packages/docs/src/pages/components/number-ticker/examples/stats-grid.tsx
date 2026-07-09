import '@uibit/number-ticker';
import { UsageExample } from '../../../../types/docs';

function StatsGridDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Scroll to this section to trigger the count-up animations:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            <uibit-number-ticker value={12800} prefix="$" locale="en-US" duration={1800}></uibit-number-ticker>
          </div>
          <div className="text-sm text-gray-500">Revenue generated</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            <uibit-number-ticker value={99.9} suffix="%" decimals={1} easing="ease-in-out" duration={2200}></uibit-number-ticker>
          </div>
          <div className="text-sm text-gray-500">Uptime SLA</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center shadow-sm">
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
  code: {
    html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
  <div class="stat-card">
    <div class="stat-value">
      <uibit-number-ticker value="12800" prefix="$" locale="en-US" duration="1800"></uibit-number-ticker>
    </div>
    <div class="stat-label">Revenue generated</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">
      <uibit-number-ticker value="99.9" suffix="%" decimals="1" easing="ease-in-out" duration="2200"></uibit-number-ticker>
    </div>
    <div class="stat-label">Uptime SLA</div>
  </div>
  <div class="stat-card">
    <div class="stat-value">
      <uibit-number-ticker value="4200" suffix="+" duration="1500"></uibit-number-ticker>
    </div>
    <div class="stat-label">Active users</div>
  </div>
</div>`,
    react: `import '@uibit/number-ticker';

function StatsGrid() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="stat-card">
        <div className="stat-value">
          <uibit-number-ticker value={12800} prefix="$" locale="en-US" duration={1800} />
        </div>
        <div className="stat-label">Revenue generated</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">
          <uibit-number-ticker value={99.9} suffix="%" decimals={1} easing="ease-in-out" duration={2200} />
        </div>
        <div className="stat-label">Uptime SLA</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">
          <uibit-number-ticker value={4200} suffix="+" duration={1500} />
        </div>
        <div className="stat-label">Active users</div>
      </div>
    </div>
  );
}`,
  },
  Demo: StatsGridDemo,
};

export default statsGrid;
