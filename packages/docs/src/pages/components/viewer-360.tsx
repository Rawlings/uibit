import '@uibit/360-viewer';
import manifest from '@uibit/360-viewer/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function Viewer360Demo() {
  const demoImages = [
    'https://picsum.photos/seed/sneaker1/600/400',
    'https://picsum.photos/seed/sneaker2/600/400',
    'https://picsum.photos/seed/sneaker3/600/400',
    'https://picsum.photos/seed/sneaker4/600/400',
    'https://picsum.photos/seed/sneaker5/600/400',
    'https://picsum.photos/seed/sneaker6/600/400',
  ];

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Drag the image or use the buttons/arrow keys to rotate the 360 view:
      </p>
      <div className="max-w-xl mx-auto bg-white rounded-lg p-4 border border-gray-200">
        <uibit-360-viewer
          images={JSON.stringify(demoImages)}
          auto-rotate="true"
          rotation-speed={150}
        ></uibit-360-viewer>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'viewer-360',
  title: '360-Viewer',
  description:
    'Interactive 360-degree image viewer component. Display products and objects from every angle with smooth mouse/touch dragging, auto-rotation, and preloading.',
  packageName: '@uibit/360-viewer',
  tagName: 'uibit-360-viewer',
  manifest,
  Demo: Viewer360Demo,
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
