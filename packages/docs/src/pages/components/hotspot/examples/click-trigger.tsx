import '@uibit/hotspot';
import { UsageExample } from '../../../../types/docs';

function ClickTriggerDemo() {
  const hotspots = [
    {
      id: '1',
      x: 30,
      y: 40,
      label: 'Camera',
      title: 'Triple Lens System',
      content: 'Wide, ultrawide, and telephoto lenses for every shot.',
    },
    {
      id: '2',
      x: 65,
      y: 60,
      label: 'Display',
      title: 'ProMotion Display',
      content: 'Adaptive 120Hz refresh rate with always-on support.',
    },
    {
      id: '3',
      x: 48,
      y: 85,
      label: 'Chip',
      title: 'A-Series Chip',
      content: 'Industry-leading performance with neural engine acceleration.',
    },
  ];

  return (
    <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="click">
      <img
        src="https://picsum.photos/seed/smartphone/600/400"
        alt="Smartphone product shot"
        style={{ display: 'block', width: '100%' }}
      />
    </uibit-hotspot>
  );
}

const clickTrigger: UsageExample = {
  title: 'Click to open',
  description:
    'Hotspots activate on click. Each trigger pulses to invite interaction; clicking opens a tooltip card that dismisses on click-away or Escape.',
  code: {
    html: `<uibit-hotspot id="demo" trigger="click">
  <img src="product.jpg" alt="Product" />
</uibit-hotspot>

<script>
  document.getElementById('demo').hotspots = [
    { id: '1', x: 30, y: 40, title: 'Camera', content: 'Triple lens system.' },
    { id: '2', x: 65, y: 60, title: 'Display', content: 'ProMotion 120Hz.' },
    { id: '3', x: 48, y: 85, title: 'Chip', content: 'Neural engine.' },
  ];
</script>`,
    react: `import '@uibit/hotspot';

function ProductDemo() {
  const hotspots = [
    { id: '1', x: 30, y: 40, title: 'Camera', content: 'Triple lens system.' },
    { id: '2', x: 65, y: 60, title: 'Display', content: 'ProMotion 120Hz.' },
    { id: '3', x: 48, y: 85, title: 'Chip', content: 'Neural engine.' },
  ];

  return (
    <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="click">
      <img src="product.jpg" alt="Product" />
    </uibit-hotspot>
  );
}`,
  },
  Demo: ClickTriggerDemo,
};

export default clickTrigger;
