import { Link } from 'react-router-dom';
import { componentRegistry } from './components';
import { useHead } from '../hooks/useHead';

function Home() {
  useHead({
    title: 'UIBit – Premium Web Components',
    description:
      'A curated library of high-quality web components built on native browser standards. Encapsulated, accessible, and designed to last.',
  });

  const componentsMap = Object.keys(componentRegistry).reduce((acc, key) => {
    const comp = componentRegistry[key]!;
    acc[key] = {
      id: comp.id,
      name: comp.title,
      description: comp.description,
      packageName: comp.packageName,
      tagName: comp.tagName,
    };
    return acc;
  }, {} as Record<string, { id: string; name: string; description: string; packageName: string; tagName: string }>);

  const categories = [
    {
      name: 'Visual & Media',
      ids: ['carousel', 'viewer-360', 'hotspot', 'image-xray', 'isometric-cluster'],
    },
    {
      name: 'Forms & Input',
      ids: ['signature-pad', 'sentiment-bar', 'consent-guard'],
    },
    {
      name: 'Typography & Display',
      ids: ['text-typing', 'text-clamp', 'text-read-timer', 'text-rotator'],
    },
    {
      name: 'Data & Utilities',
      ids: ['table', 'scroll-progress', 'number-ticker', 'countdown', 'effect-trigger', 'scratch-reveal', 'diff-viewer'],
    },
    {
      name: 'A/B Testing',
      ids: ['ab-test'],
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-950 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400 font-sans">
            UI components the browser understands.
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-4">
          A curated set of polished, accessible web components built on the platform itself — not on top of it.
          No virtual DOM. No runtime overhead. Just elements.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          Built with Lit · Shadow DOM encapsulated · WCAG AA accessible
        </p>

        {/* Quick install */}
        <div className="inline-flex items-center gap-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2.5 mb-8 font-mono text-sm text-gray-700 dark:text-gray-300">
          <span className="text-gray-400 dark:text-gray-500 select-none">$</span>
          npm install @uibit/core
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/styling"
            className="px-5 py-2.5 bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-sm shadow-sm"
          >
            Read the docs
          </Link>
          <a
            href="https://github.com/rawlings/uibit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-gray-200 dark:border-gray-800 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            GitHub
          </a>
        </div>
      </section>

      {/* Why UIBit */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              heading: 'Works Everywhere',
              body: 'Standard HTML custom elements run natively in any framework or plain HTML — the same tag, the same API, the same bundle. No framework-specific builds.',
            },
            {
              heading: 'Isolated by Default',
              body: 'Shadow DOM encapsulation means component internals are invisible to global styles. Your CSS never breaks our components; our CSS never leaks into yours.',
            },
            {
              heading: 'Typed for Your Stack',
              body: 'Auto-generated wrappers ship type definitions for React 19, Vue 3, Svelte 5, Angular, Astro, Preact, Stencil, and vanilla TypeScript — full IDE autocomplete, zero runtime overhead.',
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{heading}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-900">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-5">Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              to: '/styling',
              label: 'Styling & Theming',
              description: 'Three-tier CSS token architecture. Override anything from global palette to per-component properties.',
            },
            {
              to: '/localization',
              label: 'Localization',
              description: 'Ship in any language. Built-in @lit/localize support with automatic RTL layout handling.',
            },
            {
              to: '/icons',
              label: 'Icons',
              description: 'Built-in Lucide icons. Override any icon or register your own with a single function call.',
            },
            {
              to: '/foundations',
              label: 'Framework Integrations',
              description: 'Auto-generated type wrappers for React, Vue, Svelte, Angular, Astro, and more.',
            },
          ].map(({ to, label, description }) => (
            <Link
              key={to}
              to={to}
              className="p-5 border border-gray-100 dark:border-gray-900/60 rounded-xl hover:border-gray-300 dark:hover:border-gray-800 transition-all group block"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {label}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Components Section */}
      <section id="components" className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-900 scroll-mt-20">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-8">
          Components
        </h2>

        <div className="space-y-12">
          {categories.map((cat, idx) => {
            const catComps = cat.ids
              .map((id) => componentsMap[id])
              .filter(Boolean);

            if (catComps.length === 0) return null;

            return (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-gray-400 dark:text-gray-600">{catComps.length}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catComps.map((comp) => (
                    <Link
                      key={comp.id}
                      to={`/${comp.id}`}
                      className="p-5 border border-gray-100 dark:border-gray-900 rounded-xl hover:border-gray-300 dark:hover:border-gray-800 transition-all group block"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {comp.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {comp.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                          {comp.packageName}
                        </span>
                        <span className="text-[10px] text-gray-300 dark:text-gray-700 font-mono">
                          {'<'}{comp.tagName}{'>'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
