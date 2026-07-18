import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function renderMarkdownInline(text: string): React.ReactElement {
  return (
    <ReactMarkdown
      allowedElements={['p', 'strong', 'em', 'code', 'a']}
      unwrapDisallowed={true}
      components={{
        p: ({ children }) => <>{children}</>,
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900 dark:text-white">
            {children}
          </strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
          <code className="font-mono bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-xs text-gray-800 dark:text-gray-200">
            {children}
          </code>
        ),
        a: ({ href, children }) => {
          const isInternal =
            href &&
            (href.startsWith('/') ||
              href.startsWith('#') ||
              !/^(https?:)?\/\//.test(href));
          return (
            <a
              href={href}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className="text-gray-900 dark:text-white underline hover:text-gray-600"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

const getComponents = (headingIdPrefix?: string) => ({
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => {
    const text = React.Children.toArray(children).join('');
    const id = headingIdPrefix
      ? `${headingIdPrefix}-${slugify(text)}`
      : slugify(text);
    return (
      <h2
        id={id}
        className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4 pb-2 border-b border-gray-100 dark:border-gray-900 scroll-mt-20"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base text-gray-650 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="border-b border-gray-200 dark:border-gray-800">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="bg-transparent">{children}</tr>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="px-0 py-2.5 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="px-0 py-3 text-left align-top text-gray-655 dark:text-gray-350 text-sm pr-4 last:pr-0">
      {children}
    </td>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm leading-relaxed mb-6 font-mono">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }: any) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="font-mono bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-xs text-gray-800 dark:text-gray-200">
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  a: ({ href, children }: any) => {
    const isInternal =
      href &&
      (href.startsWith('/') ||
        href.startsWith('#') ||
        !/^(https?:)?\/\//.test(href));
    return (
      <a
        href={href}
        target={isInternal ? undefined : '_blank'}
        rel={isInternal ? undefined : 'noopener noreferrer'}
        className="text-gray-900 dark:text-white underline hover:text-gray-600"
      >
        {children}
      </a>
    );
  },
});

export function renderMarkdownBlocks(
  markdown: string,
  customRenderers?: Record<string, () => React.ReactNode>,
  headingIdPrefix?: string,
): React.ReactNode[] {
  if (!markdown) return [];

  const parts = markdown.split(/(<!--\s+[\w-]+-placeholder\s+-->)/);
  const nodes: React.ReactNode[] = [];
  const components = getComponents(headingIdPrefix);

  parts.forEach((part, index) => {
    const match = part.match(/^<!--\s+([\w-]+-placeholder)\s+-->$/);
    if (match) {
      const placeholderKey = match[1];
      if (customRenderers?.[placeholderKey]) {
        nodes.push(
          <React.Fragment key={`placeholder-${index}`}>
            {customRenderers[placeholderKey]()}
          </React.Fragment>,
        );
      }
    } else if (part.trim()) {
      nodes.push(
        <ReactMarkdown
          key={`md-${index}`}
          remarkPlugins={[remarkGfm]}
          components={components as any}
        >
          {part}
        </ReactMarkdown>,
      );
    }
  });

  return nodes;
}
