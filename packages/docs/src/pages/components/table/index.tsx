import '@uibit/table';
import manifest from '@uibit/table/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import fullFeatured from './examples/full-featured';
import rowSelection from './examples/row-selection';
import multiSort from './examples/multi-sort';
import filtering from './examples/filtering';
import exportSelected from './examples/export-selected';

const ROWS: [string, string, string, string, string, string][] = [
  ['Acme Corp', '1 240 000', 'North America', 'Active', '12.4', 'Enterprise'],
  ['Bright Labs', '830 000', 'Europe', 'Active', '8.1', 'Growth'],
  ['Cedar Works', '2 100 000', 'Asia Pacific', 'Active', '21.7', 'Enterprise'],
  ['Dune Systems', '560 000', 'Middle East', 'Inactive', '-3.2', 'Starter'],
  ['Ember Health', '990 000', 'North America', 'Active', '15.0', 'Growth'],
  ['Frost AI', '3 400 000', 'Europe', 'Active', '34.9', 'Enterprise'],
  ['Gale Robotics', '720 000', 'Asia Pacific', 'Review', '2.5', 'Growth'],
  ['Harbor Cloud', '1 670 000', 'North America', 'Active', '18.3', 'Enterprise'],
  ['Isle Media', '450 000', 'Europe', 'Inactive', '-6.8', 'Starter'],
  ['Jasper Fintech', '2 800 000', 'Asia Pacific', 'Active', '27.2', 'Enterprise'],
  ['Kite Analytics', '390 000', 'Middle East', 'Review', '1.1', 'Starter'],
  ['Lumen Bio', '1 100 000', 'North America', 'Active', '9.6', 'Growth'],
  ['Marble Studio', '670 000', 'Europe', 'Active', '7.4', 'Growth'],
  ['Nova Payments', '4 200 000', 'North America', 'Active', '41.2', 'Enterprise'],
  ['Orbit Logistics', '310 000', 'Asia Pacific', 'Inactive', '-11.5', 'Starter'],
  ['Prism Security', '1 890 000', 'Europe', 'Active', '19.8', 'Enterprise'],
  ['Quill Publishing', '540 000', 'Middle East', 'Review', '3.7', 'Growth'],
  ['Relay Networks', '780 000', 'North America', 'Active', '6.9', 'Growth'],
  ['Sable Insurance', '2 350 000', 'Europe', 'Active', '23.1', 'Enterprise'],
  ['Terra Robotics', '1 450 000', 'Asia Pacific', 'Active', '14.7', 'Growth'],
];

function TableDemo() {
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
        style={{ '--uibit-table-max-height': '28rem' } as React.CSSProperties}
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

const data: ComponentDocData = {
  id: 'table',
  title: 'Table',
  description:
    'Wraps any standard HTML <table> in the default slot and adds a full datagrid feature set — without touching the source markup. All features are individually opt-in via boolean attributes.',
  packageName: '@uibit/table',
  tagName: 'uibit-table',
  manifest,
  Demo: TableDemo,
  demoCode: {
    html: `<uibit-table
  searchable paginated exportable
  selectable filterable resizable
  column-chooser striped sticky-header
  page-sizes="5,10,20"
  style="--uibit-table-max-height: 28rem"
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
      <tr>
        <td>Acme Corp</td>
        <td>1 240 000</td>
        <td>North America</td>
        <td>Active</td>
        <td>12.4</td>
        <td>Enterprise</td>
      </tr>
      <!-- …more rows… -->
    </tbody>
  </table>
</uibit-table>`,
    react: `import '@uibit/table';

const ROWS = [
  ['Acme Corp', '1 240 000', 'North America', 'Active', '12.4', 'Enterprise'],
  // …more rows…
];

function TableDemo() {
  return (
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
      style={{ '--uibit-table-max-height': '28rem' }}
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
  );
}`,
  },
  examples: [fullFeatured, multiSort, filtering, rowSelection, exportSelected],
  features: [
    'Global search filters all columns simultaneously with live match highlighting',
    'Multi-sort: click to sort one column, Shift+click to stack secondary/tertiary sorts with numbered priority badges',
    'Per-column filter row with text inputs ANDed with the global search; active filters highlighted in green',
    'Row selection with checkboxes, select-all-page (indeterminate state), select-all-filtered banner, and row-select event',
    'Column visibility dropdown — hide/show individual columns; hidden columns excluded from CSV export',
    'Column resizing — drag the right edge of any header to set a fixed pixel width (60px minimum)',
    'Row density toggle — compact / normal / comfortable via reflected density attribute',
    'Sticky header — set sticky-header and --uibit-table-max-height for scroll-locked column labels',
    'Row striping — striped attribute applies alternating backgrounds that respect the selected-row highlight',
    'CSV export — exports only selected rows when a selection exists; all visible columns in current sort order',
    '"Clear filters" toolbar button appears whenever any global or column filter is active',
    'Numeric columns sort by parsed float value when data-type="number" is set on the <th>',
    'Comma-stripped numeric parsing (handles formatted numbers like "1 240 000")',
    'Source <table> is never mutated; all state lives in the component',
  ],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Focus indicators are clearly visible on all interactive elements like buttons and dropdowns.',
      'Aria-sort attribute notifies assistive tech of active sort direction on sorted columns.',
      'Aria-expanded tracks the state of the column visibility chooser menu.',
      'Standard labels provide description for input text fields.',
      'Selection checkbox attributes are updated dynamically to show select-all status.'
    ],
    keyboardNav: [
      { key: 'Tab', description: 'Navigate between search inputs, filters, and page buttons.' },
      { key: 'Space / Enter', description: 'Trigger sorting on headers or activate selection checkboxes.' },
      { key: 'Escape', description: 'Close the column visibility selection menu.' }
    ]
  }
};

export default data;
