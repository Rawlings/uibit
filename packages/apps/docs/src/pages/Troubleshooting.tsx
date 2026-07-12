import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function Troubleshooting() {
  useHead({
    title: 'Troubleshooting & FAQ – UIBit',
    description: 'Solutions for common build errors, SSR challenges, and custom element registration issues.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="troubleshooting" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Troubleshooting & FAQ
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Solutions for common integration hurdles, especially when working with modern build tools and Server-Side Rendering (SSR) frameworks.
            </p>
          </header>



          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Server-Side Rendering (Next.js / Nuxt) Errors</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Because UIBit components are built on standard Web APIs (like `HTMLElement`), importing them in a Node.js SSR environment will throw <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded">ReferenceError: HTMLElement is not defined</code>.
            </p>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Solution</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Import the framework-specific wrapper provided within each package, or use dynamic imports to load the web components only on the client-side.
            </p>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm leading-relaxed">
              <code>{`// Next.js example
import dynamic from 'next/dynamic';
const UibitCarousel = dynamic(
  () => import('@uibit/carousel/react').then(mod => mod.Carousel),
  { ssr: false }
);`}</code>
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}
