import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';
import { renderMarkdownBlocks, slugify } from '../utils/markdown';
import { localizedStrings } from '@uibit/core';

// Raw imports of markdown content files
import gettingStartedMd from '../../content/getting-started.md?raw';
import accessibilityMd from '../../content/accessibility.md?raw';
import stylingMd from '../../content/styling.md?raw';
import localizationMd from '../../content/localization.md?raw';
import frameworksMd from '../../content/frameworks.md?raw';
import iconsMd from '../../content/icons.md?raw';
import browserSupportMd from '../../content/browser-support.md?raw';
import troubleshootingMd from '../../content/troubleshooting.md?raw';

interface PageMetadata {
  title: string;
  description: string;
  markdown: string;
}

const contentRegistry: Record<string, PageMetadata> = {
  'getting-started': {
    title: 'Installation & Setup – UIBit',
    description:
      'Learn how to install UIBit components, set up the design tokens, and integrate with your application.',
    markdown: gettingStartedMd,
  },
  accessibility: {
    title: 'Accessibility Overview – UIBit',
    description:
      "Learn about UIBit's approach to WCAG 2.1 AA compliance, keyboard navigation, and ARIA support.",
    markdown: accessibilityMd,
  },
  styling: {
    title: 'Styling & Theming – UIBit',
    description:
      'Customize UIBit web components using CSS custom properties, design tokens, and the density system.',
    markdown: stylingMd,
  },
  localization: {
    title: 'Localization – UIBit',
    description:
      'Learn how to localize UIBit web components using @lit/localize.',
    markdown: localizationMd,
  },
  frameworks: {
    title: 'Framework Integrations – UIBit',
    description:
      'Use UIBit components in React, Vue, Svelte, Angular, Astro, Preact, Stencil, and vanilla TypeScript with auto-generated type wrappers.',
    markdown: frameworksMd,
  },
  icons: {
    title: 'Icons – UIBit',
    description:
      'Built-in icons included with UIBit, powered by Lucide, with support for custom icon registration.',
    markdown: iconsMd,
  },
  'browser-support': {
    title: 'Browser Support – UIBit',
    description:
      'Reference detailing supported browser versions and graceful degradation strategies.',
    markdown: browserSupportMd,
  },
  troubleshooting: {
    title: 'Troubleshooting & FAQ – UIBit',
    description:
      'Solutions for common build errors, SSR challenges, and custom element registration issues.',
    markdown: troubleshootingMd,
  },
};

const ICONS = [
  { name: 'chevron-left', label: 'Chevron Left' },
  { name: 'chevron-right', label: 'Chevron Right' },
  { name: 'x', label: 'X (Close)' },
  { name: 'plus', label: 'Plus' },
  { name: 'move', label: 'Move' },
  { name: 'eraser', label: 'Eraser' },
  { name: 'rotate-ccw', label: 'Rotate CCW' },
  { name: 'angry', label: 'Angry' },
  { name: 'frown', label: 'Frown' },
  { name: 'meh', label: 'Meh' },
  { name: 'smile', label: 'Smile' },
  { name: 'laugh', label: 'Laugh' },
];

function IconPreview({ name }: { name: string }) {
  const svgMap: Record<string, string> = {
    'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
    'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    move: '<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>',
    eraser:
      '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
    'rotate-ccw':
      '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    angry:
      '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><path d="M7.5 8 10 9"/><path d="m14 9 2.5-1"/><path d="M9 10h0"/><path d="M15 10h0"/>',
    frown:
      '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    meh: '<circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    smile:
      '<circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    laugh:
      '<circle cx="12" cy="12" r="10"/><path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: svgMap is a static, hardcoded icon lookup, not user input
      dangerouslySetInnerHTML={{ __html: svgMap[name] ?? '' }}
    />
  );
}

