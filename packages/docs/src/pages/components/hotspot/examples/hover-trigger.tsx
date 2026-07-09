import '@uibit/hotspot';
import { UsageExample } from '../../../../types/docs';

function HoverTriggerDemo() {
  const hotspots = [
    {
      id: '1',
      x: 35,
      y: 45,
      label: 'Seat',
      title: 'Ergonomic Seat',
      content: 'Contoured foam with breathable fabric for long rides.',
    },
    {
      id: '2',
      x: 68,
      y: 30,
      label: 'Handlebars',
      title: 'Adjustable Handlebars',
      content: 'Multi-position grip for upright or aggressive riding posture.',
    },
  ];

  return (
    <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="hover">
      <img
        src="https://picsum.photos/seed/bicycle/600/400"
        alt="Bicycle product shot"
        style={{ display: 'block', width: '100%' }}
      />
    </uibit-hotspot>
  );
}

const hoverTrigger: UsageExample = {
  title: 'Hover to reveal',
  description:
    'Setting trigger="hover" opens tooltips on mouse-enter and closes them on mouse-leave — ideal for quick-scan product details without requiring a click.',
  code: {
    html: `<uibit-hotspot id="demo" trigger="hover">
  <img src="product.jpg" alt="Product" />
</uibit-hotspot>

<script>
  document.getElementById('demo').hotspots = [
    { id: '1', x: 35, y: 45, title: 'Seat', content: 'Ergonomic contoured foam.' },
    { id: '2', x: 68, y: 30, title: 'Handlebars', content: 'Multi-position grip.' },
  ];
</script>`,
    react: `import '@uibit/hotspot';

function ProductDemo() {
  const hotspots = [
    { id: '1', x: 35, y: 45, title: 'Seat', content: 'Ergonomic contoured foam.' },
    { id: '2', x: 68, y: 30, title: 'Handlebars', content: 'Multi-position grip.' },
  ];

  return (
    <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="hover">
      <img src="product.jpg" alt="Product" />
    </uibit-hotspot>
  );
}`,
  },
  Demo: HoverTriggerDemo,
};

export default hoverTrigger;
