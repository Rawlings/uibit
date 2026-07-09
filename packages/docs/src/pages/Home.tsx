import { Link } from 'react-router-dom';
import { componentRegistry } from './components';
import { useHead } from '../hooks/useHead';

function Home() {
  useHead({
    title: 'UIBit – Premium Web Components',
    description:
      'Accessible, framework-agnostic web components built with Lit. Performance-first design for modern interfaces.',
  });

  const componentsMap = Object.keys(componentRegistry).reduce((acc, key) => {
    const comp = componentRegistry[key]!;
    acc[key] = {
      id: comp.id,
      name: comp.title,
      description: comp.description,
      install: comp.packageName,
    };
    return acc;
  }, {} as Record<string, { id: string; name: string; description: string; install: string }>);

  // Group components by functional category
  const categories = [
    {
      name: 'Visual & Media',
      ids: ['carousel', 'viewer-360', 'hotspot', 'image-xray', 'isometric-cluster'],
    },
    {
      name: 'Forms & Inputs',
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
  ];

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-950 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400 font-sans">
            Web components built right.
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
          A clean catalog of accessible, framework-agnostic web components powered by Lit. Designed for modern web applications.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/styling"
            className="px-5 py-2.5 bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all text-sm shadow-sm"
          >
            Get Started
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

      {/* Guides Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { to: '/styling', label: 'Styling', description: 'CSS custom properties and density.' },
            { to: '/localization', label: 'Localization', description: 'Built-in labels and text overrides.' },
            { to: '/icons', label: 'Icons', description: 'Default vector asset customization.' },
          ].map(({ to, label, description }) => (
            <Link
              key={to}
              to={to}
              className="p-5 border border-gray-100 dark:border-gray-900/60 rounded-xl hover:border-gray-300 dark:hover:border-gray-800 transition-all group block"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {label}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Components Section */}
      <section id="components" className="max-w-5xl mx-auto px-6 py-12 border-t border-gray-100 dark:border-gray-900 scroll-mt-20">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-10">
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
                <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {cat.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catComps.map((comp) => (
                    <Link
                      key={comp.id}
                      to={`/${comp.id}`}
                      className="p-5 border border-gray-100 dark:border-gray-900 bg-gray-50/20 dark:bg-gray-900/10 rounded-xl hover:border-gray-300 dark:hover:border-gray-800 transition-all group block"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {comp.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
                        {comp.description}
                      </p>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                        {comp.install}
                      </span>
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
