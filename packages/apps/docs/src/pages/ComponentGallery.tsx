import { Link } from 'react-router-dom';
import { componentRegistry } from './components';
import { useHead } from '../hooks/useHead';
import { CATEGORY_ORDER } from '../config/navigation';

function Components() {
  useHead({
    title: 'Components – UIBit',
    description:
      'A curated library of high-quality web components built on native browser standards. Encapsulated, accessible, and designed to last.',
  });

  const grouped = Object.values(componentRegistry).reduce((acc, comp) => {
    const cat = comp.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(comp);
    return acc;
  }, {} as Record<string, typeof componentRegistry[string][]>);

  const categories = [...CATEGORY_ORDER, ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c))]
    .map((label) => ({
      label,
      components: (grouped[label] || []).sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .filter((c) => c.components.length > 0);

  return (
    <div className="relative bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          Components
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-950 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400 font-sans">
            Premium micro-experiences for your web applications.
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          A curated library of beautiful, interactive, and high-performance components designed to engage users and
          elevate your product's user interface.
        </p>
      </section>

      {/* Grouped component grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="space-y-16">
          {categories.map((cat) => (
            <div key={cat.label} className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {cat.label}
                </h2>
              </div>
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                  {cat.components.map((comp) => (
                    <Link key={comp.id} to={`/components/${comp.id}`} className="group block">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex items-center gap-1 mb-2">
                        {comp.title}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 font-normal">
                        {comp.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-link to tooling */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border-t border-gray-100 dark:border-gray-900 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            Every component here is generated and validated by UIBit's own tooling.
          </p>
          <Link
            to="/tooling"
            className="shrink-0 px-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm inline-flex items-center gap-2"
          >
            Explore tooling
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Components;
