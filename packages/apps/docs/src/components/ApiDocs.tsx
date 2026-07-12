import { useState } from 'react';
import { CemManifest, CemDeclaration, CemMember } from '../types/docs';


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

function getPublicMethods(decl: CemDeclaration): CemMember[] {
  return (decl.members ?? []).filter(
    (m) => m.kind === 'method' && m.privacy !== 'private' && m.privacy !== 'protected'
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

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 dark:border-gray-900 last:border-none py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          {title}
          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-950 px-2 py-0.5 rounded-full">
            {count}
          </span>
        </span>
        <svg
          className={`w-4 h-4 text-gray-450 group-hover:text-gray-650 dark:group-hover:text-gray-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
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
  const methods = getPublicMethods(decl);
  const events = decl.events ?? [];
  const slots = decl.slots ?? [];
  const cssProps = decl.cssProperties ?? [];
  const cssParts = decl.cssParts ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">API Reference</h2>

      {props.length > 0 && (
        <Section title="Properties" count={props.length}>
          <Table
            headers={['Property', 'Attribute', 'Type', 'Default', 'Description']}
            rows={props.map((p) => [
              <Code key="name">{p.name}</Code>,
              p.attribute ? <Code key="attr">{p.attribute}</Code> : <span key="attr" className="text-gray-400 dark:text-gray-500">—</span>,
              p.type?.text ? <Code key="type">{p.type.text}</Code> : <span key="type" className="text-gray-400 dark:text-gray-500">—</span>,
              p.default !== undefined ? <Code key="default">{p.default}</Code> : <span key="default" className="text-gray-400 dark:text-gray-500">—</span>,
              <span key="desc" className="text-gray-650 dark:text-gray-400">{p.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {methods.length > 0 && (
        <Section title="Methods" count={methods.length}>
          <Table
            headers={['Method', 'Parameters', 'Return Type', 'Description']}
            rows={methods.map((m) => {
              const paramSignature = (m.parameters ?? []).map((p) => `${p.name}${p.type?.text ? `: ${p.type.text}` : ''}`).join(', ');
              const methodSignature = `${m.name}(${paramSignature})`;
              return [
                <Code key="name">{methodSignature}</Code>,
                m.parameters && m.parameters.length > 0 ? (
                  <div key="params" className="space-y-1">
                    {m.parameters.map((p) => (
                      <div key={p.name} className="text-xs">
                        <Code>{p.name}</Code>
                        {p.type?.text && <span className="text-gray-400 dark:text-gray-500 font-mono text-xs"> : {p.type.text}</span>}
                        {p.description && <div className="text-gray-500 dark:text-gray-450 mt-0.5">{p.description}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span key="params" className="text-gray-400 dark:text-gray-500">—</span>
                ),
                <span key="return">
                  {m.return?.type?.text ? <Code>{m.return.type.text}</Code> : <Code>void</Code>}
                  {m.return?.description && <div className="text-xs text-gray-500 dark:text-gray-450 mt-0.5">{m.return.description}</div>}
                </span>,
                <span key="desc" className="text-gray-650 dark:text-gray-400">{m.description ?? ''}</span>,
              ];
            })}
          />
        </Section>
      )}

      {events.length > 0 && (
        <Section title="Events" count={events.length}>
          <Table
            headers={['Event', 'Detail type', 'Description']}
            rows={events.map((e) => [
              <Code key="name">{e.name}</Code>,
              e.type?.text ? <Code key="type">{e.type.text}</Code> : <span key="type" className="text-gray-400 dark:text-gray-500">—</span>,
              <span key="desc" className="text-gray-650 dark:text-gray-400">{e.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {slots.length > 0 && (
        <Section title="Slots" count={slots.length}>
          <Table
            headers={['Slot', 'Description']}
            rows={slots.map((s) => [
              s.name ? <Code key="name">{s.name}</Code> : <span key="name" className="text-gray-500 dark:text-gray-450 italic">default</span>,
              <span key="desc" className="text-gray-650 dark:text-gray-400">{s.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {cssProps.length > 0 && (
        <Section title="CSS Custom Properties" count={cssProps.length}>
          <Table
            headers={['Property', 'Default', 'Description']}
            rows={cssProps.map((c) => [
              <Code key="name">{c.name}</Code>,
              c.default ? <Code key="default">{c.default}</Code> : <span key="default" className="text-gray-400 dark:text-gray-500">—</span>,
              <span key="desc" className="text-gray-650 dark:text-gray-400">{c.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}

      {cssParts.length > 0 && (
        <Section title="CSS Parts" count={cssParts.length}>
          <Table
            headers={['Part', 'Description']}
            rows={cssParts.map((p) => [
              <Code key="name">{p.name}</Code>,
              <span key="desc" className="text-gray-650 dark:text-gray-400">{p.description ?? ''}</span>,
            ])}
          />
        </Section>
      )}
    </div>
  );
}
