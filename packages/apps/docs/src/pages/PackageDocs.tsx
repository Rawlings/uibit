import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';
import { renderMarkdownBlocks, slugify } from '../utils/markdown';

// Raw import of package README markdown files
import codegenReadme from '../../../../platform/codegen/README.md?raw';
import coreReadme from '../../../../platform/core/README.md?raw';
import formInternalsReadme from '../../../../platform/form-internals/README.md?raw';
import hmrReadme from '../../../../platform/vite-plugin-wc-hmr/README.md?raw';
import cemExtendedReadme from '../../../../platform/cem-extended/README.md?raw';
import cemMcpReadme from '../../../../platform/cem-mcp/README.md?raw';
import cemOxcReadme from '../../../../platform/cem-oxc/README.md?raw';
interface PackageData {
  title: string;
  description: string;
  packageName: string;
  readme: string;
  githubUrl?: string;
}

const packagesRegistry: Record<string, PackageData> = {
  'base-class': {
    title: 'Base Class',
    description: 'Shared foundation, optimizations, event dispatch, and performance decorators for UIBit components.',
    packageName: '@uibit/core',
    readme: coreReadme,
    githubUrl: 'https://github.com/rawlings/uibit/tree/main/packages/platform/core',
  },
  codegen: {
    title: 'Codegen',
    description: 'Use the wrapper generator to build React, Vue 3, Svelte 5, Angular, SolidJS, Astro, Preact, and Vanilla TS wrappers for Lit components.',
    packageName: '@uibit/codegen',
    readme: codegenReadme,
    githubUrl: 'https://github.com/rawlings/uibit/tree/main/packages/platform/codegen',
  },
  'form-internals': {
    title: 'Form Internals',
    description: 'Polyfilled and standardized wrapper around ElementInternals for robust form participation, CSS validation states, and constraint validation.',
    packageName: '@uibit/form-internals',
    readme: formInternalsReadme,
    githubUrl: 'https://github.com/rawlings/uibit/tree/main/packages/platform/form-internals',
  },
  hmr: {
    title: 'Vite Plugin WC HMR',
    description: 'True Hot Module Replacement for custom elements. Swaps updated classes and styles in-place without a page reload, preserving component state. Works with Lit, vanilla CE, FAST, Stencil, and more.',
    packageName: '@uibit/vite-plugin-wc-hmr',
    readme: hmrReadme,
    githubUrl: 'https://github.com/rawlings/uibit/tree/main/packages/platform/vite-plugin-wc-hmr',
  },
  'cem-extended': {
    title: 'CEM Extended',
    description: 'Extended Custom Elements Manifest generator plugin. Adds JSDoc method parameter/return descriptions, custom CSS states, mixin field heritage, and deprecation/since metadata.',
    packageName: '@uibit/cem-extended',
    readme: cemExtendedReadme,
    githubUrl: 'https://github.com/rawlings/uibit/tree/main/packages/platform/cem-extended',
  },
  'cem-mcp': {
    title: 'CEM MCP Server',
    description: 'Local Model Context Protocol (MCP) server exposing UIBit Custom Elements Manifest (CEM) schemas to AI agents.',
    packageName: '@uibit/cem-mcp',
    readme: cemMcpReadme,
    githubUrl: 'https://github.com/rawlings/uibit/tree/main/packages/platform/cem-mcp',
  },
  'cem-oxc': {
    title: 'CEM OXC',
    description: 'Ultra-fast, zero-dependency Custom Elements Manifest (CEM) generator powered by OXC and Rust. Drop-in replacement for the native analyzer that runs up to 123x faster.',
    packageName: '@uibit/cem-oxc',
    readme: cemOxcReadme,
    githubUrl: 'https://github.com/rawlings/uibit/tree/main/packages/platform/cem-oxc',
  },
};

export default function PackageDocs() {
  const { packageId } = useParams<{ packageId: string }>();
  const pkg = packageId ? packagesRegistry[packageId] : undefined;

  useHead({
    title: pkg ? `${pkg.title} – UIBit` : 'Ecosystem – UIBit',
    description: pkg ? pkg.description : 'Ecosystem integrations and helpers for UIBit.',
  });

  const [activeSection, setActiveSection] = useState<string>('');

  // Extract headings for Table of Contents
  const tocItems = pkg
    ? pkg.readme
        .split('\n')
        .filter((line) => line.startsWith('## '))
        .map((line) => {
          const text = line.substring(3).trim();
          return {
            id: slugify(text),
            label: text,
          };
        })
    : [];

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
    return renderMarkdownBlocks(md, undefined, skipHeaderPrefix);
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
                href={pkg.githubUrl || 'https://github.com/rawlings/uibit'}
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
              <a
                href={`https://www.npmjs.com/package/${pkg.packageName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span>npm</span>
              </a>
            </div>
          </header>
          <section className="py-2 text-gray-700 dark:text-gray-350">
            {renderContent(pkg.readme)}
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
