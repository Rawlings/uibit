import '@uibit/table';
import type { UsageExample } from '../../../../types/docs';

const ROWS: [string, string, string, string][] = [
  ['Acme Corp', 'North America', 'Active', 'Enterprise'],
  ['Bright Labs', 'Europe', 'Active', 'Growth'],
  ['Cedar Works', 'Asia Pacific', 'Active', 'Enterprise'],
  ['Dune Systems', 'Middle East', 'Inactive', 'Starter'],
  ['Ember Health', 'North America', 'Active', 'Growth'],
  ['Frost AI', 'Europe', 'Active', 'Enterprise'],
  ['Gale Robotics', 'Asia Pacific', 'Review', 'Growth'],
  ['Harbor Cloud', 'North America', 'Active', 'Enterprise'],
  ['Isle Media', 'Europe', 'Inactive', 'Starter'],
  ['Jasper Fintech', 'Asia Pacific', 'Active', 'Enterprise'],
];

function Demo() {
  return (
    <div>
      <uibit-table searchable striped>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Region</th>
              <th>Status</th>
              <th>Plan</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([name, region, status, plan]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{region}</td>
                <td>{status}</td>
                <td>{plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </uibit-table>
    </div>
  );
}

const multiSort: UsageExample = {
  title: 'Multi-sort',
  description:
    'Click any column header to sort. Shift+click additional columns to stack secondary and tertiary sorts. A numbered badge appears on each active sort column to show its priority. Click the same column again to cycle ascending → descending → off.',
  Demo,
};

export default multiSort;
