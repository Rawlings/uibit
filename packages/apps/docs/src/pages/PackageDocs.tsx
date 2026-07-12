import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';
import { renderMarkdownInline, slugify } from '../utils/markdown';

// Raw import of package README markdown files
import codegenReadme from '../../../../platform/codegen/README.md?raw';
import coreReadme from '../../../../platform/core/README.md?raw';
import formInternalsReadme from '../../../../platform/form-internals/README.md?raw';
import hmrReadme from '../../../../platform/vite-plugin-wc-hmr/README.md?raw';

interface PackageData {
  title: string;
  description: string;
  packageName: string;
  readme: string;
}

const packagesRegistry: Record<string, PackageData> = {
  'base-class': {
    title: 'Base Class',
    description: 'Shared foundation, optimizations, event dispatch, and performance decorators for UIBit components.',
    packageName: '@uibit/core',
    readme: coreReadme,
  },
  frameworks: {
    title: 'Framework Integrations',
    description: 'Use UIBit components in React, Vue, Svelte, Angular, Astro, Preact, Stencil, and vanilla TypeScript with auto-generated type wrappers.',
    packageName: '@uibit/codegen',
    readme: codegenReadme,
  },
  'form-internals': {
    title: 'Form Internals',
    description: 'Polyfilled and standardized wrapper around ElementInternals for robust form participation, CSS validation states, and constraint validation.',
    packageName: '@uibit/form-internals',
    readme: formInternalsReadme,
  },
  hmr: {
    title: 'Vite Plugin WC HMR',
    description: 'True Hot Module Replacement for custom elements. Swaps updated classes and styles in-place without a page reload, preserving component state. Works with Lit, vanilla CE, FAST, Stencil, and more.',
    packageName: '@uibit/vite-plugin-wc-hmr',
    readme: hmrReadme,
  },
};

const frameworks = [
  {
    name: 'React 19',
    subpath: '/react',
    approach: 'JSX types',
    detail: 'Extends React.JSX.IntrinsicElements so you write the custom element tag directly in JSX with full prop autocomplete.',
    code: `import '@uibit/table/react';\n\n// The custom element tag is now typed natively\n<uibit-table searchable={true} />`,
  },
  {
    name: 'Vue 3',
    subpath: '/vue',
    approach: 'SFC component',
    detail: 'Exports a named Vue component wrapper that handles v-model, event listeners, and prop binding in standard SFC syntax.',
    code: `import { Table } from '@uibit/table/vue';\n\n<Table :searchable="true" @change="onChange" />`,
  },
  {
    name: 'Svelte 5',
    subpath: '/svelte',
    approach: 'Svelte component',
    detail: 'Exports a Svelte component using runes and Snippets for slot projection.',
    code: `<script>\n  import Table from '@uibit/table/svelte';\n</script>\n\n<Table searchable={true} />`,
  },
  {
    name: 'Angular',
    subpath: '/angular',
    approach: 'Standalone directive',
    detail: 'Exports a standalone Angular component directive you can import directly into any NgModule or standalone component.',
    code: `import { NgxTable } from '@uibit/table/angular';\n\n@Component({\n  imports: [NgxTable],\n  template: '<uibit-table [searchable]="true"></uibit-table>'\n})`,
  },
  {
    name: 'Astro',
    subpath: '/astro',
    approach: 'JSX types',
    detail: 'Extends global JSX types for Astro templates, preserving client hydration directives.',
    code: `import '@uibit/table/astro';\n\n<uibit-table searchable client:load />`,
  },
  {
    name: 'Preact',
    subpath: '/preact',
    approach: 'JSX types',
    detail: "Extends Preact's JSX.IntrinsicElements namespace — no runtime wrapper, pure type augmentation.",
    code: `import '@uibit/table/preact';\n\n<uibit-table searchable={true} />`,
  },
  {
    name: 'Vanilla TS',
    subpath: '/vanilla',
    approach: 'DOM types',
    detail: 'Registers the element in HTMLElementTagNameMap so document.createElement and querySelector calls return the correct typed instance.',
    code: `import '@uibit/table/vanilla';\n\nconst table = document.createElement('uibit-table');\n// typed as Table, not HTMLElement`,
  },
  {
    name: 'Stencil',
    subpath: '/stencil',
    approach: 'JSX types',
    detail: "Maps custom element typings directly into Stencil's JSX namespace for clean composition inside Stencil components.",
    code: `import '@uibit/table/stencil';\n\n<uibit-table searchable={true} />`,
  },
];



