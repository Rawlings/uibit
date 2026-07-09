import '@uibit/number-ticker';
import manifest from '@uibit/number-ticker/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import statsGrid from './examples/stats-grid';
import withRepeat from './examples/with-repeat';

function NumberTickerDemo() {
  return (
    <div>
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

const data: ComponentDocData = {
  id: 'number-ticker',
  title: 'Number Ticker',
  description:
    'Intersection-aware numeric counter that animates to a target value with easing curves, locale-aware formatting, and optional prefix/suffix strings. Triggers once the element scrolls into the viewport.',
  packageName: '@uibit/number-ticker',
  tagName: 'uibit-number-ticker',
  manifest,
  Demo: NumberTickerDemo,
  demoCode: {
    html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem">
  <div class="stat-card">
    <uibit-number-ticker value="12800" prefix="$" locale="en-US" duration="1800"></uibit-number-ticker>
    <span>Revenue generated</span>
  </div>
  <div class="stat-card">
    <uibit-number-ticker value="99.9" suffix="%" decimals="1" easing="ease-in-out" duration="2200"></uibit-number-ticker>
    <span>Uptime SLA</span>
  </div>
  <div class="stat-card">
    <uibit-number-ticker value="4200" suffix="+" duration="1500"></uibit-number-ticker>
    <span>Active users</span>
  </div>
</div>`,
    react: `import '@uibit/number-ticker';

function Stats() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="stat-card">
        <uibit-number-ticker value={12800} prefix="$" locale="en-US" duration={1800} />
        <span>Revenue generated</span>
      </div>
      <div className="stat-card">
        <uibit-number-ticker value={99.9} suffix="%" decimals={1} easing="ease-in-out" duration={2200} />
        <span>Uptime SLA</span>
      </div>
      <div className="stat-card">
        <uibit-number-ticker value={4200} suffix="+" duration={1500} />
        <span>Active users</span>
      </div>
    </div>
  );
}`,
  },
  examples: [statsGrid, withRepeat],
  features: [
    'IntersectionObserver triggers animation only when the element enters the viewport',
    'Three easing curves: ease-out (cubic), ease-in-out (quadratic), linear',
    'Locale-aware number formatting via Intl.NumberFormat',
    'Configurable prefix, suffix, decimal places, start value, and duration',
    'repeat attribute re-animates every time the element re-enters the viewport',
    'rAF-based loop — never causes layout thrash on the main thread',
  ],
};

export default data;
