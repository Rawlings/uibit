import { Link } from 'react-router-dom';
import { componentRegistry } from './components';
import { useHead } from '../hooks/useHead';

function Home() {
  useHead({
    title: 'UIBit – Web Components Library',
    description:
      'A collection of accessible, production-ready web components built with Lit.js. Lightweight, performant, and framework-agnostic.',
  });

  const components = Object.keys(componentRegistry)
    .sort()
    .map((key) => {
      const comp = componentRegistry[key]!;
      return {
        id: comp.id,
        name: comp.title,
        description: comp.description,
        install: comp.packageName,
      };
    });

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 sm:pt-20 sm:pb-14">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            Web components built right
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            A collection of accessible, production-ready components built with Lit. Framework-agnostic, lightweight, and straightforward to use.
          </p>
        </div>
      </section>

      {/* Guides Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:pb-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { to: '/styling', label: 'Styling', description: 'CSS custom properties, theming, and density.' },
            { to: '/localization', label: 'Localization', description: 'Override built-in labels and translate components.' },
            { to: '/icons', label: 'Icons', description: 'Swap the default icon set with your own.' },
          ].map(({ to, label, description }) => (
            <Link
              key={to}
              to={to}
              className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 transition-colors group block hover:shadow-sm"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Components Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:pb-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-12">
          Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <Link
              key={component.id}
              to={`/${component.id}`}
              className="text-left p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-900 dark:hover:border-gray-100 transition-colors group block hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors font-sans">
                {component.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {component.description}
              </p>
              <code className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                {component.install}
              </code>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
