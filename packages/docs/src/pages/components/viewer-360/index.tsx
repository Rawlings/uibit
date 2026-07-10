import '@uibit/360-viewer';
import manifest from '@uibit/360-viewer/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import autoRotateExample from './examples/auto-rotate';
import autoRotateRaw from './examples/auto-rotate?raw';
import manualExample from './examples/manual';
import manualRaw from './examples/manual?raw';

const CAR_FRAMES = Array.from({ length: 73 }, (_, i) =>
  `https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/orange-${i + 1}.jpg`
);

function Viewer360Demo() {
  const demoImages = CAR_FRAMES;

  return (
    <uibit-360-viewer auto-rotate="true" rotation-speed={150}>
      {demoImages.map((src, idx) => (
        <img key={idx} src={src} alt={`Frame ${idx + 1}`} />
      ))}
    </uibit-360-viewer>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...autoRotateExample, code: { react: autoRotateRaw } },
  { ...manualExample, code: { react: manualRaw } },
];

const data: ComponentDocData = {
  id: 'viewer-360',
  title: '360-Viewer',
  description:
    'Interactive 360-degree image viewer component. Display products and objects from every angle with smooth mouse/touch dragging, auto-rotation, and preloading.',
  packageName: '@uibit/360-viewer',
  tagName: 'uibit-360-viewer',
  manifest,
  Demo: Viewer360Demo,
  demoCode: {
    html: `<uibit-360-viewer auto-rotate="true" rotation-speed="150">
  <img src="frame-1.jpg" alt="Frame 1" />
  <img src="frame-2.jpg" alt="Frame 2" />
  <img src="frame-3.jpg" alt="Frame 3" />
  <img src="frame-4.jpg" alt="Frame 4" />
  <img src="frame-5.jpg" alt="Frame 5" />
  <img src="frame-6.jpg" alt="Frame 6" />
</uibit-360-viewer>`,
    react: `import '@uibit/360-viewer';

function ProductView() {
  const frames = [
    'frame-1.jpg', 'frame-2.jpg', 'frame-3.jpg',
    'frame-4.jpg', 'frame-5.jpg', 'frame-6.jpg',
  ];

  return (
    <uibit-360-viewer auto-rotate="true" rotation-speed={150}>
      {frames.map((src, idx) => (
        <img key={idx} src={src} alt={\`Frame \${idx + 1}\`} />
      ))}
    </uibit-360-viewer>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The viewer region uses role="img" with an aria-label describing the subject (e.g. "360° product view").',
      'Arrow key controls allow keyboard users to rotate the model without requiring a mouse drag.',
      'Auto-rotation pauses when focus enters the component and resumes on blur, preventing disorienting movement during keyboard navigation.',
    ],
    keyboardNav: [
      { key: 'ArrowLeft', description: 'Rotate the model counter-clockwise by one frame.' },
      { key: 'ArrowRight', description: 'Rotate the model clockwise by one frame.' },
    ],
  },
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
