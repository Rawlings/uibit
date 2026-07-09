import { Link } from 'react-router-dom';
import { useState } from 'react';
import { componentRegistry } from './components';
import { useHead } from '../hooks/useHead';

export default function LocalizationGuide() {
  const [searchQuery, setSearchQuery] = useState('');

  useHead({
    title: 'Localization – UIBit',
    description: 'Learn how to localize UIBit web components using @lit/localize.',
  });

  const allComponents = Object.values(componentRegistry).sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const filteredComponents = allComponents.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <Link
                to="/localization"
                className="block px-3 py-2 rounded-md text-sm font-semibold bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white"
              >
                Localization
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
              {filteredComponents.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.id}`}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  {item.title}
                </Link>
              ))}
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
              <span className="text-gray-900 dark:text-white font-medium">Localization</span>
            </p>
          </nav>

          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">
              Localization
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              UIBit ships with English as the default locale. All user-visible strings — aria-labels,
              UI text, and time unit labels — are wrapped with{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@lit/localize</code>{' '}
              so they can be translated without modifying component source code.
            </p>
          </div>

          {/* Section: How it works */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How it works</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Every component imports <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">msg</code> and{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">str</code> from{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@uibit/core</code>, which re-exports them from{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@lit/localize</code>.
              Wrapping a string in <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">msg()</code> does two things:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4 ml-2">
              <li>At runtime it returns the translated string for the active locale, falling back to English if no translation is loaded.</li>
              <li>It marks the string as an extraction target for the <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">lit-localize extract</code> CLI, which generates XLB/XLIFF files for translators.</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              With zero configuration, all components render English text — no setup required.
            </p>
          </section>

          {/* Section: Zero-config default */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Zero-config default</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              If you never call <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">configureUIBitLocalization</code>, components render
              their built-in English strings automatically. No additional packages or configuration needed.
            </p>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">{`<!-- Works out of the box in English -->
<uibit-countdown target="2026-12-31T23:59:59"></uibit-countdown>
<uibit-carousel></uibit-carousel>
<uibit-table></uibit-table>`}</pre>
          </section>

          {/* Section: Adding translations */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Adding translations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              To support additional locales, call{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">configureUIBitLocalization</code> once at app startup,
              then call <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">setLocale</code> to switch.
              Components re-render automatically when the locale changes.
            </p>

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">1. Install the peer dependency</h3>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 mb-6 overflow-x-auto">{`npm install @lit/localize`}</pre>

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">2. Configure at app startup</h3>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 mb-6 overflow-x-auto">{`import { configureUIBitLocalization, setLocale } from '@uibit/core';

const { setLocale } = configureUIBitLocalization({
  targetLocales: ['fr', 'de', 'ja'],
  loadLocale: (locale) => import(\`./locales/uibit.\${locale}.js\`),
});

// Switch to French — all UIBit components re-render
await setLocale('fr');`}</pre>

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">3. Extract strings for translation</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              Use the <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">lit-localize</code> CLI to extract all{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">msg()</code> calls from UIBit source into XLIFF files
              that translators can work with.
            </p>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 mb-3 overflow-x-auto">{`# lit-localize.json (in your project root)
{
  "sourceLocale": "en",
  "targetLocales": ["fr", "de", "ja"],
  "tsConfig": "./tsconfig.json",
  "output": {
    "mode": "runtime",
    "outputDir": "./src/locales",
    "localizationModule": "@lit/localize"
  },
  "interchange": {
    "format": "xliff",
    "xliffDir": "./xliff"
  }
}`}</pre>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">{`npx lit-localize extract   # generates xliff/fr.xlf, xliff/de.xlf, …
npx lit-localize build     # compiles to src/locales/fr.js, …`}</pre>
          </section>

          {/* Section: Writing a translation file manually */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Writing translations manually</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              For small projects, you can skip the XLIFF toolchain and write locale modules directly.
              Each module exports a <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">templates</code> map keyed by the
              English source string (or the message id if you set one).
            </p>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">{`// src/locales/uibit.fr.js
import { html } from 'lit';

export const templates = {
  'Days': 'Jours',
  'Hours': 'Heures',
  'Minutes': 'Minutes',
  'Seconds': 'Secondes',
  'Countdown timer': 'Minuterie',
  'Previous slide': 'Diapositive précédente',
  'Next slide': 'Diapositive suivante',
  'Slides': 'Diapositives',
  'Content Carousel': 'Carrousel de contenu',
  'Sentiment rating': 'Évaluation du sentiment',
  'Search table': 'Rechercher dans le tableau',
  'Data table': 'Tableau de données',
  'Export CSV': 'Exporter en CSV',
  'Clear filters': 'Effacer les filtres',
  'Rows:': 'Lignes :',
  'Density:': 'Densité :',
  'Compact': 'Compact',
  'Normal': 'Normal',
  'Comfortable': 'Confortable',
  // ... other strings
};`}</pre>
          </section>

          {/* Section: Localized strings per component */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Strings by component</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              The following table lists every localizable string currently used across UIBit components.
              All strings are in English by default.
            </p>

            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Component</th>
                    <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">String (English)</th>
                    <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                  {[
                    { component: 'uibit-countdown', string: 'Countdown timer', context: 'aria-label on timer container' },
                    { component: 'uibit-countdown', string: 'Days', context: 'Unit label' },
                    { component: 'uibit-countdown', string: 'Hours', context: 'Unit label' },
                    { component: 'uibit-countdown', string: 'Minutes', context: 'Unit label' },
                    { component: 'uibit-countdown', string: 'Seconds', context: 'Unit label' },
                    { component: 'uibit-carousel', string: 'Content Carousel', context: 'aria-label on root region' },
                    { component: 'uibit-carousel', string: 'Previous slide', context: 'aria-label on prev button' },
                    { component: 'uibit-carousel', string: 'Next slide', context: 'aria-label on next button' },
                    { component: 'uibit-carousel', string: 'Slides', context: 'aria-label on indicator tablist' },
                    { component: 'uibit-carousel', string: 'Slide {n} of {total}', context: 'aria-label on each slide (interpolated)' },
                    { component: 'uibit-carousel', string: 'Go to slide {n}', context: 'aria-label on indicator button (interpolated)' },
                    { component: 'uibit-360-viewer', string: '360 degree product view. Use drag, arrow keys, or buttons to rotate.', context: 'aria-label on viewer' },
                    { component: 'uibit-360-viewer', string: 'Rotate left', context: 'aria-label on prev button' },
                    { component: 'uibit-360-viewer', string: 'Rotate right', context: 'aria-label on next button' },
                    { component: 'uibit-hotspot', string: 'Hotspot', context: 'Fallback aria-label on trigger button' },
                    { component: 'uibit-hotspot', string: 'Hotspot details', context: 'Fallback aria-label on popover' },
                    { component: 'uibit-hotspot', string: 'Close details', context: 'aria-label on close button' },
                    { component: 'uibit-scroll-progress', string: 'Scroll progress indicator', context: 'aria-label on progress bar' },
                    { component: 'uibit-scratch-reveal', string: 'Scratch-off panel to reveal content', context: 'aria-label on canvas container' },
                    { component: 'uibit-sentiment-bar', string: 'Sentiment rating', context: 'aria-label on radiogroup' },
                    { component: 'uibit-table', string: 'Pagination', context: 'aria-label on pagination nav' },
                    { component: 'uibit-table', string: 'Previous', context: 'aria-label on previous page button' },
                    { component: 'uibit-table', string: 'Next', context: 'aria-label on next page button' },
                    { component: 'uibit-table', string: 'Column filters', context: 'aria-label on filter row' },
                    { component: 'uibit-table', string: 'Filter {column}', context: 'aria-label on column filter input (interpolated)' },
                    { component: 'uibit-table', string: 'Search table', context: 'aria-label on search input' },
                    { component: 'uibit-table', string: 'Rows per page', context: 'aria-label on rows-per-page select' },
                    { component: 'uibit-table', string: 'Row density', context: 'aria-label on density select' },
                    { component: 'uibit-table', string: 'Export as CSV', context: 'aria-label on export button' },
                    { component: 'uibit-table', string: 'Clear all filters', context: 'aria-label on clear button' },
                    { component: 'uibit-table', string: 'Data table', context: 'aria-label on table region' },
                    { component: 'uibit-table', string: 'Select all rows on this page', context: 'aria-label on select-all checkbox' },
                    { component: 'uibit-table', string: 'Select row', context: 'aria-label on row checkbox' },
                    { component: 'uibit-table', string: '{n} row(s) selected', context: 'Selection banner count (interpolated)' },
                    { component: 'uibit-table', string: 'Select all {n} rows', context: 'Selection banner button (interpolated)' },
                    { component: 'uibit-table', string: 'Clear selection', context: 'Selection banner button' },
                    { component: 'uibit-table', string: 'Rows:', context: 'Toolbar label' },
                    { component: 'uibit-table', string: 'Density:', context: 'Toolbar label' },
                    { component: 'uibit-table', string: 'Columns', context: 'Column chooser button' },
                    { component: 'uibit-table', string: 'Compact / Normal / Comfortable', context: 'Density option labels' },
                    { component: 'uibit-table', string: 'Export CSV', context: 'Export button label (no selection)' },
                    { component: 'uibit-table', string: 'Export {n} rows', context: 'Export button label with selection (interpolated)' },
                    { component: 'uibit-table', string: 'Clear filters', context: 'Active filters button label' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50/50 dark:bg-gray-900/30'}>
                      <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 font-sans font-medium text-xs">{row.component}</td>
                      <td className="px-4 py-2.5 text-gray-900 dark:text-white text-xs">{row.string}</td>
                      <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400 font-sans text-xs">{row.context}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: RTL */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Right-to-left (RTL) support</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              UIBit components respect the document's text direction. Set{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">dir="rtl"</code> on the{' '}
              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">&lt;html&gt;</code> element (or any ancestor)
              and layout-sensitive components such as the carousel, table, and hotspot will mirror their directional logic automatically
              via CSS logical properties.
            </p>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">{`<html lang="ar" dir="rtl">
  ...
  <uibit-carousel></uibit-carousel>
</html>`}</pre>
          </section>

          {/* Section: API reference */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API reference</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <code className="text-sm font-mono text-gray-900 dark:text-white font-semibold">configureUIBitLocalization(options)</code>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Configure localization for all UIBit components. Must be called once, before any component renders.
                  Returns <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">{'{ setLocale, getLocale }'}</code>.
                </p>
                <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded p-3 text-xs font-mono text-gray-800 dark:text-gray-200 mt-3 overflow-x-auto">{`import { configureUIBitLocalization } from '@uibit/core';

const { setLocale, getLocale } = configureUIBitLocalization({
  targetLocales: ['fr', 'de'],
  loadLocale: (locale) => import(\`./locales/uibit.\${locale}.js\`),
});`}</pre>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <code className="text-sm font-mono text-gray-900 dark:text-white font-semibold">setLocale(locale: string): Promise&lt;void&gt;</code>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Switch the active locale. Loads the locale module if not already cached, then triggers a re-render
                  of all UIBit components that contain localizable strings. Requires{' '}
                  <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">configureUIBitLocalization</code> to have been called first.
                </p>
                <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded p-3 text-xs font-mono text-gray-800 dark:text-gray-200 mt-3 overflow-x-auto">{`import { setLocale } from '@uibit/core';

document.querySelector('#lang-switcher').addEventListener('change', (e) => {
  setLocale(e.target.value);
});`}</pre>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <code className="text-sm font-mono text-gray-900 dark:text-white font-semibold">getLocale(): string</code>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Returns the currently active locale tag (e.g.{' '}
                  <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">"en"</code>,{' '}
                  <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">"fr"</code>).
                  Returns <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">"en"</code> when localization has not been configured.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <code className="text-sm font-mono text-gray-900 dark:text-white font-semibold">msg(str: string): string</code>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  Re-exported from <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@lit/localize</code>.
                  Used internally by components. Available from{' '}
                  <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@uibit/core</code> if you need to localize
                  strings in your own Lit components alongside UIBit.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
