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
  return (
    <div className="border border-gray-200 rounded-b-lg overflow-hidden -mt-px">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
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
        <div className="bg-gray-900">
          <div className="flex items-center justify-end gap-1 px-3 pt-2">
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
          <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
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
      <div className="max-w-6xl mx-auto px-4 py-16 text-center bg-white">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Component Not Found</h1>
        <p className="text-gray-600 mb-6">The requested component documentation does not exist.</p>
        <Link to="/" className="text-gray-900 underline font-medium hover:text-gray-600">
          Return Home
        </Link>
      </div>
    );
  }

  const { title, description, packageName, tagName, manifest, Demo, demoCode, examples, usages, features } = comp;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6 md:sticky md:top-8 md:h-[calc(100vh-6rem)] md:overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Foundations
            </h2>
            <nav className="space-y-1 pr-2 mb-6">
              <Link
                to="/styling"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
              >
                Styling & Theming
              </Link>
            </nav>

            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Components
            </h2>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gray-900 font-sans"
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
                        ? 'bg-gray-100 text-gray-950 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
              {filteredComponents.length === 0 && (
                <p className="text-xs text-gray-600 italic px-3 py-2">No matching components</p>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Documentation Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Link to="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{title}</span>
            </p>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
              {description}
            </p>
            <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
              pnpm add {packageName}
            </code>
          </header>

          {/* Live Demo */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Demo</h2>
            <div className={`bg-white p-6 border border-gray-200 ${demoCode ? 'rounded-t-lg' : 'rounded-lg mb-4'}`}>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-8">Examples</h2>
              <div className="space-y-12">
                {examples.map((example, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{example.title}</h3>
                    {example.description && (
                      <p className="text-sm text-gray-600 mb-4">{example.description}</p>
                    )}
                    <div className="bg-white rounded-t-lg p-6 border border-gray-200 border-b-0">
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage</h2>
              <div className="space-y-8">
                {usages.map((usage, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      {usage.title}
                    </h3>
                    {usage.description && (
                      <p className="text-sm text-gray-600 mb-3">{usage.description}</p>
                    )}
                    <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                      <code>{usage.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Features */}
          {features && features.length > 0 && (
            <section className="mb-12 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gray-900 font-semibold mt-0.5">—</span>
                    <span className="text-gray-700 text-sm">{feature}</span>
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
