import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function FoundationsGuide() {
  useHead({
    title: 'Framework Integrations – UIBit',
    description: 'Use UIBit components in React, Vue, Svelte, Angular, Astro, Preact, Stencil, and vanilla TypeScript with auto-generated type wrappers.',
  });

  const frameworks = [
    {
      name: 'React 19',
      subpath: '/react',
      approach: 'JSX types',
      detail: 'Extends React.JSX.IntrinsicElements so you write the custom element tag directly in JSX with full prop autocomplete.',
      code: `import '@uibit/table/react';

// The custom element tag is now typed natively
<uibit-table searchable={true} />`,
    },
    {
      name: 'Vue 3',
      subpath: '/vue',
      approach: 'SFC component',
      detail: 'Exports a named Vue component wrapper that handles v-model, event listeners, and prop binding in standard SFC syntax.',
      code: `import { Table } from '@uibit/table/vue';

<Table :searchable="true" @change="onChange" />`,
    },
    {
      name: 'Svelte 5',
      subpath: '/svelte',
      approach: 'Svelte component',
      detail: 'Exports a Svelte component using runes and Snippets for slot projection.',
      code: `<script>
  import Table from '@uibit/table/svelte';
</script>

<Table searchable={true} />`,
    },
    {
      name: 'Angular',
      subpath: '/angular',
      approach: 'Standalone directive',
      detail: 'Exports a standalone Angular component directive you can import directly into any NgModule or standalone component.',
      code: `import { NgxTable } from '@uibit/table/angular';

@Component({
  imports: [NgxTable],
  template: '<uibit-table [searchable]="true"></uibit-table>'
})`,
    },
    {
      name: 'Astro',
      subpath: '/astro',
      approach: 'JSX types',
      detail: 'Extends global JSX types for Astro templates, preserving client hydration directives.',
      code: `import '@uibit/table/astro';

<uibit-table searchable client:load />`,
    },
    {
      name: 'Preact',
      subpath: '/preact',
      approach: 'JSX types',
      detail: "Extends Preact's JSX.IntrinsicElements namespace — no runtime wrapper, pure type augmentation.",
      code: `import '@uibit/table/preact';

<uibit-table searchable={true} />`,
    },
    {
      name: 'Vanilla TS',
      subpath: '/vanilla',
      approach: 'DOM types',
      detail: 'Registers the element in HTMLElementTagNameMap so document.createElement and querySelector calls return the correct typed instance.',
      code: `import '@uibit/table/vanilla';

const table = document.createElement('uibit-table');
// typed as Table, not HTMLElement`,
    },
    {
      name: 'Stencil',
      subpath: '/stencil',
      approach: 'JSX types',
      detail: "Maps custom element typings directly into Stencil's JSX namespace for clean composition inside Stencil components.",
      code: `import '@uibit/table/stencil';

<uibit-table searchable={true} />`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="frameworks" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <nav className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium">Framework Integrations</span>
            </p>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Framework Integrations
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              UIBit components are native web components, so they work in any environment that renders HTML. Each package also ships per-framework subpaths that add type definitions without any runtime overhead — no wrapper components, no re-renders, just types.
            </p>
          </header>

          {/* Compatibility matrix */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Compatibility matrix</h2>
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">Framework</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">Subpath</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">Approach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {frameworks.map((fw) => (
                    <tr key={fw.name} className="bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{fw.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">{fw.subpath}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{fw.approach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Per-framework sections */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Usage by framework</h2>
            <div className="space-y-10">
              {frameworks.map((fw) => (
                <div key={fw.name} className="scroll-mt-20">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{fw.name}</h3>
                    <code className="text-xs font-mono text-gray-400 dark:text-gray-500">@uibit/[package]{fw.subpath}</code>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{fw.detail}</p>
                  <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                    <code>{fw.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* Codegen */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Generating wrappers for your own components</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@uibit/codegen</code> is a standalone tool you can add to any web component package to generate per-framework type declaration files automatically — no hand-written wrapper code to maintain.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">How it works</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  The generator uses <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">oxc-parser</code> — a Rust-based AST parser — to statically analyse your component's TypeScript source at build time. It extracts exported interfaces, type aliases, and enums, then writes framework-specific type declaration files for each target. Because it reads the AST directly, the output stays in sync with your source automatically.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Setup</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  Install <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono text-gray-800 dark:text-gray-200">@uibit/codegen</code> as a dev dependency and wire it into your build script before your TypeScript compilation step.
                </p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`// package.json
{
  "devDependencies": {
    "@uibit/codegen": "latest"
  },
  "scripts": {
    "build": "uibit-codegen --package . && tsc"
  }
}`}</code>
                </pre>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                  The CLI reads your component's exported types and writes declaration files alongside your output — one per framework target. Consumers then import from the appropriate subpath to get accurate types for their framework of choice.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
