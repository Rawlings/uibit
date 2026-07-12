import React from 'react';

export function renderMarkdownInline(text: string): React.ReactElement {
  const html = text
    .replace(/`([^`]+)`/g, '<code class="font-mono bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-xs text-gray-800 dark:text-gray-200">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-gray-900 dark:text-white underline hover:text-gray-600">$1</a>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function renderMarkdownBlocks(markdown: string, customRenderers?: Record<string, () => React.ReactNode>): React.ReactNode[] {
  const lines = markdown.split('\n');
  const nodes: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let inList = false;
  let listItems: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      nodes.push(
        <ul key={`list-${key}`} className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          {listItems.map((item, idx) => (
            <li key={idx}>{renderMarkdownInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
    inList = false;
  };

  const flushTable = (key: number) => {
    if (tableRows.length > 0) {
      const headers = tableRows[0].map(h => h.trim());
      const bodyRows = tableRows.slice(2);
      nodes.push(
        <div key={`table-wrapper-${key}`} className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-200 dark:border-gray-800">
                {headers.map((h, idx) => (
                  <th key={idx} className="px-6 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {bodyRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="bg-transparent hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-4 text-gray-700 dark:text-gray-300">{renderMarkdownInline(cell.trim())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        nodes.push(
          <pre key={`code-${i}`} className="code-block bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm leading-relaxed mb-6 font-mono">
            <code>{codeContent.join('\n')}</code>
          </pre>
        );
        codeContent = [];
      } else {
        flushList(i);
        flushTable(i);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    const placeholderMatch = line.trim().match(/^<!--\s+([\w-]+-placeholder)\s+-->$/);
    if (placeholderMatch) {
      flushList(i);
      flushTable(i);
      const placeholderKey = placeholderMatch[1];
      if (customRenderers && customRenderers[placeholderKey]) {
        nodes.push(<React.Fragment key={`placeholder-${i}`}>{customRenderers[placeholderKey]()}</React.Fragment>);
      }
      continue;
    }

    if (line.trim().startsWith('|')) {
      flushList(i);
      inTable = true;
      const cells = line.split('|').slice(1, -1);
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable(i);
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      inList = true;
      listItems.push(line.trim().substring(2));
      continue;
    } else if (inList) {
      flushList(i);
    }

    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('# ')) {
      nodes.push(
        <h1 key={`h1-${i}`} className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
          {trimmed.substring(2)}
        </h1>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      const text = trimmed.substring(3);
      nodes.push(
        <h2 key={`h2-${i}`} id={slugify(text)} className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-20">
          {text}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith('### ')) {
      nodes.push(
        <h3 key={`h3-${i}`} className="text-base font-semibold text-gray-900 dark:text-white mt-6 mb-2">
          {trimmed.substring(4)}
        </h3>
      );
      continue;
    }

    nodes.push(
      <p key={`p-${i}`} className="text-base text-gray-650 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl">
        {renderMarkdownInline(trimmed)}
      </p>
    );
  }

  flushList(lines.length);
  flushTable(lines.length);

  return nodes;
}
