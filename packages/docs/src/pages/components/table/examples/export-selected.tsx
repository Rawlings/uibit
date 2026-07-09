import '@uibit/table';
import { UsageExample } from '../../../../types/docs';

const ROWS: [string, string, string, string, string][] = [
  ['Acme Corp', '1 240 000', 'North America', 'Active', 'Enterprise'],
  ['Bright Labs', '830 000', 'Europe', 'Active', 'Growth'],
  ['Cedar Works', '2 100 000', 'Asia Pacific', 'Active', 'Enterprise'],
  ['Dune Systems', '560 000', 'Middle East', 'Inactive', 'Starter'],
  ['Ember Health', '990 000', 'North America', 'Active', 'Growth'],
  ['Frost AI', '3 400 000', 'Europe', 'Active', 'Enterprise'],
  ['Gale Robotics', '720 000', 'Asia Pacific', 'Review', 'Growth'],
  ['Harbor Cloud', '1 670 000', 'North America', 'Active', 'Enterprise'],
];

function Demo() {
  return (
    <div>
      <uibit-table selectable exportable column-chooser striped>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th data-type="number">Revenue ($)</th>
              <th>Region</th>
              <th>Status</th>
              <th>Plan</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([name, rev, region, status, plan]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{rev}</td>
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

const exportSelected: UsageExample = {
  title: 'Export & column visibility',
  description:
    'exportable adds a CSV export button. When rows are selected, only those rows are exported; with no selection it exports all filtered rows. column-chooser lets users toggle column visibility — hidden columns are excluded from the export.',
  Demo,
  code: {
    html: `<uibit-table selectable exportable column-chooser>
  <table>
    <thead>
      <tr>
        <th>Company</th>
        <th data-type="number">Revenue ($)</th>
        <th>Region</th>
        <th>Status</th>
        <th>Plan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Acme Corp</td>
        <td>1 240 000</td>
        <td>North America</td>
        <td>Active</td>
        <td>Enterprise</td>
      </tr>
      <!-- …more rows… -->
    </tbody>
  </table>
</uibit-table>`,
    react: `import '@uibit/table';

function ExportableTable({ rows }) {
  return (
    <uibit-table selectable exportable column-chooser>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th data-type="number">Revenue ($)</th>
            <th>Region</th>
            <th>Status</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, rev, region, status, plan]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{rev}</td>
              <td>{region}</td>
              <td>{status}</td>
              <td>{plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </uibit-table>
  );
}`,
  },
};

export default exportSelected;
