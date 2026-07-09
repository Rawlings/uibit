import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function StylingGuide() {
  useHead({
    title: 'Styling & Theming – UIBit',
    description: 'Learn how to customize UIBit web components using CSS custom properties and design tokens.',
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="styling" />

        {/* Main Documentation Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium">Styling & Theming</span>
            </p>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Styling & Theming
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl">
              UIBit is designed to be highly customizable, modern, and zero-overhead. Components are built using Lit and Shadow DOM, giving them perfect isolation, while utilizing CSS Custom Properties to inherit global styling parameters and enable flexible theme overrides.
            </p>
          </header>

          {/* Design Token System Section */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Design Token Hierarchy</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We employ a three-tier token architecture:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Tier 1: Global Palette</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Base variables that define the brand's raw color scales (e.g. <code>--uibit-color-gray-100</code>). These map directly to Tailwind values.</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Tier 2: Semantic Tokens</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Contextual variables shared across elements (e.g. <code>--uibit-border-color</code> or <code>--uibit-radius-lg</code>).</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Tier 3: Component Custom Properties</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Highly specific properties per component (e.g. <code>--uibit-carousel-border-color</code>) that default back to semantic or palette tokens.</p>
              </div>
            </div>
          </section>

          {/* Installation and Usage */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Setting Up The Global Stylesheet</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              To apply UIBit design tokens globally across your application, import the theme file in your entry CSS file:
            </p>
            <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed mb-6">
              <code>{`@import "@uibit/core/theme.css";`}</code>
            </pre>
          </section>

          {/* Font Inheritance */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Font Inheritance</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              By default, all components have their <code>font-family</code> set to <code>inherit</code>. This ensures that whatever font family is used by your host application (like <strong>Inter</strong> on this documentation site) is automatically adopted by the components without requiring explicit styling configuration.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If you wish to override the font family for UIBit components explicitly, you can set the <code>--uibit-font-sans</code> or <code>--uibit-font-mono</code> custom properties at the root or container level.
            </p>
          </section>

          {/* Examples */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Customization Examples</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">1. Theme-wide Overrides</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Redefine global border colors and radii inside your application's root stylesheet:</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`:root {
  --uibit-border-color: #3b82f6; /* Blue borders */
  --uibit-radius-lg: 0.125rem;    /* Boxy borders */
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">2. Dynamic Theme Classes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Wrap components in selectors with custom styling scopes, enabling quick design variant toggling:</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`.neo-brutalist {
  --uibit-border-color: #000000;
  --uibit-radius-lg: 0rem;
  --uibit-focus-color: #facc15;
}`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
