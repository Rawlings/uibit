import '@uibit/hotspot';
import manifest from '@uibit/hotspot/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import clickTrigger from './examples/click-trigger';
import clickTriggerRaw from './examples/click-trigger?raw';
import hoverTrigger from './examples/hover-trigger';
import hoverTriggerRaw from './examples/hover-trigger?raw';

function HotspotDemo() {
  const hotspots = [
    {
      id: '1',
      x: 25,
      y: 35,
      label: 'High-Fidelity Drivers',
      title: 'High-Fidelity Drivers',
      content:
        'Custom acoustic chambers deliver deep bass, ultra-low distortion, and crisp high frequencies.',
    },
    {
      id: '2',
      x: 70,
      y: 45,
      label: 'Memory Foam Cushioning',
      title: 'Memory Foam Cushioning',
      content:
        'Wrapped in breathable mesh and soft memory foam for all-day comfort without ear fatigue.',
    },
    {
      id: '3',
      x: 48,
      y: 75,
      label: 'Adaptive ANC Microphone',
      title: 'Adaptive ANC Microphone',
      content: 'Continuously monitors ambient noise to cancel sound or enable transparency mode.',
    },
  ];

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-2 overflow-hidden shadow-sm">
        <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="click">
          <img
            src="https://picsum.photos/seed/headphones/800/450"
            alt="Premium over-ear headphones on a minimal surface"
            className="w-full rounded-lg"
          />
        </uibit-hotspot>
      </div>
    </div>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...clickTrigger, code: { react: clickTriggerRaw } },
  { ...hoverTrigger, code: { react: hoverTriggerRaw } },
];

const data: ComponentDocData = {
  id: 'hotspot',
  title: 'Hotspot',
  description:
    'Interactive hotspot annotations for images. Display contextual tooltip cards on click or hover with custom content overlays and animations.',
  packageName: '@uibit/hotspot',
  tagName: 'uibit-hotspot',
  manifest,
  Demo: HotspotDemo,
  demoCode: {
    html: `<uibit-hotspot id="demo" trigger="click">
  <img src="https://picsum.photos/seed/headphones/800/450" alt="Headphones" />
</uibit-hotspot>

<script>
  document.getElementById('demo').hotspots = [
    { id: '1', x: 25, y: 35, title: 'High-Fidelity Drivers', content: 'Custom acoustic chambers deliver deep bass, ultra-low distortion, and crisp high frequencies.' },
    { id: '2', x: 70, y: 45, title: 'Memory Foam Cushioning', content: 'Wrapped in breathable mesh and soft memory foam for all-day comfort without ear fatigue.' },
    { id: '3', x: 48, y: 75, title: 'Adaptive ANC Microphone', content: 'Continuously monitors ambient noise to cancel sound or enable transparency mode.' },
  ];
</script>`,
    react: `import '@uibit/hotspot';

function HotspotDemo() {
  const hotspots = [
    { id: '1', x: 25, y: 35, title: 'High-Fidelity Drivers', content: 'Custom acoustic chambers deliver deep bass, ultra-low distortion, and crisp high frequencies.' },
    { id: '2', x: 70, y: 45, title: 'Memory Foam Cushioning', content: 'Wrapped in breathable mesh and soft memory foam for all-day comfort without ear fatigue.' },
    { id: '3', x: 48, y: 75, title: 'Adaptive ANC Microphone', content: 'Continuously monitors ambient noise to cancel sound or enable transparency mode.' },
  ];

  return (
    <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="click">
      <img src="https://picsum.photos/seed/headphones/800/450" alt="Headphones" />
    </uibit-hotspot>
  );
}`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Each hotspot beacon is rendered as a <button> element, making it natively keyboard focusable and activatable.',
      'Tooltip panels use role="tooltip" linked to their trigger via aria-describedby.',
      'Pressing Escape closes the active tooltip and returns focus to the trigger button.',
      'Images passed to the default slot should include descriptive alt text.',
    ],
    keyboardNav: [
      { key: 'Tab', description: 'Move focus between hotspot buttons.' },
      { key: 'Enter / Space', description: 'Open or close the tooltip for the focused hotspot.' },
      { key: 'Escape', description: 'Close the active tooltip and return focus to the trigger.' },
    ],
  },
  features: [
    'Position coordinates with responsive percentage scales',
    'Pulse beacon animations to naturally draw attention',
    'Frictionless click and hover tooltip activations',
    'Keyboard focusability and Escape dismissals built-in',
    'Glassmorphic tooltip styling with pointer orientation offsets',
    'Screen-reader compatible ARIA mapping',
  ],
};

export default data;
