import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function CarouselDocs() {
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    import('@uibit/carousel');
  }, []);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Carousel</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Carousel
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          Native, accessible carousel using CSS scroll-snap and scroll-driven animations. Perfect for image galleries, testimonials, and product showcases.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/carousel
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <style>{`
            uibit-carousel {
              --carousel-items-per-view: 1;
              --carousel-gap: 1rem;
            }

            @media (min-width: 768px) {
              uibit-carousel {
                --carousel-items-per-view: 2;
              }
            }

            .carousel-slide {
              height: 280px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1rem;
              font-weight: 500;
              border-radius: 0.5rem;
              background-color: #e5e7eb;
              color: #374151;
            }
          `}</style>

          <uibit-carousel ref={carouselRef} autoPlay autoPlayInterval={5000} loop>
            <div slot="item" className="carousel-slide">Slide 1</div>
            <div slot="item" className="carousel-slide">Slide 2</div>
            <div slot="item" className="carousel-slide">Slide 3</div>
            <div slot="item" className="carousel-slide">Slide 4</div>
          </uibit-carousel>
        </div>
      </section>

      {/* API Reference */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">API</h2>

        {/* Properties */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Properties</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Property</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Default</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: 'autoPlay', type: 'boolean', default: 'false', desc: 'Enable automatic slide cycling' },
                  { prop: 'autoPlayInterval', type: 'number', default: '5000', desc: 'Interval in milliseconds' },
                  { prop: 'loop', type: 'boolean', default: 'true', desc: 'Allow cycling through slides in a loop' },
                  { prop: 'itemsPerView', type: 'number', default: '1', desc: 'Number of items visible at once' },
                  { prop: 'gap', type: 'number', default: '16', desc: 'Gap between items in pixels' },
                  { prop: 'duration', type: 'number', default: '300', desc: 'Scroll animation duration in milliseconds' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-4 py-3 font-mono text-gray-900">{row.prop}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.type}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{row.default}</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Methods */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Methods</h3>
          <div className="space-y-3">
            {[
              { name: 'prev()', desc: 'Navigate to previous slide' },
              { name: 'next()', desc: 'Navigate to next slide' },
              { name: 'goToSlide(index: number)', desc: 'Navigate to specific slide' },
            ].map((method, i) => (
              <div key={i} className="border border-gray-200 rounded p-4">
                <code className="font-mono text-sm text-gray-900">{method.name}</code>
                <p className="text-gray-600 text-sm mt-2">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Events</h3>
          <div className="border border-gray-200 rounded p-4">
            <code className="font-mono text-sm text-gray-900">slide-change</code>
            <p className="text-gray-600 text-sm mt-2">Fires when active slide changes</p>
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Detail: <code className="bg-gray-100 px-2 py-1">{'{ index: number, totalSlides: number }'}</code>
            </p>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          {/* Basic HTML */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic HTML</h3>
            <pre className="code-block"><code>{`<uibit-carousel>
  <div slot="item">Slide 1</div>
  <div slot="item">Slide 2</div>
  <div slot="item">Slide 3</div>
</uibit-carousel>`}</code></pre>
          </div>

          {/* With Auto-Play */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">With Auto-Play</h3>
            <pre className="code-block"><code>{`<uibit-carousel
  auto-play
  auto-play-interval="3000"
  loop>
  <img slot="item" src="image-1.jpg" alt="Slide 1" />
  <img slot="item" src="image-2.jpg" alt="Slide 2" />
</uibit-carousel>`}</code></pre>
          </div>

          {/* Programmatic Control */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Programmatic Control</h3>
            <pre className="code-block"><code>{`const carousel = document.querySelector('uibit-carousel');

carousel.prev();
carousel.next();
carousel.goToSlide(2);

carousel.addEventListener('slide-change', (e) => {
  console.log(\`Slide \${e.detail.index + 1} of \${e.detail.totalSlides}\`);
});`}</code></pre>
          </div>

          {/* React Integration */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">React Integration</h3>
            <pre className="code-block"><code>{`import '@uibit/carousel';

function MyCarousel() {
  return (
    <uibit-carousel autoPlay loop>
      <div slot="item">Slide 1</div>
      <div slot="item">Slide 2</div>
    </uibit-carousel>
  );
}`}</code></pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Native CSS Scroll-Snap',
            'Scroll-Driven Animations',
            'Fully Accessible',
            'Responsive Design',
            'Touch & Swipe Support',
            'Keyboard Navigation',
            'Auto-Play Option',
            'Customizable with CSS Variables',
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gray-900 font-semibold mt-0.5">—</span>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CarouselDocs;
