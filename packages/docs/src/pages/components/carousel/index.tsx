import { useRef } from 'react';
import '@uibit/carousel';
import manifest from '@uibit/carousel/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import basicExample from './examples/basic';
import autoPlayExample from './examples/auto-play';
import customNavExample from './examples/custom-nav';

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
          uibit-carousel { --uibit-carousel-items-per-view: 2; }
        }
        .carousel-slide { position: relative; height: 280px; border-radius: 0.5rem; overflow: hidden; }
        .carousel-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .carousel-slide-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 0.75rem 1rem; background: linear-gradient(to top, rgba(0,0,0,0.55), transparent); color: white; font-size: 0.875rem; font-weight: 500; }
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
  description: 'Native, accessible carousel using CSS scroll-snap and scroll-driven animations. Perfect for image galleries, testimonials, and product showcases.',
  packageName: '@uibit/carousel',
  tagName: 'uibit-carousel',
  manifest,
  Demo: CarouselDemo,
  demoCode: {
    html: `<style>
  uibit-carousel {
    --uibit-carousel-items-per-view: 1;
    --uibit-carousel-gap: 1rem;
  }
  @media (min-width: 768px) {
    uibit-carousel { --uibit-carousel-items-per-view: 2; }
  }
  .carousel-slide { position: relative; height: 280px; border-radius: 0.5rem; overflow: hidden; }
  .carousel-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .carousel-slide-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 0.75rem 1rem; background: linear-gradient(to top, rgba(0,0,0,0.55), transparent); color: white; font-size: 0.875rem; font-weight: 500; }
</style>

<uibit-carousel loop>
  <div class="carousel-slide">
    <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow at dawn" />
    <span class="carousel-slide-caption">Alpine Meadow — Graubünden, Switzerland</span>
  </div>
  <div class="carousel-slide">
    <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline at sunset" />
    <span class="carousel-slide-caption">Rugged Coastline — Algarve, Portugal</span>
  </div>
  <div class="carousel-slide">
    <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path in autumn forest" />
    <span class="carousel-slide-caption">Temple Path — Kyoto, Japan</span>
  </div>
  <div class="carousel-slide">
    <img src="https://picsum.photos/seed/dunes/900/560" alt="Sand dunes at golden hour" />
    <span class="carousel-slide-caption">Sand Dunes — Merzouga, Morocco</span>
  </div>
</uibit-carousel>`,
    react: `import { useRef } from 'react';
import '@uibit/carousel';

function CarouselDemo() {
  const carouselRef = useRef(null);

  return (
    <div>
      <style>{\`
        uibit-carousel {
          --uibit-carousel-items-per-view: 1;
          --uibit-carousel-gap: 1rem;
        }
        @media (min-width: 768px) {
          uibit-carousel { --uibit-carousel-items-per-view: 2; }
        }
        .carousel-slide { position: relative; height: 280px; border-radius: 0.5rem; overflow: hidden; }
        .carousel-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .carousel-slide-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 0.75rem 1rem; background: linear-gradient(to top, rgba(0,0,0,0.55), transparent); color: white; font-size: 0.875rem; font-weight: 500; }
      \`}</style>

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
}`,
  },
  examples: [basicExample, autoPlayExample, customNavExample],
  features: ['Native CSS Scroll-Snap', 'Scroll-Driven Animations', 'Fully Accessible', 'Responsive Design', 'Touch & Swipe Support', 'Keyboard Navigation', 'Auto-Play Option', 'Customizable with CSS Variables'],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Each slide is wrapped in a group role with dynamic aria-label indicating slide index (e.g., "Slide 1 of 4").',
      'Track container is marked as a carousel region with a defined role.',
      'Active slide buttons are marked with role="tab" and support tablist relationships.',
      'Autoplay pauses on focus or mouse hover, avoiding sudden shifts for keyboard and screen reader users.'
    ],
    keyboardNav: [
      { key: 'ArrowLeft', description: 'Advance to the previous slide.' },
      { key: 'ArrowRight', description: 'Advance to the next slide.' },
      { key: 'Tab', description: 'Navigate focus between the navigation buttons and indicator controls.' }
    ]
  }
};

export default data;
