import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';
import { localizedStrings } from '@uibit/core';

export default function LocalizationGuide() {
  useHead({
    title: 'Localization – UIBit',
    description: 'Learn how to localize UIBit web components using @lit/localize.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="localization" className="hidden md:block" />

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
              UIBit ships with <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">en-US</code> (English, United States) as the default locale. All user-visible strings — aria-labels,
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
              <li>At runtime it returns the translated string for the active locale, falling back to <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">en-US</code> if no translation is loaded.</li>
              <li>It marks the string as an extraction target for the <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">lit-localize extract</code> CLI, which generates XLB/XLIFF files for translators.</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              With zero configuration, all components render <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">en-US</code> text — no setup required.
            </p>
          </section>

          {/* Section: Zero-config default */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Zero-config default</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              If you never call <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">configureUIBitLocalization</code>, components render
              their built-in <code className="text-sm bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">en-US</code> strings automatically. No additional packages or configuration needed.
            </p>
            <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">{`<!-- Works out of the box in en-US -->
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
              All strings are in <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">en-US</code> by default.
            </p>

            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Component</th>
                    <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">String (en-US)</th>
                    <th className="text-left px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-800">Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
                  {localizedStrings.map((row, i) => (
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
