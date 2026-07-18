import '@uibit/table';
import type { UsageExample } from '../../../../types/docs';

const ROWS: [string, string, string, string, string, string][] = [
  ['Acme Corp', '1 240 000', 'North America', 'Active', '12.4', 'Enterprise'],
  ['Bright Labs', '830 000', 'Europe', 'Active', '8.1', 'Growth'],
  ['Cedar Works', '2 100 000', 'Asia Pacific', 'Active', '21.7', 'Enterprise'],
  ['Dune Systems', '560 000', 'Middle East', 'Inactive', '-3.2', 'Starter'],
  ['Ember Health', '990 000', 'North America', 'Active', '15.0', 'Growth'],
  ['Frost AI', '3 400 000', 'Europe', 'Active', '34.9', 'Enterprise'],
  ['Gale Robotics', '720 000', 'Asia Pacific', 'Review', '2.5', 'Growth'],
  [
    'Harbor Cloud',
    '1 670 000',
    'North America',
    'Active',
    '18.3',
    'Enterprise',
  ],
  ['Isle Media', '450 000', 'Europe', 'Inactive', '-6.8', 'Starter'],
  [
    'Jasper Fintech',
    '2 800 000',
    'Asia Pacific',
    'Active',
    '27.2',
    'Enterprise',
  ],
  ['Kite Analytics', '390 000', 'Middle East', 'Review', '1.1', 'Starter'],
  ['Lumen Bio', '1 100 000', 'North America', 'Active', '9.6', 'Growth'],
  ['Marble Studio', '670 000', 'Europe', 'Active', '7.4', 'Growth'],
  [
    'Nova Payments',
    '4 200 000',
    'North America',
    'Active',
    '41.2',
    'Enterprise',
  ],
  [
    'Orbit Logistics',
    '310 000',
    'Asia Pacific',
    'Inactive',
    '-11.5',
    'Starter',
  ],
  ['Prism Security', '1 890 000', 'Europe', 'Active', '19.8', 'Enterprise'],
  ['Quill Publishing', '540 000', 'Middle East', 'Review', '3.7', 'Growth'],
  ['Relay Networks', '780 000', 'North America', 'Active', '6.9', 'Growth'],
  ['Sable Insurance', '2 350 000', 'Europe', 'Active', '23.1', 'Enterprise'],
  ['Terra Robotics', '1 450 000', 'Asia Pacific', 'Active', '14.7', 'Growth'],
];

function FullFeaturedDemo() {
  return (
    <div>
      <uibit-table
        searchable
        paginated
        exportable
        selectable
        filterable
        resizable
        column-chooser
        striped
        sticky-header
        page-sizes="5,10,20"
      >
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th data-type="number">Revenue ($)</th>
              <th>Region</th>
              <th>Status</th>
              <th data-type="number">Growth %</th>
              <th>Plan</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([name, rev, region, status, growth, plan]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{rev}</td>
                <td>{region}</td>
                <td>{status}</td>
                <td>{growth}</td>
                <td>{plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </uibit-table>
    </div>
  );
}

const fullFeatured: UsageExample = {
  title: 'Full-featured',
  description:
    'All features enabled: search, pagination, export, row selection, per-column filters, column resizing, column chooser, striped rows, and sticky header.',
  Demo: FullFeaturedDemo,
};

export default fullFeatured;
