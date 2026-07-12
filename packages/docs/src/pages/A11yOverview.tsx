import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function A11yOverview() {
  useHead({
    title: 'Accessibility Overview – UIBit',
    description: 'Learn about UIBit\'s approach to WCAG 2.1 AA compliance, keyboard navigation, and ARIA support.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="accessibility" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Accessibility Overview
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Accessibility is not an afterthought in UIBit. Every component is designed from the ground up to meet and exceed WCAG 2.1 AA standards.
            </p>
          </header>

          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Keyboard Navigation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Every interactive element supports full keyboard navigation. We manage focus delegation intelligently within the Shadow DOM to ensure smooth tab flows.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">ARIA Semantics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Roles, states, and properties are automatically managed. We use native HTML elements wherever possible, falling back to comprehensive ARIA patterns for custom widgets.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Motion Control</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  All CSS animations and transitions respect the <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded">prefers-reduced-motion</code> media query, gracefully degrading to instant state changes.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Contrast & Color</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our default greyscale palettes are tuned to ensure 4.5:1 contrast ratios for text, and 3:1 for interactive element boundaries.
                </p>
              </div>
            </div>
          </section>

          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Focus Management</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              We employ <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded">:focus-visible</code> aggressively to ensure focus rings are only shown when navigating via keyboard, preventing ugly focus states for mouse users while keeping keyboard users oriented.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If you override focus colors, ensure you test them against both your light and dark background surfaces.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
