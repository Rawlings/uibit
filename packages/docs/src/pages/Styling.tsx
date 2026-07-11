import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function StylingGuide() {
  useHead({
    title: 'Styling & Theming – UIBit',
    description: 'Customize UIBit web components using CSS custom properties, design tokens, and the density system.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="styling" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Styling & Theming
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              UIBit components are Shadow DOM encapsulated, which gives them complete style isolation. Customisation happens entirely through CSS custom properties — you never need to reach into component internals.
            </p>
          </header>

          {/* Setup */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Setup</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Import the theme file once in your root stylesheet. This sets all default tokens on <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">:root</code> — components will inherit them automatically.
            </p>
            <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
              <code>{`@import "@uibit/core/theme.css";`}</code>
            </pre>
          </section>

          {/* Token hierarchy */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Token hierarchy</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Tokens are layered. Override at the highest level that makes sense — changing a palette variable ripples down through everything that references it.
            </p>

            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Palette (Tier 1)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                  Raw color values. These are the ground truth — nothing below this tier defines a hex value directly.
                </p>
                <code className="inline-block text-xs font-mono text-gray-500 dark:text-gray-405 bg-gray-50 dark:bg-gray-900/30 px-2 py-1 rounded">
                  --uibit-color-gray-100, --uibit-color-gray-900
                </code>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Semantic (Tier 2)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                  Contextual tokens shared across all components. This is where most overrides happen.
                </p>
                <code className="inline-block text-xs font-mono text-gray-500 dark:text-gray-405 bg-gray-50 dark:bg-gray-900/30 px-2 py-1 rounded">
                  --uibit-border-color, --uibit-radius-lg, --uibit-text-primary
                </code>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Component (Tier 3)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                  Scoped per component. Automatically fall back to semantic tokens by default.
                </p>
                <code className="inline-block text-xs font-mono text-gray-500 dark:text-gray-405 bg-gray-50 dark:bg-gray-900/30 px-2 py-1 rounded">
                  --uibit-carousel-border-color, --uibit-table-max-height
                </code>
              </div>
            </div>
          </section>

          {/* Token reference */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Token reference</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              These are the semantic tokens you'll override most often. All are defined in <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@uibit/core/theme.css</code> and have dark mode counterparts.
            </p>

            {[
              {
                group: 'Colours',
                rows: [
                  { name: '--uibit-border-color', light: 'gray-200', dark: 'gray-800', usage: 'Borders on all components' },
                  { name: '--uibit-focus-color', light: 'black', dark: 'white', usage: 'Focus ring colour' },
                  { name: '--uibit-bg-base', light: 'white', dark: 'gray-950', usage: 'Root background' },
                  { name: '--uibit-bg-surface', light: 'white', dark: 'gray-900', usage: 'Raised surface background' },
                  { name: '--uibit-bg-subtle', light: 'gray-50', dark: 'gray-900', usage: 'Subtle fills, stripes' },
                  { name: '--uibit-text-primary', light: 'gray-900', dark: 'gray-100', usage: 'Primary text' },
                  { name: '--uibit-text-secondary', light: 'gray-800', dark: 'gray-200', usage: 'Secondary text' },
                  { name: '--uibit-text-muted', light: 'gray-600', dark: 'gray-400', usage: 'Placeholder, labels' },
                ],
              },
              {
                group: 'Border radius',
                rows: [
                  { name: '--uibit-radius-sm', light: '0.125rem', dark: '—', usage: 'Small elements, badges' },
                  { name: '--uibit-radius-md', light: '0.25rem', dark: '—', usage: 'Inputs, chips' },
                  { name: '--uibit-radius-lg', light: '0.375rem', dark: '—', usage: 'Panels, cards' },
                  { name: '--uibit-radius-xl', light: '0.5rem', dark: '—', usage: 'Modals, popovers' },
                  { name: '--uibit-radius-2xl', light: '0.75rem', dark: '—', usage: 'Large containers' },
                ],
              },
              {
                group: 'Spacing',
                rows: [
                  { name: '--uibit-spacing-1', light: '0.25rem × factor', dark: '—', usage: 'Multiplied by --uibit-spacing-factor' },
                  { name: '--uibit-spacing-2', light: '0.5rem × factor', dark: '—', usage: '' },
                  { name: '--uibit-spacing-4', light: '1rem × factor', dark: '—', usage: '' },
                  { name: '--uibit-spacing-6', light: '1.5rem × factor', dark: '—', usage: '' },
                ],
              },
              {
                group: 'Typography',
                rows: [
                  { name: '--uibit-font-sans', light: 'inherit', dark: '—', usage: 'Sans-serif font family' },
                  { name: '--uibit-font-mono', light: 'inherit', dark: '—', usage: 'Monospace font family' },
                  { name: '--uibit-font-size-sm', light: 'fluid ~0.875rem', dark: '—', usage: 'Small text, labels' },
                  { name: '--uibit-font-size-base', light: 'fluid ~1rem', dark: '—', usage: 'Body text' },
                  { name: '--uibit-font-size-lg', light: 'fluid ~1.125rem', dark: '—', usage: 'Subheadings' },
                ],
              },
            ].map(({ group, rows }) => (
              <div key={group} className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{group}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-2 font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0 font-mono">Variable</th>
                        <th className="text-left py-2 font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Light default</th>
                        <th className="text-left py-2 font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Dark default</th>
                        <th className="text-left py-2 font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Used for</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
                      {rows.map((row) => (
                        <tr key={row.name} className="bg-transparent">
                          <td className="py-2.5 font-mono text-gray-750 dark:text-gray-300 whitespace-nowrap pr-4 last:pr-0">{row.name}</td>
                          <td className="py-2.5 text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap pr-4 last:pr-0">{row.light}</td>
                          <td className="py-2.5 text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap pr-4 last:pr-0">{row.dark === '—' ? <span className="text-gray-300 dark:text-gray-700">—</span> : row.dark}</td>
                          <td className="py-2.5 text-gray-600 dark:text-gray-350 text-sm pr-4 last:pr-0">{row.usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>

          {/* Density */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Density</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Set <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">data-density</code> on <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">:root</code> to scale all component spacing and font sizes proportionally. Compact works well for data-dense interfaces; spacious suits content-heavy or marketing contexts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { mode: 'compact', spacing: '0.7×', font: '0.95×', note: 'Dense UIs, admin tools' },
                { mode: 'normal', spacing: '1×', font: '1×', note: 'Default — no attribute needed' },
                { mode: 'spacious', spacing: '1.35×', font: '1.05×', note: 'Content sites, marketing' },
              ].map(({ mode, spacing, font, note }) => (
                <div key={mode} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <code className="text-xs font-mono text-gray-900 dark:text-white font-semibold">{mode === 'normal' ? '(default)' : `data-density="${mode}"`}</code>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Spacing</span>
                      <span className="font-mono text-gray-700 dark:text-gray-300">{spacing}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Font scale</span>
                      <span className="font-mono text-gray-700 dark:text-gray-300">{font}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">{note}</p>
                </div>
              ))}
            </div>

            <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
              <code>{`<!-- Set on the root element -->
<html data-density="compact">

<!-- Or scope it to a section -->
<div data-density="spacious">
  <uibit-carousel></uibit-carousel>
</div>`}</code>
            </pre>
          </section>

          {/* Dark mode */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dark mode</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              All semantic tokens have dark mode counterparts declared in <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">theme.css</code>. Dark mode activates via two mechanisms — you can use either or both.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Via class</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Add the <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">.dark</code> class to <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">&lt;html&gt;</code> — useful when your app manages theme state in JS.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`<html class="dark">
  <!-- all UIBit components switch to dark tokens -->
</html>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Via data attribute</h3>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`<html data-theme="dark">
  ...
</html>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Via system preference</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  If neither <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">.dark</code> nor <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">data-theme</code> is set, components automatically respect <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">prefers-color-scheme</code>. Opt out by explicitly setting <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">data-theme="light"</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Font inheritance */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Font inheritance</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Both <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">--uibit-font-sans</code> and <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">--uibit-font-mono</code> default to <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">inherit</code>, so whatever font your host app sets is adopted automatically. Override them explicitly if you need components to differ from the surrounding page.
            </p>
            <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
              <code>{`:root {
  --uibit-font-sans: 'Geist', system-ui, sans-serif;
  --uibit-font-mono: 'Geist Mono', monospace;
}`}</code>
            </pre>
          </section>

          {/* Customisation examples */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Customisation examples</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Global overrides</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Redefine semantic tokens on <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">:root</code> to change the default look across every component at once.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`:root {
  --uibit-border-color: #3b82f6;
  --uibit-radius-lg: 0.125rem;
  --uibit-font-sans: 'Inter', sans-serif;
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Scoped theme variant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Wrap components in a selector to create a design variant without touching globals — useful for embedding components in different visual contexts on the same page.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`.neo-brutalist {
  --uibit-border-color: #000000;
  --uibit-radius-lg: 0rem;
  --uibit-focus-color: #facc15;
}`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Per-component override</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Target a component-specific token when you only want to change one component's appearance. Find each component's available tokens in its API reference.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`uibit-table {
  --uibit-table-max-height: 40rem;
}

uibit-carousel {
  --uibit-carousel-border-color: transparent;
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
