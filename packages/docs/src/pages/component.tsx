import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ApiDocs } from '../components/ApiDocs';
import { componentRegistry } from './components';
import { useHead } from '../hooks/useHead';
import { DualCode } from '../types/docs';

type CodeTab = 'html' | 'react';

function CodePanel({ code }: { code: DualCode }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<CodeTab>('html');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-b-lg overflow-hidden -mt-px transition-colors duration-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900 transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
      >
        <span className="font-medium">{open ? 'Hide code' : 'Show code'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="bg-gray-900 relative group">
          <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-gray-800/60">
            <div className="flex items-center gap-1">
              {(['html', 'react'] as CodeTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    tab === t
                      ? 'bg-white/15 text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {t === 'html' ? 'HTML' : 'React'}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-green-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed !bg-transparent !rounded-none">
            <code>{code[tab]}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default function ComponentDocs() {
  const { componentId } = useParams<{ componentId: string }>();
  const comp = componentId ? componentRegistry[componentId] : undefined;

  const [searchQuery, setSearchQuery] = useState('');

  useHead({
    title: comp ? `${comp.title} – UIBit` : 'UIBit – Web Components Library',
    description: comp
      ? comp.description
      : 'A collection of accessible, production-ready web components built with Lit.js.',
  });

  const allComponents = Object.values(componentRegistry).sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const filteredComponents = allComponents.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!componentId || !comp) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Component Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested component documentation does not exist.</p>
        <Link to="/" className="text-gray-900 dark:text-white underline font-medium hover:text-gray-600 dark:hover:text-gray-300">
          Return Home
        </Link>
      </div>
    );
  }

  const { title, description, packageName, tagName, manifest, Demo, demoCode, examples, usages, features } = comp;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 pb-6 md:pb-0 md:pr-6 md:sticky md:top-8 md:h-[calc(100vh-6rem)] md:overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Foundations
            </h2>
            <nav className="space-y-1 pr-2 mb-6">
              <Link
                to="/styling"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                Styling & Theming
              </Link>
            </nav>

            <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              Components
            </h2>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-md text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 font-sans"
              />
            </div>
            <nav className="space-y-1 pr-2">
              {filteredComponents.map((item) => {
                const isActive = item.id === componentId;
                return (
                  <Link
                    key={item.id}
                    to={`/${item.id}`}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
              {filteredComponents.length === 0 && (
                <p className="text-xs text-gray-600 dark:text-gray-400 italic px-3 py-2">No matching components</p>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Documentation Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium">{title}</span>
            </p>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-450 mb-6 leading-relaxed max-w-3xl">
              {description}
            </p>
            <code className="inline-block bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
              pnpm add {packageName}
            </code>
          </header>

          {/* Live Demo */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo</h2>
            <div className={`bg-white dark:bg-gray-950 p-6 border border-gray-200 dark:border-gray-800 ${demoCode ? 'rounded-t-lg' : 'rounded-lg mb-4'}`}>
              <Demo />
            </div>
            {demoCode && <CodePanel code={demoCode} />}
          </section>

          {/* API Reference */}
          <section className="mb-12">
            <ApiDocs manifest={manifest} tagName={tagName} />
          </section>

          {/* Rich examples (new format) */}
          {examples && examples.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">Examples</h2>
              <div className="space-y-12">
                {examples.map((example, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{example.title}</h3>
                    {example.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{example.description}</p>
                    )}
                    <div className="bg-white dark:bg-gray-950 rounded-t-lg p-6 border border-gray-200 dark:border-gray-800 border-b-0">
                      <example.Demo />
                    </div>
                    <CodePanel code={example.code} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Legacy usage snippets (old format fallback) */}
          {!examples && usages && usages.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage</h2>
              <div className="space-y-8">
                {usages.map((usage, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                      {usage.title}
                    </h3>
                    {usage.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-450 mb-3">{usage.description}</p>
                    )}
                    <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                      <code>{usage.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accessibility (A11y) Guide */}
          {comp.a11y && (
            <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accessibility & WCAG Compliance</h2>
              <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black rounded text-xs font-bold uppercase tracking-wider">
                    WCAG {comp.a11y.wcagLevel} Compliance
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-750 dark:text-gray-300 mb-5">
                  {comp.a11y.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                {comp.a11y.keyboardNav && comp.a11y.keyboardNav.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Keyboard Interaction:</h3>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden bg-white dark:bg-gray-950">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400">Key</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400">Function</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          {comp.a11y.keyboardNav.map((kb, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 font-mono text-xs font-bold text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-900/20">{kb.key}</td>
                              <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{kb.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {/* Key Features */}
          {features && features.length > 0 && (
            <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gray-900 dark:text-white font-semibold mt-0.5">—</span>
                    <span className="text-gray-750 dark:text-gray-350 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
