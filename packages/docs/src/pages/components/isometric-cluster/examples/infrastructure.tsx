import '@uibit/isometric-cluster';
import { UsageExample } from '../../../../types/docs';

function InfrastructureDemo() {
  return (
    <uibit-isometric-cluster layer-gap="60" style={{ height: '22rem' }}>
      <div id="cdn" label="CDN / Edge" icon="🌐" badge="3 nodes"></div>
      <div id="lb" label="Load Balancer" icon="⚖️" badge="active"></div>
      <div id="api" label="API Gateway" icon="🔀" badge="12 routes"></div>
      <div id="auth" label="Auth Service" icon="🔑"></div>
      <div id="db" label="Postgres Primary" icon="🗄️" badge="primary"></div>
      <div id="cache" label="Redis Cache" icon="⚡" badge="99% hit"></div>
    </uibit-isometric-cluster>
  );
}

const infrastructure: UsageExample = {
  title: 'Infrastructure Diagram',
  description: 'Visualise a multi-tier infrastructure stack. Each child div becomes a layer card with an icon, label, and optional badge.',
  code: {
    html: `<uibit-isometric-cluster layer-gap="60" style="height:22rem">
  <div id="cdn"   label="CDN / Edge"       icon="🌐" badge="3 nodes"></div>
  <div id="lb"    label="Load Balancer"     icon="⚖️" badge="active"></div>
  <div id="api"   label="API Gateway"       icon="🔀" badge="12 routes"></div>
  <div id="auth"  label="Auth Service"      icon="🔑"></div>
  <div id="db"    label="Postgres Primary"  icon="🗄️" badge="primary"></div>
  <div id="cache" label="Redis Cache"       icon="⚡" badge="99% hit"></div>
</uibit-isometric-cluster>`,
    react: `import '@uibit/isometric-cluster';

function InfrastructureDiagram() {
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
  Demo: InfrastructureDemo,
};

export default infrastructure;
