import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function FoundationsGuide() {
  useHead({
    title: 'Framework Integrations – UIBit',
    description: 'Learn how to consume UIBit components across multiple frameworks, and understand our Rust-powered AST wrapper generation tool.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="frameworks" />

        {/* Main Documentation Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium">Framework Integrations</span>
            </p>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Framework Integrations
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl">
              While UIBit components are native web components, we provide first-class, tree-shakable wrappers and type definitions for 8 major frontend environments. These wrappers make our components feel native to your ecosystem, offering seamless property/attribute binding and full autocomplete.
            </p>
          </header>

          {/* Consuming Wrappers Section */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Consuming the Wrappers</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Every component package distributes framework wrappers directly inside its own bundle under subpaths. This ensures zero runtime overhead and optimal tree-shaking.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">1. React / Next.js</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Includes <code>"use client";</code> for Next.js SSR compatibility.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed mb-6">
                  <code>{`import { Table } from '@uibit/table/react';

<Table searchable paginated={true} />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">2. Vue 3</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Resolves event listeners and props natively with standard SFC binding.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed mb-6">
                  <code>{`import { Table } from '@uibit/table/vue';

<Table :searchable="true" @change="onChange" />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">3. Svelte 5</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Leverages Svelte 5 runes and Snippets for projection.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed mb-6">
                  <code>{`<script>
  import Table from '@uibit/table/svelte';
</script>

<Table searchable={true} />`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">4. Angular</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Exposes a standalone component directive proxy.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed mb-6">
                  <code>{`import { TableProxy } from '@uibit/table/angular';

@Component({
  imports: [TableProxy],
  template: '<uibit-table [searchable]="true"></uibit-table>'
})`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">5. Astro & SolidJS</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Provides typescript JSX typing overlays, maintaining Astro server hydration directives.</p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed mb-6">
                  <code>{`import '@uibit/table/astro'; // loads global types

<uibit-table searchable client:load />`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Under the Hood Section */}
          <section className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Under the Hood: @uibit/codegen</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We leverage an automated generation compiler <code>@uibit/codegen</code> which completely eliminates wrapper maintenance overhead.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Rust-Powered AST Compilation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Our wrapper generation suite leverages an ultra-high-performance AST analysis engine built on top of the Rust-powered <code>oxc-parser</code> to inspect core components at compile time.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  By compiling the raw Abstract Syntax Tree (AST), the generator extracts and maps exported interfaces, type aliases, and enums directly to the generated wrapper files. This constructs an absolute, zero-overhead type bridge across React, Vue, Svelte, and Angular, delivering flawless IDE autocomplete and bulletproof compilation safety.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">How to Run</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  The wrapper generator is executed as part of the package's build process:
                </p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed mb-6">
                  <code>{`"scripts": {
  "build": "npm run analyze && uibit-codegen --package . && tsc"
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
