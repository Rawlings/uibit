import { useRef } from 'react';
import { Link } from 'react-router-dom';
import '@uibit/carousel';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/carousel/custom-elements.json';

function CarouselDocs() {
  const carouselRef = useRef<any>(null);

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
              --uibit-carousel-items-per-view: 1;
              --uibit-carousel-gap: 1rem;
            }

            @media (min-width: 768px) {
              uibit-carousel {
                --uibit-carousel-items-per-view: 2;
              }
            }

            .carousel-slide {
              position: relative;
              height: 280px;
              border-radius: 0.5rem;
              overflow: hidden;
            }

            .carousel-slide img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }

            .carousel-slide-caption {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              padding: 0.75rem 1rem;
              background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
              color: white;
              font-size: 0.875rem;
              font-weight: 500;
            }
          `}</style>

          <uibit-carousel ref={carouselRef} loop>
            <div slot="item" className="carousel-slide">
              <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow at dawn" />
              <span className="carousel-slide-caption">Alpine Meadow — Graubünden, Switzerland</span>
            </div>
            <div slot="item" className="carousel-slide">
              <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline at sunset" />
              <span className="carousel-slide-caption">Rugged Coastline — Algarve, Portugal</span>
            </div>
            <div slot="item" className="carousel-slide">
              <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path in autumn forest" />
              <span className="carousel-slide-caption">Temple Path — Kyoto, Japan</span>
            </div>
            <div slot="item" className="carousel-slide">
              <img src="https://picsum.photos/seed/dunes/900/560" alt="Sand dunes at golden hour" />
              <span className="carousel-slide-caption">Sand Dunes — Merzouga, Morocco</span>
            </div>
          </uibit-carousel>
        </div>
      </section>

      <ApiDocs manifest={manifest as any} tagName="uibit-carousel" />
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
