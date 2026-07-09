import { useRef } from 'react';
import '@uibit/carousel';
import manifest from '@uibit/carousel/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function CarouselDemo() {
  const carouselRef = useRef<any>(null);

  return (
    <div>
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
        <div className="carousel-slide">
          <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow at dawn" />
          <span className="carousel-slide-caption">Alpine Meadow — Graubünden, Switzerland</span>
        </div>
        <div className="carousel-slide">
          <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline at sunset" />
          <span className="carousel-slide-caption">Rugged Coastline — Algarve, Portugal</span>
        </div>
        <div className="carousel-slide">
          <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path in autumn forest" />
          <span className="carousel-slide-caption">Temple Path — Kyoto, Japan</span>
        </div>
        <div className="carousel-slide">
          <img src="https://picsum.photos/seed/dunes/900/560" alt="Sand dunes at golden hour" />
          <span className="carousel-slide-caption">Sand Dunes — Merzouga, Morocco</span>
        </div>
      </uibit-carousel>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'carousel',
  title: 'Carousel',
  description:
    'Native, accessible carousel using CSS scroll-snap and scroll-driven animations. Perfect for image galleries, testimonials, and product showcases.',
  packageName: '@uibit/carousel',
  tagName: 'uibit-carousel',
  manifest,
  Demo: CarouselDemo,
  usages: [
    {
      title: 'Basic HTML',
      code: `<uibit-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</uibit-carousel>`,
    },
    {
      title: 'With Auto-Play',
      code: `<uibit-carousel
  auto-play
  auto-play-interval="3000"
  loop>
  <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow" />
  <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline" />
</uibit-carousel>`,
    },
    {
      title: 'Custom Navigation Buttons (Bring Your Own UI)',
      code: `<uibit-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <button slot="prev">Custom Back</button>
  <button slot="next">Custom Next</button>
</uibit-carousel>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/carousel';

function MyCarousel() {
  return (
    <uibit-carousel autoPlay loop>
      <div>Slide 1</div>
      <div>Slide 2</div>
    </uibit-carousel>
  );
}`,
    },
  ],
  features: [
    'Native CSS Scroll-Snap',
    'Scroll-Driven Animations',
    'Fully Accessible',
    'Responsive Design',
    'Touch & Swipe Support',
    'Keyboard Navigation',
    'Auto-Play Option',
    'Customizable with CSS Variables',
  ],
};

export default data;
