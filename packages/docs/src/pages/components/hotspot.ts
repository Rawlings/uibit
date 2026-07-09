import manifest from '@uibit/hotspot/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'hotspot',
  title: 'Hotspot',
  description:
    'Interactive hotspot annotations for images. Display contextual tooltip cards on click or hover with custom content overlays and animations.',
  packageName: '@uibit/hotspot',
  tagName: 'uibit-hotspot',
  manifest,
  usages: [
    {
      title: 'HTML Example (with Composable Slots)',
      code: `<uibit-hotspot id="product-demo">
  <img src="product.jpg" alt="Product Image" />
  
  <!-- Slotted popover content for hotspot with id="1" -->
  <div slot="popover-1" class="p-2 text-center">
    <h4 style="margin: 0; font-weight: bold;">Zoom Lens</h4>
    <p style="margin: 4px 0 0 0; font-size: 0.8rem;">F/2.8 premium optic assembly.</p>
    <a href="/shop" style="color: black; text-decoration: underline; font-size: 0.75rem;">Shop Now</a>
  </div>
</uibit-hotspot>

<script>
  const widget = document.getElementById('product-demo');
  widget.hotspots = [
    { id: '1', x: 45, y: 55 }
  ];
</script>`,
    },
    {
      title: 'React Example',
      code: `import '@uibit/hotspot';

function ProductShowcase() {
  const points = [
    { id: '1', x: 30, y: 40, title: 'Material', content: 'Sustainable bamboo fibers' }
  ];

  return (
    <uibit-hotspot hotspots={JSON.stringify(points)}>
      <img src="bamboo-cup.jpg" alt="Bamboo Cup" />
    </uibit-hotspot>
  );
}`,
    },
  ],
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
