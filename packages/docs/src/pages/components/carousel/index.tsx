import '@uibit/carousel';
import manifest from '@uibit/carousel/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import basicExample from './examples/basic';
import basicRaw from './examples/basic?raw';
import autoPlayExample from './examples/auto-play';
import autoPlayRaw from './examples/auto-play?raw';
import customNavExample from './examples/custom-nav';
import customNavRaw from './examples/custom-nav?raw';

function CarouselDemo() {
  return (
    <uibit-carousel loop>
      <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow at dawn" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
      <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline at sunset" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
      <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path in autumn forest" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
      <img src="https://picsum.photos/seed/dunes/900/560" alt="Sand dunes at golden hour" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
    </uibit-carousel>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...basicExample, code: { react: basicRaw } },
  { ...autoPlayExample, code: { react: autoPlayRaw } },
  { ...customNavExample, code: { react: customNavRaw } },
];

const data: ComponentDocData = {
  id: 'carousel',
  title: 'Carousel',
  description: 'Native, accessible carousel using CSS scroll-snap and scroll-driven animations. Perfect for image galleries, testimonials, and product showcases.',
  packageName: '@uibit/carousel',
  tagName: 'uibit-carousel',
  manifest,
  Demo: CarouselDemo,
  demoCode: {
    html: `<uibit-carousel loop>
  <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow at dawn" style="width:100%;height:280px;object-fit:cover;display:block;" />
  <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline at sunset" style="width:100%;height:280px;object-fit:cover;display:block;" />
  <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path in autumn forest" style="width:100%;height:280px;object-fit:cover;display:block;" />
  <img src="https://picsum.photos/seed/dunes/900/560" alt="Sand dunes at golden hour" style="width:100%;height:280px;object-fit:cover;display:block;" />
</uibit-carousel>`,
    react: `import '@uibit/carousel';

function Demo() {
  return (
    <uibit-carousel loop>
      <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow at dawn" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
      <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline at sunset" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
      <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path in autumn forest" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
      <img src="https://picsum.photos/seed/dunes/900/560" alt="Sand dunes at golden hour" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
    </uibit-carousel>
  );
}`,
  },
  examples: processedExamples,
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
