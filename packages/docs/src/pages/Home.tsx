function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            UIBit
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A collection of accessible, production-ready web components built with Lit.js.
            Lightweight, performant, and easy to use.
          </p>
          <button
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Explore Components
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why UIBit?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightweight',
                description: 'Built on Lit.js for minimal bundle impact'
              },
              {
                icon: '♿',
                title: 'Accessible',
                description: 'WCAG compliant with full keyboard support'
              },
              {
                icon: '📱',
                title: 'Responsive',
                description: 'Works perfectly on all devices and screen sizes'
              },
              {
                icon: '🎨',
                title: 'Customizable',
                description: 'CSS variables for easy theming and styling'
              },
              {
                icon: '📦',
                title: 'Framework Agnostic',
                description: 'Works with any JavaScript framework'
              },
              {
                icon: '🚀',
                title: 'Production Ready',
                description: 'Battle-tested and ready for production use'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Available Components
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-400 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Carousel
            </h3>
            <p className="text-gray-600 mb-4">
              A native, accessible carousel using CSS scroll-snap and scroll-driven animations.
              Perfect for image galleries, testimonials, and more.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>✓ CSS scroll-snap</li>
              <li>✓ Scroll-driven animations</li>
              <li>✓ Touch & keyboard support</li>
              <li>✓ Auto-play option</li>
            </ul>
            <a
              href="#carousel"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              View Documentation →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Install UIBit and start building amazing components today.
          </p>
          <code className="bg-primary-900 px-4 py-2 rounded inline-block">
            pnpm add @uibit/carousel
          </code>
        </div>
      </section>
    </div>
  );
}

export default Home;
