import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function Changelog() {
  useHead({
    title: 'Changelog – UIBit',
    description: 'Release history and updates for the UIBit workspace and component packages.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="changelog" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Changelog
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-4">
              All notable changes to the UIBit component library monorepo will be documented here.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 max-w-3xl italic">
              Note: Each component package is independently versioned. For component-specific fixes, refer to the local changelog linked within the component's source directory.
            </p>
          </header>

          <section className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">v0.1.0</h2>
              <span className="text-sm text-gray-400 dark:text-gray-500">2026-07-12</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Added</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><strong>Monorepo Workspace</strong>: Initial release of the UIBit workspace containing 25 independently versioned component packages.</li>
              <li><strong>Documentation</strong>: Modern React & Tailwind web application with search command palette, layout density selectors, and framework integration code panels.</li>
              <li><strong>Community Standards</strong>: Added Code of Conduct, Support guidelines, and comprehensive contributing instructions.</li>
              <li><strong>Core Library (@uibit/core)</strong>: Initial release with design tokens, HSL palette variables, accessibility mixins, and typography presets.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
