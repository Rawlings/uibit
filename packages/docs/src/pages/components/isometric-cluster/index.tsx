import '@uibit/isometric-cluster';
import manifest from '@uibit/isometric-cluster/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import infrastructure from './examples/infrastructure';
import nodeSelect from './examples/node-select';

function IsometricClusterDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Hover over the cluster to expand the layers in 3D. Drag to tilt. Click a layer to select it.
      </p>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <uibit-isometric-cluster
          layer-gap="60"
          style={{ height: '22rem' }}
        >
          <div id="cdn" label="CDN / Edge" icon="🌐" badge="3 nodes"></div>
          <div id="lb" label="Load Balancer" icon="⚖️" badge="active"></div>
          <div id="api" label="API Gateway" icon="🔀" badge="12 routes"></div>
          <div id="auth" label="Auth Service" icon="🔑"></div>
          <div id="db" label="Postgres Primary" icon="🗄️" badge="primary"></div>
          <div id="cache" label="Redis Cache" icon="⚡" badge="99% hit"></div>
        </uibit-isometric-cluster>
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
  demoCode: {
    html: `<uibit-isometric-cluster layer-gap="60" style="height:22rem">
  <div id="cdn"   label="CDN / Edge"       icon="🌐" badge="3 nodes"></div>
  <div id="lb"    label="Load Balancer"     icon="⚖️" badge="active"></div>
  <div id="api"   label="API Gateway"       icon="🔀" badge="12 routes"></div>
  <div id="auth"  label="Auth Service"      icon="🔑"></div>
  <div id="db"    label="Postgres Primary"  icon="🗄️" badge="primary"></div>
  <div id="cache" label="Redis Cache"       icon="⚡" badge="99% hit"></div>
</uibit-isometric-cluster>`,
    react: `import '@uibit/isometric-cluster';

function IsometricClusterDemo() {
  return (
    <uibit-isometric-cluster layer-gap="60" style={{ height: '22rem' }}>
      <div id="cdn"   label="CDN / Edge"       icon="🌐" badge="3 nodes"></div>
      <div id="lb"    label="Load Balancer"     icon="⚖️" badge="active"></div>
      <div id="api"   label="API Gateway"       icon="🔀" badge="12 routes"></div>
      <div id="auth"  label="Auth Service"      icon="🔑"></div>
      <div id="db"    label="Postgres Primary"  icon="🗄️" badge="primary"></div>
      <div id="cache" label="Redis Cache"       icon="⚡" badge="99% hit"></div>
    </uibit-isometric-cluster>
  );
}`,
  },
  examples: [infrastructure, nodeSelect],
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
