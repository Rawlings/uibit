import { Link } from 'react-router-dom';

const COMPONENTS = [
  {
    id: 'carousel',
    name: 'Carousel',
    description: 'Native, accessible carousel using CSS scroll-snap and scroll-driven animations. Perfect for image galleries, testimonials, and product showcases.',
    install: '@uibit/carousel',
  },
  {
    id: 'viewer-360',
    name: '360-Viewer',
    description: 'Interactive 360-degree image viewer component. Display products and objects from every angle with smooth interactions and touch support.',
    install: '@uibit/360-viewer',
  },
  {
    id: 'scroll-progress',
    name: 'Scroll Progress',
    description: 'Lightweight scroll progress indicator that tracks page scroll position. Minimal, performant, and fully customizable.',
    install: '@uibit/scroll-progress',
  },
  {
    id: 'hotspot',
    name: 'Hotspot',
    description: 'Interactive hotspot component for adding clickable points to images. Useful for product annotations and interactive guides.',
    install: '@uibit/hotspot',
  },
  {
    id: 'ab-test',
    name: 'A/B Test',
    description: 'A/B testing utility component for framework-agnostic experimentation. Easy variant assignment and tracking.',
    install: '@uibit/ab-test',
  },
  {
    id: 'countdown',
    name: 'Countdown',
    description: 'Countdown timer component. Display time remaining until a specific date or event with custom formatting.',
    install: '@uibit/countdown',
  },
];

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Web components built right
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A collection of accessible, production-ready components built with Lit. Framework-agnostic, lightweight, and straightforward to use.
          </p>
        </div>
      </section>

      {/* Components Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold text-gray-900 mb-12">
          Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPONENTS.map((component) => (
            <Link
              key={component.id}
              to={`/${component.id}`}
              className="text-left p-6 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors group block hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors font-sans">
                {component.name}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {component.description}
              </p>
              <code className="text-xs text-gray-500 font-mono">
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
