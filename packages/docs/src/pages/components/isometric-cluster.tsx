import '@uibit/isometric-cluster';
import manifest from '@uibit/isometric-cluster/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const nodes = JSON.stringify([
  { id: 'cdn', label: 'CDN / Edge', icon: '🌐', badge: '3 nodes' },
  { id: 'lb', label: 'Load Balancer', icon: '⚖️', badge: 'active' },
  { id: 'api', label: 'API Gateway', icon: '🔀', badge: '12 routes' },
  { id: 'auth', label: 'Auth Service', icon: '🔑' },
  { id: 'db', label: 'Postgres Primary', icon: '🗄️', badge: 'primary' },
  { id: 'cache', label: 'Redis Cache', icon: '⚡', badge: '99% hit' },
]);

function IsometricClusterDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Hover over the cluster to expand the layers in 3D. Drag to tilt. Click a layer to select it.
      </p>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <uibit-isometric-cluster
          nodes={nodes}
          layer-gap="60"
          style={{ height: '22rem' }}
        ></uibit-isometric-cluster>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'isometric-cluster',
  title: 'Isometric Cluster',
  description:
    'A flat infrastructure or inventory cluster that tilts into a 3D isometric stack on hover, spreading layers vertically so users can inspect and select individual nodes.',
  packageName: '@uibit/isometric-cluster',
  tagName: 'uibit-isometric-cluster',
  manifest,
  Demo: IsometricClusterDemo,
  usages: [
    {
      title: 'HTML Integration',
      code: `<uibit-isometric-cluster
  nodes='[
    { "id": "api", "label": "API Gateway", "icon": "🔀", "badge": "12 routes" },
    { "id": "db",  "label": "Postgres",    "icon": "🗄️", "badge": "primary"  }
  ]'
></uibit-isometric-cluster>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/isometric-cluster';

const nodes = JSON.stringify([
  { id: 'cdn',  label: 'CDN / Edge',     icon: '🌐', badge: '3 nodes' },
  { id: 'api',  label: 'API Gateway',    icon: '🔀', badge: '12 routes' },
  { id: 'db',   label: 'Postgres',       icon: '🗄️', badge: 'primary' },
]);

function Diagram() {
  return <uibit-isometric-cluster nodes={nodes} layer-gap="60" />;
}`,
    },
    {
      title: 'Flip transition',
      code: `<uibit-isometric-cluster
  nodes='[...]'
  tilt-x="55"
  tilt-y="-20"
  drag-tilt="true"
></uibit-isometric-cluster>`,
    },
    {
      title: 'Selection Event',
      description: 'Listen for node selection to drive a detail panel.',
      code: `document.querySelector('uibit-isometric-cluster')
  .addEventListener('node-select', e => {
    console.log(e.detail.node.id, e.detail.node.label);
  });`,
    },
  ],
  features: [
    'Collapsed state renders a tight flat stack — one unified block at a glance',
    'Hover expands layers with a spring-eased CSS 3D transform — no canvas, no WebGL',
    'Pointer drag adjusts the tilt angle interactively via pointer capture',
    'Layer cards support icon swatch, label, and badge slots via JSON properties',
    'node-select and selection-change events drive external detail panels',
    'All dimensions and colors are CSS custom properties for full design system integration',
  ],
};

export default data;
