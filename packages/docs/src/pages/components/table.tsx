import '@uibit/table';
import manifest from '@uibit/table/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function TableDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        A standard HTML table wrapped in <code>&lt;uibit-table&gt;</code> gains search, sorting, pagination, and CSV export automatically.
      </p>
      <uibit-table searchable paginated exportable page-sizes="5,10,25">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th data-type="number">Revenue</th>
              <th>Region</th>
              <th>Status</th>
              <th data-type="number">Growth %</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Acme Corp', '1 240 000', 'North America', 'Active', '12.4'],
              ['Bright Labs', '830 000', 'Europe', 'Active', '8.1'],
              ['Cedar Works', '2 100 000', 'Asia Pacific', 'Active', '21.7'],
              ['Dune Systems', '560 000', 'Middle East', 'Inactive', '-3.2'],
              ['Ember Health', '990 000', 'North America', 'Active', '15.0'],
              ['Frost AI', '3 400 000', 'Europe', 'Active', '34.9'],
              ['Gale Robotics', '720 000', 'Asia Pacific', 'Review', '2.5'],
              ['Harbor Cloud', '1 670 000', 'North America', 'Active', '18.3'],
              ['Isle Media', '450 000', 'Europe', 'Inactive', '-6.8'],
              ['Jasper Fintech', '2 800 000', 'Asia Pacific', 'Active', '27.2'],
              ['Kite Analytics', '390 000', 'Middle East', 'Review', '1.1'],
              ['Lumen Bio', '1 100 000', 'North America', 'Active', '9.6'],
            ].map(([name, rev, region, status, growth]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{rev}</td>
                <td>{region}</td>
                <td>{status}</td>
                <td>{growth}</td>
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
    'Wraps a standard HTML <table> in the default slot and adds global search with result highlighting, multi-column sorting with tri-state cycling (asc → desc → off), paginated navigation with smart page-number elision, per-page row count selector, and one-click CSV export.',
  packageName: '@uibit/table',
  tagName: 'uibit-table',
  manifest,
  Demo: TableDemo,
  usages: [
    {
      title: 'HTML Integration',
      code: `<uibit-table searchable paginated exportable>
  <table>
    <thead>
      <tr><th>Name</th><th data-type="number">Score</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr><td>Alice</td><td>92</td><td>Active</td></tr>
      <tr><td>Bob</td><td>85</td><td>Inactive</td></tr>
    </tbody>
  </table>
</uibit-table>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/table';

function DataTable({ rows }: { rows: string[][] }) {
  return (
    <uibit-table searchable paginated exportable page-sizes="10,25,50">
      <table>
        <thead>
          <tr><th>Name</th><th data-type="number">Value</th></tr>
        </thead>
        <tbody>
          {rows.map(([name, val]) => (
            <tr key={name}><td>{name}</td><td>{val}</td></tr>
          ))}
        </tbody>
      </table>
    </uibit-table>
  );
}`,
    },
    {
      title: 'Numeric Column Sorting',
      description: 'Add data-type="number" to a <th> for correct numeric sort order.',
      code: `<table>
  <thead>
    <tr>
      <th>Product</th>
      <th data-type="number">Price</th>
      <th data-type="number">Stock</th>
    </tr>
  </thead>
  …
</table>`,
    },
    {
      title: 'Disable Sorting on a Column',
      description: 'Add data-sortable="false" to prevent sorting on a specific column.',
      code: `<th data-sortable="false">Actions</th>`,
    },
    {
      title: 'Event Listeners',
      code: `const table = document.querySelector('uibit-table');

table.addEventListener('search', e => console.log('query:', e.detail.query));
table.addEventListener('sort', e => console.log(e.detail.column, e.detail.direction));
table.addEventListener('page-change', e => console.log('page:', e.detail.page));`,
    },
  ],
  features: [
    'Parses a slotted <table> on slot assignment — zero config, source table is never mutated',
    'Global search filters across all columns simultaneously with live highlighting of matched terms',
    'Tri-state column sort cycling: ascending → descending → off, with aria-sort attributes',
    'Numeric column sort via data-type="number" for correct numerical ordering',
    'Smart pagination with ellipsis elision; configurable page sizes via the page-sizes attribute',
    'CSV export serialises the full sorted, filtered dataset — not just the visible page',
    'All features are individually togglable via searchable, paginated, and exportable boolean attributes',
    'Screen-reader-friendly: role="region", aria-sort, aria-label, and aria-current on pagination',
  ],
};

export default data;
