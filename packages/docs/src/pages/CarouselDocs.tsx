import { useEffect, useRef } from 'react';

function CarouselDocs() {
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    // Import the carousel component
    import('@uibit/carousel');
  }, []);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="cursor-pointer hover:text-primary-600">Home</span> / Carousel
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Carousel Component</h1>
        <p className="text-lg text-gray-600 mb-6">
          A native, accessible carousel web component using CSS scroll-snap and scroll-driven animations.
        </p>
        <div className="flex gap-4">
          <code className="bg-gray-100 px-4 py-2 rounded text-sm font-mono">
            pnpm add @uibit/carousel
          </code>
        </div>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Demo</h2>
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
              height: 300px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              font-weight: bold;
              border-radius: 0.5rem;
            }

            .slide-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
            .slide-2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
            .slide-3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; }
            .slide-4 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; }
          `}</style>

          <uibit-carousel ref={carouselRef} autoPlay autoPlayInterval="5000" loop>
            <div slot="item" className="carousel-slide slide-1">Slide 1</div>
            <div slot="item" className="carousel-slide slide-2">Slide 2</div>
            <div slot="item" className="carousel-slide slide-3">Slide 3</div>
            <div slot="item" className="carousel-slide slide-4">Slide 4</div>
          </uibit-carousel>
        </div>
      </section>

      {/* API Reference */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">API Reference</h2>

        {/* Properties */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
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
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-mono text-sm">{row.prop}</td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-600">{row.type}</td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-600">{row.default}</td>
                    <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Methods */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Methods</h3>
          <div className="space-y-4">
            {[
              { name: 'prev()', desc: 'Navigate to previous slide' },
              { name: 'next()', desc: 'Navigate to next slide' },
              { name: 'goToSlide(index: number)', desc: 'Navigate to specific slide' },
            ].map((method, i) => (
              <div key={i} className="border border-gray-200 rounded p-4">
                <code className="text-primary-600 font-mono">{method.name}</code>
                <p className="text-gray-600 mt-2">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Events</h3>
          <div className="border border-gray-200 rounded p-4">
            <code className="text-primary-600 font-mono">slide-change</code>
            <p className="text-gray-600 mt-2">Fires when active slide changes</p>
            <p className="text-sm text-gray-500 mt-2 font-mono">
              Detail: <code className="bg-gray-100 px-2 py-1">{'{ index: number, totalSlides: number }'}</code>
            </p>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h2>

        <div className="space-y-8">
          {/* Basic HTML */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic HTML</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<uibit-carousel>
  <div slot="item">Slide 1</div>
  <div slot="item">Slide 2</div>
  <div slot="item">Slide 3</div>
</uibit-carousel>`}</code>
            </pre>
          </div>

          {/* With Auto-Play */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">With Auto-Play</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<uibit-carousel
  auto-play
  auto-play-interval="3000"
  loop>
  <img slot="item" src="image-1.jpg" alt="Slide 1" />
  <img slot="item" src="image-2.jpg" alt="Slide 2" />
</uibit-carousel>`}</code>
            </pre>
          </div>

          {/* Programmatic Control */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Programmatic Control</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`const carousel = document.querySelector('uibit-carousel');

carousel.prev();
carousel.next();
carousel.goToSlide(2);

carousel.addEventListener('slide-change', (e) => {
  console.log(\`Slide \${e.detail.index + 1} of \${e.detail.totalSlides}\`);
});`}</code>
            </pre>
          </div>

          {/* React Integration */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">React Integration</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import '@uibit/carousel';

function MyCarousel() {
  return (
    <uibit-carousel autoPlay loop>
      <div slot="item">Slide 1</div>
      <div slot="item">Slide 2</div>
    </uibit-carousel>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            '✨ Native CSS Scroll-Snap',
            '🎬 Scroll-Driven Animations',
            '♿ Fully Accessible',
            '📱 Responsive Design',
            '👆 Touch & Swipe Support',
            '⌨️ Keyboard Navigation',
            '🔄 Auto-Play Option',
            '🎨 Customizable with CSS Variables',
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-primary-600 font-bold mt-0.5">•</span>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CarouselDocs;