export default function PackageDocs() {
  const { packageId } = useParams<{ packageId: string }>();
  const pkg = packageId ? packagesRegistry[packageId] : undefined;

  useHead({
    title: pkg ? `${pkg.title} – UIBit` : 'Ecosystem – UIBit',
    description: pkg ? pkg.description : 'Ecosystem integrations and helpers for UIBit.',
  });

  const [activeSection, setActiveSection] = useState<string>('');

  // Extract headings for Table of Contents
  let tocItems: { id: string; label: string }[] = [];
  if (packageId === 'frameworks') {
    tocItems = [
      { id: 'compatibility-matrix', label: 'Compatibility Matrix' },
      { id: 'usage-by-framework', label: 'Usage by Framework' },
      { id: 'automatic-wrapper-generation', label: 'Automatic Wrapper Generation' },
    ];
  } else if (pkg) {
    tocItems = pkg.readme
      .split('\n')
      .filter((line) => line.startsWith('## '))
      .map((line) => {
        const text = line.substring(3).trim();
        return {
          id: slugify(text),
          label: text,
        };
      });
  }

  useEffect(() => {
    if (tocItems.length === 0) return;
    const sections = tocItems.map((item) => item.id);
    const elements = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const closest = visibleEntries.reduce((prev, curr) => {
            return Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev;
          });
          setActiveSection(closest.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [packageId, tocItems.length]);

  if (!packageId || !pkg) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested documentation page does not exist.</p>
        <Link to="/" className="text-gray-900 dark:text-white underline font-medium hover:text-gray-600 dark:hover:text-gray-300">
          Return Home
        </Link>
      </div>
    );
  }

  const renderContent = (md: string, skipHeaderPrefix = '') => {
    const lines = md.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-2 text-sm text-gray-650 dark:text-gray-400 mb-6 leading-relaxed">
            {currentList}
          </ul>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (inCodeBlock) {
        const code = codeBlockLines.join('\n');
        elements.push(
          <pre key={`code-${elements.length}`} className="code-block bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm leading-relaxed mb-6 font-mono">
            <code>{code}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle Code Blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
        } else {
          flushList();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        continue;
      }

      // Handle main title (skip if it's the main H1, as we render custom header)
      if (trimmed.startsWith('# ')) {
        flushList();
        continue;
      }

      // Handle Headings
      if (trimmed.startsWith('## ')) {
        flushList();
        const text = trimmed.substring(3).trim();
        const elementId = skipHeaderPrefix ? `${skipHeaderPrefix}-${slugify(text)}` : slugify(text);
        elements.push(
          <h2 id={elementId} key={`h2-${i}`} className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 pb-2 border-b border-gray-100 dark:border-gray-900 scroll-mt-20">
            {renderMarkdownInline(text)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        const text = trimmed.substring(4).trim();
        elements.push(
          <h3 key={`h3-${i}`} className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-6">
            {renderMarkdownInline(text)}
          </h3>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const text = trimmed.substring(2);
        currentList.push(
          <li key={`li-${i}`}>
            {renderMarkdownInline(text)}
          </li>
        );
      } else {
        flushList();
        elements.push(
          <p key={`p-${i}`} className="text-sm text-gray-650 dark:text-gray-455 mb-4 leading-relaxed">
            {renderMarkdownInline(trimmed)}
          </p>
        );
      }
    }

    flushList();
    flushCodeBlock();

    return elements;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId={packageId} className="hidden md:block" />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              {pkg.title}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl">
              {pkg.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <code className="inline-block bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
                npm install {pkg.packageName}
              </code>
              <a
                href={
                  packageId === 'frameworks'
                    ? 'https://github.com/rawlings/uibit/tree/main/packages/platform/codegen'
                    : 'https://github.com/rawlings/uibit/tree/main/packages/platform/core'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>View Source</span>
              </a>
            </div>
          </header>

          <section className="py-2 text-gray-700 dark:text-gray-350">
            {packageId === 'frameworks' ? (
              <>
                {/* Compatibility Matrix (from Frameworks.tsx) */}
                <section id="compatibility-matrix" className="pb-10 scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-900 pb-2">
                    Compatibility Matrix
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <th className="py-2 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Framework</th>
                          <th className="py-2 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Subpath</th>
                          <th className="py-2 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Approach</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {frameworks.map((fw) => (
                          <tr key={fw.name} className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors">
                            <td className="py-3 font-medium text-gray-900 dark:text-white text-sm pr-4 last:pr-0">{fw.name}</td>
                            <td className="py-3 font-mono text-xs text-gray-650 dark:text-gray-400 pr-4 last:pr-0">{fw.subpath}</td>
                            <td className="py-3 text-gray-600 dark:text-gray-350 text-sm pr-4 last:pr-0">{fw.approach}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Usage by Framework (from Frameworks.tsx) */}
                <section id="usage-by-framework" className="py-10 scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-900 pb-2">
                    Usage by Framework
                  </h2>
                  <div className="space-y-10">
                    {frameworks.map((fw) => (
                      <div key={fw.name} className="scroll-mt-20">
                        <div className="flex items-baseline gap-3 mb-2">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{fw.name}</h3>
                          <code className="text-xs font-mono text-gray-400 dark:text-gray-500">@uibit/[package]{fw.subpath}</code>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{fw.detail}</p>
                        <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                          <code>{fw.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Automatic Wrapper Generation (@uibit/codegen details) */}
                <section id="automatic-wrapper-generation" className="py-10 scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-900 pb-2">
                    Automatic Wrapper Generation
                  </h2>
                  {renderContent(pkg.readme, 'codegen')}
                </section>
              </>
            ) : (
              renderContent(pkg.readme)
            )}
          </section>
        </div>

        {/* Right Sidebar (Table of Contents) */}
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
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
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