function IconsGrid() {
  const [copied, setCopied] = useState<string | null>(null);

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-6">
      {ICONS.map(({ name }) => (
        <button
          type="button"
          key={name}
          onClick={() => copyToClipboard(name, name)}
          className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-150 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-all cursor-pointer group text-left"
          title={`Copy "${name}"`}
        >
          <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            <IconPreview name={name} />
          </span>
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors leading-snug text-center break-all">
            {copied === name ? (
              <span className="text-gray-900 dark:text-white font-semibold">
                Copied!
              </span>
            ) : (
              name
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

function LocalizedStringsTable() {
  return (
    <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-xl">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="px-6 py-4 font-semibold">Component</th>
            <th className="px-6 py-4 font-semibold">String (en-US)</th>
            <th className="px-6 py-4 font-semibold">Context</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {localizedStrings.map((row, i) => (
            <tr
              key={i}
              className="bg-transparent hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors"
            >
              <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                {row.component}
              </td>
              <td className="px-6 py-4 text-gray-600 dark:text-gray-350 font-mono text-xs">
                {row.string}
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                {row.context}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const frameworks = [
  {
    name: 'React 19',
    subpath: '/react',
    approach: 'React component',
    detail:
      'Exports a named React component wrapper that maps properties, attributes, and events natively in React JSX, with full TypeScript typing.',
    code: `import { Table } from '@uibit/table/react';\n\n// Render the wrapper component with full type support and React event props\n<Table searchable={true} onChange={(e) => console.log(e.detail)} />`,
  },
  {
    name: 'Vue 3',
    subpath: '/vue',
    approach: 'SFC component',
    detail:
      'Exports a named Vue component wrapper that handles v-model, event listeners, and prop binding in standard SFC syntax.',
    code: `import { Table } from '@uibit/table/vue';\n\n<Table :searchable="true" @change="onChange" />`,
  },
  {
    name: 'Svelte 5',
    subpath: '/svelte',
    approach: 'Svelte component',
    detail:
      'Exports a Svelte component using runes and Snippets for slot projection.',
    code: `<script>\n  import Table from '@uibit/table/svelte';\n</script>\n\n<Table searchable={true} />`,
  },
  {
    name: 'Angular',
    subpath: '/angular',
    approach: 'Standalone directive',
    detail:
      'Exports a standalone Angular component directive you can import directly into any NgModule or standalone component.',
    code: `import { NgxTable } from '@uibit/table/angular';\n\n@Component({\n  imports: [NgxTable],\n  template: '<uibit-table [searchable]="true"></uibit-table>'\n})`,
  },
  {
    name: 'Astro',
    subpath: '/astro',
    approach: 'JSX types',
    detail:
      'Extends global JSX types for Astro templates, preserving client hydration directives.',
    code: `import '@uibit/table/astro';\n\n<uibit-table searchable client:load />`,
  },
  {
    name: 'Preact',
    subpath: '/preact',
    approach: 'JSX types',
    detail:
      "Extends Preact's JSX.IntrinsicElements namespace — no runtime wrapper, pure type augmentation.",
    code: `import '@uibit/table/preact';\n\n<uibit-table searchable={true} />`,
  },
  {
    name: 'Vanilla TS',
    subpath: '/vanilla',
    approach: 'DOM types',
    detail:
      'Registers the element in HTMLElementTagNameMap so document.createElement and querySelector calls return the correct typed instance.',
    code: `import '@uibit/table/vanilla';\n\nconst table = document.createElement('uibit-table');\n// typed as Table, not HTMLElement`,
  },
  {
    name: 'Stencil',
    subpath: '/stencil',
    approach: 'JSX types',
    detail:
      "Maps custom element typings directly into Stencil's JSX namespace for clean composition inside Stencil components.",
    code: `import '@uibit/table/stencil';\n\n<uibit-table searchable={true} />`,
  },
];

function FrameworksMatrix() {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="px-0 py-2.5 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">
              Framework
            </th>
            <th className="px-0 py-2.5 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">
              Subpath
            </th>
            <th className="px-0 py-2.5 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">
              Approach
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
          {frameworks.map((fw) => (
            <tr key={fw.name} className="bg-transparent">
              <td className="px-0 py-3 text-left align-top text-gray-655 dark:text-gray-350 text-sm pr-4 last:pr-0">
                {fw.name}
              </td>
              <td className="px-0 py-3 text-left align-top font-mono text-xs text-gray-600 dark:text-gray-400 pr-4 last:pr-0">
                {fw.subpath}
              </td>
              <td className="px-0 py-3 text-left align-top text-gray-500 dark:text-gray-400 pr-4 last:pr-0">
                {fw.approach}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FrameworksUsage() {
  return (
    <div className="space-y-10 my-6">
      {frameworks.map((fw) => (
        <div key={fw.name} className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {fw.name}
            </h3>
            <code className="text-xs font-mono text-gray-400 dark:text-gray-500">
              @uibit/[package]{fw.subpath}
            </code>
          </div>
          <p className="text-sm text-gray-650 dark:text-gray-400 mb-3 leading-relaxed">
            {fw.detail}
          </p>
          <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm leading-relaxed font-mono">
            <code>{fw.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

export default function MarkdownPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const page = pageId ? contentRegistry[pageId] : undefined;
  const [activeSection, setActiveSection] = useState<string>('');

  useHead({
    title: page ? page.title : 'Documentation – UIBit',
    description: page ? page.description : 'UIBit Documentation.',
  });

  const tocItems = useMemo(
    () =>
      page
        ? page.markdown
            .split('\n')
            .filter((line) => line.startsWith('## '))
            .map((line) => {
              const text = line.substring(3).trim();
              return {
                id: slugify(text),
                label: text,
              };
            })
        : [],
    [page],
  );

  useEffect(() => {
    if (tocItems.length === 0) return;
    const sections = tocItems.map((item) => item.id);
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const closest = visibleEntries.reduce((prev, curr) => {
            return Math.abs(curr.boundingClientRect.top) <
              Math.abs(prev.boundingClientRect.top)
              ? curr
              : prev;
          });
          setActiveSection(closest.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  if (!pageId || !page) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The requested documentation page does not exist.
        </p>
        <Link
          to="/"
          className="text-gray-900 dark:text-white underline font-medium hover:text-gray-600 dark:hover:text-gray-300"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const customRenderers = {
    'strings-table-placeholder': () => <LocalizedStringsTable />,
    'icons-grid-placeholder': () => <IconsGrid />,
    'frameworks-matrix-placeholder': () => <FrameworksMatrix />,
    'frameworks-usage-placeholder': () => <FrameworksUsage />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId={pageId} className="hidden md:block" />

        <div className="flex-1 min-w-0">
          {renderMarkdownBlocks(page.markdown, customRenderers)}
        </div>

        {tocItems.length > 0 && (
          <aside className="hidden lg:block w-48 shrink-0 pl-6 sticky top-24 self-start">
            <h2 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
              On this page
            </h2>
            <nav className="space-y-2">
              {tocItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block text-sm transition-all duration-150 ${
                      isActive
                        ? 'text-gray-950 dark:text-white font-medium'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
