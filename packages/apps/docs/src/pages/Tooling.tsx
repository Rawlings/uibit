import { Link } from 'react-router-dom';
import { useHead } from '../hooks/useHead';
import { TOOLING, TOOLING_CATEGORY_ORDER } from '../config/navigation';

const DESCRIPTIONS: Record<string, string> = {
  codegen:
    'Generate React, Vue 3, Svelte 5, Angular, SolidJS, Astro, Preact, and Vanilla TS wrappers from a Custom Elements Manifest.',
  'base-class':
    'Shared foundation, optimizations, event dispatch, and performance decorators for UIBit components.',
  'form-internals':
    'Standardized wrapper around ElementInternals for form participation, CSS validation states, and constraint validation.',
  hmr: 'Swaps updated Custom Element classes and styles in-place without a page reload, preserving component state.',
  'cem-extended':
    'Custom Elements Manifest generator plugin adding JSDoc method parameter/return details, custom states, and heritage.',
  'cem-mcp':
    'Local Model Context Protocol (MCP) server exposing UIBit Custom Elements Manifest schemas to AI coding agents.',
  'cem-oxc':
    'Ultra-fast, zero-dependency Custom Elements Manifest generator powered by OXC and Rust.',
  hoistlock:
    'Zero-configuration, ultra-fast bundle hoisting prevention engine in Rust.',
};

function Tooling() {
  useHead({
    title: 'Tooling – UIBit',
    description:
      'The tooling that builds and maintains the UIBit component library — wrapper codegen, manifest tooling, and runtime utilities you can use in your own projects.',
  });

  const grouped = TOOLING_CATEGORY_ORDER.map((category) => ({
    category,
    items: TOOLING.filter((item) => item.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="relative bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
          Tooling
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-950 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400 font-sans">
            The tooling behind the components.
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Every UIBit component is generated, validated, and shipped through
          this tooling. It's independent of the component library itself — drop
          any piece into your own custom element project.
        </p>
      </section>

      {/* Grouped tool grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="space-y-16">
          {grouped.map(({ category, items }) => (
            <div
              key={category}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              <div className="md:col-span-1">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {category}
                </h2>
              </div>
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                  {items.map((item) => (
                    <Link key={item.id} to={item.to} className="group block">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex items-center gap-1">
                        {item.title}
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                        {DESCRIPTIONS[item.id]}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-link back to components */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border-t border-gray-100 dark:border-gray-900 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            Want to see this tooling in action? Every component in the library
            is built with it.
          </p>
          <Link
            to="/components"
            className="shrink-0 px-4 py-2 border border-gray-250 dark:border-gray-800 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm inline-flex items-center gap-2"
          >
            Explore components
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Tooling;
