type CemManifest = {
  modules: Array<{
    declarations?: Array<CemDeclaration>;
    exports?: Array<{ name: string; declaration: { name: string } }>;
  }>;
};

type CemDeclaration = {
  kind: string;
  name: string;
  tagName?: string;
  description?: string;
  members?: Array<CemMember>;
  events?: Array<CemEvent>;
  slots?: Array<CemSlot>;
  cssProperties?: Array<CemCssProp>;
  cssParts?: Array<CemCssPart>;
};

type CemMember = {
  kind: 'field' | 'method';
  name: string;
  description?: string;
  type?: { text: string };
  default?: string;
  privacy?: string;
  attribute?: string;
};

type CemEvent = {
  name: string;
  description?: string;
  type?: { text: string };
};

type CemSlot = {
  name: string;
  description?: string;
};

type CemCssProp = {
  name: string;
  description?: string;
  default?: string;
};

type CemCssPart = {
  name: string;
  description?: string;
};

function findDeclaration(manifest: CemManifest, tagName: string): CemDeclaration | null {
  for (const mod of manifest.modules) {
    for (const decl of mod.declarations ?? []) {
      if (decl.tagName === tagName) return decl;
    }
  }
  return null;
}

function getPublicProps(decl: CemDeclaration): CemMember[] {
  return (decl.members ?? []).filter(
    (m) => m.kind === 'field' && m.privacy !== 'private' && m.privacy !== 'protected'
  );
}

const tdClass = 'px-0 py-3 text-left align-top text-gray-600 dark:text-gray-350 text-sm pr-4 last:pr-0';
const thClass = 'px-0 py-2.5 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0';

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            {headers.map((h) => (
              <th key={h} className={thClass}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
          {rows.map((cells, i) => (
            <tr key={i} className="bg-transparent">
              {cells.map((cell, j) => (
                <td key={j} className={tdClass}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">
      {children}
    </code>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ApiDocs({
  manifest,
  tagName,
}: {
  manifest: CemManifest;
  tagName: string;
}) {
  const decl = findDeclaration(manifest, tagName);
  if (!decl) return <p className="text-sm text-red-500">No manifest found for {tagName}</p>;

  const props = getPublicProps(decl);
  const events = decl.events ?? [];
  const slots = decl.slots ?? [];
  const cssProps = decl.cssProperties ?? [];
  const cssParts = decl.cssParts ?? [];

  return (
    <div className="space-y-10">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API Reference</h2>

      {props.length > 0 && (
        <Section title="Properties">
          <Table
            headers={['Property', 'Attribute', 'Type', 'Default', 'Description']}
            rows={props.map((p) => [
              <Code>{p.name}</Code>,
              p.attribute ? <Code>{p.attribute}</Code> : <span className="text-gray-400 dark:text-gray-500">—</span>,
              p.type?.text ? <Code>{p.type.text}</Code> : <span className="text-gray-400 dark:text-gray-500">—</span>,
              p.default !== undefined ? <Code>{p.default}</Code> : <span className="text-gray-400 dark:text-gray-500">—</span>,
              <span className="text-gray-650 dark:text-gray-400">{p.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {events.length > 0 && (
        <Section title="Events">
          <Table
            headers={['Event', 'Detail type', 'Description']}
            rows={events.map((e) => [
              <Code>{e.name}</Code>,
              e.type?.text ? <Code>{e.type.text}</Code> : <span className="text-gray-400 dark:text-gray-500">—</span>,
              <span className="text-gray-650 dark:text-gray-400">{e.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {slots.length > 0 && (
        <Section title="Slots">
          <Table
            headers={['Slot', 'Description']}
            rows={slots.map((s) => [
              s.name ? <Code>{s.name}</Code> : <span className="text-gray-500 dark:text-gray-450 italic">default</span>,
              <span className="text-gray-650 dark:text-gray-400">{s.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {cssProps.length > 0 && (
        <Section title="CSS Custom Properties">
          <Table
            headers={['Property', 'Default', 'Description']}
            rows={cssProps.map((c) => [
              <Code>{c.name}</Code>,
              c.default ? <Code>{c.default}</Code> : <span className="text-gray-400 dark:text-gray-500">—</span>,
              <span className="text-gray-650 dark:text-gray-400">{c.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {cssParts.length > 0 && (
        <Section title="CSS Parts">
          <Table
            headers={['Part', 'Description']}
            rows={cssParts.map((p) => [
              <Code>{p.name}</Code>,
              <span className="text-gray-650 dark:text-gray-400">{p.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}
    </div>
  );
}
