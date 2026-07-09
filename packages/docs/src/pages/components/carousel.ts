import manifest from '@uibit/carousel/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'carousel',
  title: 'Carousel',
  description:
    'Native, accessible carousel using CSS scroll-snap and scroll-driven animations. Perfect for image galleries, testimonials, and product showcases.',
  packageName: '@uibit/carousel',
  tagName: 'uibit-carousel',
  manifest,
  usages: [
    {
      title: 'Basic HTML',
      code: `<uibit-carousel>
  <div slot="item">Slide 1</div>
  <div slot="item">Slide 2</div>
  <div slot="item">Slide 3</div>
</uibit-carousel>`,
    },
    {
      title: 'With Auto-Play',
      code: `<uibit-carousel
  auto-play
  auto-play-interval="3000"
  loop>
  <img slot="item" src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow" />
  <img slot="item" src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline" />
</uibit-carousel>`,
    },
    {
      title: 'Programmatic Control',
      code: `const carousel = document.querySelector('uibit-carousel');

carousel.prev();
carousel.next();
carousel.goToSlide(2);

carousel.addEventListener('slide-change', (e) => {
  console.log(\`Slide \${e.detail.index + 1} of \${e.detail.totalSlides}\`);
});`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/carousel';

function MyCarousel() {
  return (
    <uibit-carousel autoPlay loop>
      <div slot="item">Slide 1</div>
      <div slot="item">Slide 2</div>
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
