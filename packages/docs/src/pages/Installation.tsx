import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function InstallationGuide() {
  useHead({
    title: 'Installation & Setup – UIBit',
    description: 'Learn how to install UIBit components, set up the design tokens, and integrate with your application.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="getting-started" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Installation & Setup
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              UIBit components are published as independent, framework-agnostic NPM packages. You only install what you need.
            </p>
          </header>

          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Core Setup</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Every component relies on the <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded font-mono">@uibit/core</code> package, which contains the design tokens, accessibility mixins, and foundational CSS.
            </p>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm leading-relaxed mb-6">
              <code>npm install @uibit/core</code>
            </pre>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Import the base theme in your application's root stylesheet:
            </p>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm leading-relaxed">
              <code>@import "@uibit/core/theme.css";</code>
            </pre>
          </section>

          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Installing Components</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Install the specific component packages you want to use. For example, to use the Carousel:
            </p>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm leading-relaxed mb-6">
              <code>npm install @uibit/carousel</code>
            </pre>
          </section>

          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Registration</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Web components must be registered with the browser. Import the component module once in your application entry point:
            </p>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm leading-relaxed mb-6">
              <code>{`// In main.js or index.js
import '@uibit/carousel';

// The <uibit-carousel> element is now available everywhere.`}</code>
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}
