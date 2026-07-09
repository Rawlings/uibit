import '@uibit/table';
import { useEffect, useRef, useState } from 'react';
import { UsageExample } from '../../../../types/docs';

const ROWS: [string, string, string, string][] = [
  ['Acme Corp', 'North America', 'Active', 'Enterprise'],
  ['Bright Labs', 'Europe', 'Active', 'Growth'],
  ['Cedar Works', 'Asia Pacific', 'Active', 'Enterprise'],
  ['Dune Systems', 'Middle East', 'Inactive', 'Starter'],
  ['Ember Health', 'North America', 'Active', 'Growth'],
  ['Frost AI', 'Europe', 'Active', 'Enterprise'],
];

function RowSelectionDemo() {
  const tableRef = useRef<HTMLElement>(null);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ indices: number[]; rows: string[][] }>).detail;
      setSelectedCount(detail.indices.length);
    };

    el.addEventListener('row-select', handler);
    return () => el.removeEventListener('row-select', handler);
  }, []);

  return (
    <div>
      <uibit-table selectable ref={tableRef}>
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
      <p className="text-sm text-gray-600 mt-4">
        {selectedCount === 0
          ? 'No rows selected.'
          : `${selectedCount} row${selectedCount === 1 ? '' : 's'} selected.`}
      </p>
    </div>
  );
}

const rowSelection: UsageExample = {
  title: 'Row selection',
  description:
    'The selectable attribute adds checkboxes and a selection banner. Listen to the row-select event to react to selection changes.',
  code: {
    html: `<uibit-table selectable>
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
      <tr><td>Acme Corp</td><td>North America</td><td>Active</td><td>Enterprise</td></tr>
      <!-- …more rows… -->
    </tbody>
  </table>
</uibit-table>

<p id="count">No rows selected.</p>

<script>
  const table = document.querySelector('uibit-table');
  const count = document.getElementById('count');

  table.addEventListener('row-select', e => {
    const n = e.detail.indices.length;
    count.textContent = n === 0 ? 'No rows selected.' : \`\${n} row\${n === 1 ? '' : 's'} selected.\`;
  });
</script>`,
    react: `import '@uibit/table';
import { useEffect, useRef, useState } from 'react';

function SelectableTable() {
  const tableRef = useRef(null);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const handler = e => setSelectedCount(e.detail.indices.length);
    el.addEventListener('row-select', handler);
    return () => el.removeEventListener('row-select', handler);
  }, []);

  return (
    <div>
      <uibit-table selectable ref={tableRef}>
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
            {rows.map(([name, region, status, plan]) => (
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
      <p>{selectedCount === 0 ? 'No rows selected.' : \`\${selectedCount} rows selected.\`}</p>
    </div>
  );
}`,
  },
  Demo: RowSelectionDemo,
};

export default rowSelection;
