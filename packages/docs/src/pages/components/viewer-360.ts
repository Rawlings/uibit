import manifest from '@uibit/360-viewer/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'viewer-360',
  title: '360-Viewer',
  description:
    'Interactive 360-degree image viewer component. Display products and objects from every angle with smooth mouse/touch dragging, auto-rotation, and preloading.',
  packageName: '@uibit/360-viewer',
  tagName: 'uibit-360-viewer',
  manifest,
  usages: [
    {
      title: 'HTML Example',
      code: `<uibit-360-viewer id="product-viewer" auto-rotate="true" rotation-speed="200"></uibit-360-viewer>

<script>
  const viewer = document.getElementById('product-viewer');
  viewer.images = [
    'frame-1.jpg',
    'frame-2.jpg',
    'frame-3.jpg',
    'frame-4.jpg'
  ];
</script>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/360-viewer';

function ProductView() {
  const images = ['frame-1.jpg', 'frame-2.jpg', 'frame-3.jpg', 'frame-4.jpg'];

  return (
    <uibit-360-viewer 
      images={JSON.stringify(images)} 
      auto-rotate="true" 
      rotation-speed={150}
    />
  );
}`,
    },
  ],
  features: [
    'Smooth pointer tracking for swipe and drag actions',
    'Preloads adjacent frames to prevent visual flickering',
    'Automatic rotation with automatic pause on user drag and 2s idle resume',
    'Standard keyboard navigation using ArrowLeft and ArrowRight',
    'Glassmorphic overlay navigation controls',
    'Progress tracking bar showing active frame ratio',
    'Aria-compatible landmarks and labels',
  ],
};

export default data;
