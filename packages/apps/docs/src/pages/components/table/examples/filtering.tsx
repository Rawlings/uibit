import '@uibit/table';
import { UsageExample } from '../../../../types/docs';

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
  ['Kite Analytics', 'Middle East', 'Review', 'Starter'],
  ['Lumen Bio', 'North America', 'Active', 'Growth'],
];

function Demo() {
  return (
    <div>
      <uibit-table searchable filterable striped>
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

const filtering: UsageExample = {
  title: 'Search & filtering',
  description:
    'searchable adds a global search bar that matches across all columns simultaneously. filterable adds per-column filter inputs below the header row — column filters are ANDed with the global search. A "Clear filters" button appears in the toolbar whenever any filter is active.',
  Demo,
};

export default filtering;
