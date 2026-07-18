import { Link } from 'react-router-dom';
import { useHead } from '../hooks/useHead';
import InteractivePatternBackground from '../components/InteractivePatternBackground';

function Home() {
  useHead({
    title: 'UIBit – Web Components & the Tooling Behind Them',
    description:
      'A curated library of high-quality web components, plus the codegen, manifest, and runtime tooling that builds and maintains them.',
  });

  return (
    <div className="relative bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden">
      {/* Interactive background canvas showing the wireframe components */}
      <InteractivePatternBackground className="h-[580px]" />

      {/* Hero Section */}
      <section className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-950 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-400 font-sans">
            Web components, and the tooling that builds them.
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
          UIBit is two things: a curated library of high-performance, accessible components — and the codegen,
          manifest, and runtime tooling used to build, wrap, and maintain them. Use them together, or take either on
          its own.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/rawlings/uibit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-gray-250 dark:border-gray-800 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/org/uibit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-gray-250 dark:border-gray-800 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            npm Registry
          </a>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="relative max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/components"
            className="group block p-8 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-all"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Components
            </h2>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
              Explore the component library
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Accessible, framework-agnostic web components built with Lit — layout, media, text, data, and form
              elements ready to drop into any stack.
            </p>
          </Link>

          <Link
            to="/tooling"
            className="group block p-8 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-all"
          >
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Tooling
            </h2>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">
              Explore the tooling
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Codegen, Custom Elements Manifest tooling, HMR, and runtime primitives — the same tooling that builds
              this library, usable in your own custom element projects.
            </p>
          </Link>
        </div>
      </section>

      {/* Three qualities */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Why UIBit</h2>
          </div>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  heading: 'Engaging & Interactive',
                  body: 'Delight your users with smooth micro-animations, rich media tools, and polished interactions that feel premium.',
                },
                {
                  heading: 'Production Ready',
                  body: 'Fully accessible, localized, and tested components that drop seamlessly into any project with zero setup.',
                },
                {
                  heading: 'Performant by Design',
                  body: 'Built to load instantly and run smoothly, ensuring your application remains lightweight and fast.',
                },
              ].map(({ heading, body }) => (
                <div key={heading}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{heading}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Foundations Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Foundations</h2>
          </div>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {[
                {
                  to: '/foundations/styling',
                  label: 'Styling & Theming',
                  description: 'Three-tier CSS token architecture. Override anything from global palette to per-component properties.',
                },
                {
                  to: '/foundations/localization',
                  label: 'Localization',
                  description: 'Ship in any language. Built-in @lit/localize support with automatic RTL layout handling.',
                },
                {
                  to: '/foundations/icons',
                  label: 'Icons',
                  description: 'Built-in Lucide icons. Override any icon or register your own with a single function call.',
                },
                {
                  to: '/foundations/frameworks',
                  label: 'Framework Integrations',
                  description: 'Auto-generated type wrappers for React, Vue, Svelte, Angular, Astro, and more.',
                },
              ].map(({ to, label, description }) => (
                <Link
                  key={to}
                  to={to}
                  className="group block"
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex items-center gap-1">
                    {label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    {description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
