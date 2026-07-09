import '@uibit/isometric-cluster';
import { useEffect, useRef, useState } from 'react';
import { UsageExample } from '../../../../types/docs';

interface StackNodeDetails {
  id: string;
  name: string;
  icon: string;
  badge: string;
  status: 'healthy' | 'warning' | 'critical';
  metrics: {
    [key: string]: string | number;
  };
  logs: string[];
}

const nodeData: Record<string, StackNodeDetails> = {
  cdn: {
    id: 'cdn',
    name: 'Edge CDN',
    icon: '🌐',
    badge: '32 POPs',
    status: 'healthy',
    metrics: {
      'Cache Hit Rate': '94.8%',
      'Average Latency': '12ms',
      'Request Volume': '24.2k req/s',
      'Active Bandwidth': '1.2 Gbps',
    },
    logs: [
      'CDN-POP-SFO: Cache HIT for /assets/index-b48f02.js',
      'CDN-POP-LHR: Cache HIT for /assets/hero-illustration.webp',
      'CDN-POP-NRT: Cache MISS for /api/v1/dynamic-feed (forwarded to origin)',
      'CDN-POP-CDG: Cache HIT for /fonts/inter-v12-latin.woff2',
      'CDN-POP-SFO: TLS 1.3 Handshake completed successfully',
    ],
  },
  lb: {
    id: 'lb',
    name: 'Anycast Load Balancer',
    icon: '⚖️',
    badge: 'Active',
    status: 'healthy',
    metrics: {
      'Active Targets': '4 regions',
      'Connection Count': '48,201',
      'Healthy Instances': '100%',
      'Throughput': '840 MB/s',
    },
    logs: [
      'LB-CORE: Routed 1,200 TCP connections to us-east-1a',
      'LB-CORE: SSL Termination successful for client: 83.19.24.102',
      'LB-CORE: Target Group check: all 16 instances healthy',
      'LB-CORE: Routed 950 TCP connections to us-west-2b',
      'LB-CORE: Peak connection capacity warning: 42% of limit',
    ],
  },
  api: {
    id: 'api',
    name: 'API Gateway',
    icon: '🔀',
    badge: '18 services',
    status: 'healthy',
    metrics: {
      'Rate Limiting': '0.01% rejected',
      'P99 Latency': '34ms',
      'CORS Preflights': '4.1k/min',
      'Routed Requests': '12,850/sec',
    },
    logs: [
      'API-GW: CORS preflight OK for origin checkout.uibit.dev',
      'API-GW: Authorized bearer token for scope: read:transactions',
      'API-GW: Route matched /users/profile -> microservice-user-v2',
      'API-GW: API Key rate-limit check: OK (Usage: 12.4%)',
      'API-GW: Forwarded checkout request to checkout-service-pod-3',
    ],
  },
  auth: {
    id: 'auth',
    name: 'Auth Provider',
    icon: '🔑',
    badge: 'OAuth2/OIDC',
    status: 'healthy',
    metrics: {
      'Session Count': '124,591',
      'MFA Success Rate': '99.4%',
      'Token Validation': '2.1ms',
      'SSO Integrations': '12 active',
    },
    logs: [
      'AUTH-SRV: Validated JWT token for session_uid_92810',
      'AUTH-SRV: MFA code challenge requested for user: rawlings@uibit.dev',
      'AUTH-SRV: MFA code verification success for user: rawlings@uibit.dev',
      'AUTH-SRV: Issued refresh token token_ref_24a1b09',
      'AUTH-SRV: User session created for client_id: uibit-dashboard-react',
    ],
  },
  app: {
    id: 'app',
    name: 'Application Core',
    icon: '⚙️',
    badge: 'v4.2.1-prod',
    status: 'warning',
    metrics: {
      'CPU Usage': '74.2%',
      'Memory Footprint': '8.2 GB',
      'Active Workers': '128 / 128',
      'Garbage Coll.': '42ms pause',
    },
    logs: [
      'APP-WORKER-4: Memory usage exceeded 80% threshold (8.2 GB / 10 GB)',
      'APP-WORKER-2: Query processed in 1.4ms: SELECT * FROM transactions',
      'APP-WORKER-9: Background job process_invoices finished (142 files)',
      'APP-WORKER-1: Rendered index template in 8.2ms',
      'APP-WORKER-4: Garbage collection completed (released 410 MB)',
    ],
  },
  db: {
    id: 'db',
    name: 'Database Cluster',
    icon: '🗄️',
    badge: 'Primary',
    status: 'healthy',
    metrics: {
      'Active Pools': '42 / 64',
      'Slow Queries': '0',
      'Read/Write Ratio': '82% / 18%',
      'Replica Lag': '4ms',
    },
    logs: [
      'DB-PRIM: Transaction committed successfully (TX_ID: 1049281)',
      'DB-PRIM: Connection pool scaled to 42 active client connections',
      'DB-REPL-1: Catch-up replication synced up to WAL position: 0/1A49F2',
      'DB-PRIM: Index scan optimization applied to users_email_idx',
      'DB-PRIM: Autovacuum completed on table: system_audit_logs',
    ],
  },
};

function CloudConsoleDemo() {
  const clusterRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string>('cdn');
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [metricNoise, setMetricNoise] = useState<number>(0);

  // Initial logs setup
  useEffect(() => {
    if (selectedId && nodeData[selectedId]) {
      setLiveLogs([...nodeData[selectedId].logs]);
    }
  }, [selectedId]);

  // Periodic metric fluctuation & log streaming simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setMetricNoise(prev => (prev + 1) % 100);

      // Randomly append a new simulated log
      if (selectedId && nodeData[selectedId]) {
        const currentData = nodeData[selectedId];
        const randomLogTemplates = [
          `[OK] Health check response from ${currentData.name} instance-node-${Math.floor(Math.random() * 8) + 1}`,
          `[INFO] Inbound request received at ${currentData.name}`,
          `[METRIC] Resource footprint checked, all pools within limits`,
          `[DEBUG] Telemetry dispatched to APM collector`,
        ];
        const newLog = `${new Date().toLocaleTimeString()} - ${
          randomLogTemplates[Math.floor(Math.random() * randomLogTemplates.length)]
        }`;

        setLiveLogs(prev => {
          const next = [newLog, ...prev];
          return next.slice(0, 5); // Keep last 5
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [selectedId]);

  useEffect(() => {
    const el = clusterRef.current;
    if (!el) return;

    const handleSelect = (e: Event) => {
      const { node } = (e as CustomEvent).detail;
      if (node && nodeData[node.id]) {
        setSelectedId(node.id);
      }
    };

    el.addEventListener('node-select', handleSelect);
    return () => el.removeEventListener('node-select', handleSelect);
  }, []);

  const activeNode = nodeData[selectedId] || nodeData.cdn;

  return (
    <div className="flex flex-col gap-6">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gray-50 border border-gray-200 rounded-xl p-4 lg:p-6 overflow-hidden">
        {/* Left Side: 3D Visualization */}
        <div className="lg:col-span-5 flex flex-col justify-between items-center bg-white rounded-lg border border-gray-200 p-4 h-[26rem] relative">
          <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs text-gray-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE 3D RENDER
          </div>
          
          <div className="w-full flex-1 flex items-center justify-center">
            <uibit-isometric-cluster
              ref={clusterRef}
              layer-gap="64"
              tilt-x="45"
              tilt-y="-20"
              style={{ height: '22rem', width: '100%' }}
            >
              <div id="cdn" label="Edge CDN" icon="🌐" badge="32 POPs"></div>
              <div id="lb" label="Load Balancer" icon="⚖️" badge="active"></div>
              <div id="api" label="API Gateway" icon="🔀" badge="18 services"></div>
              <div id="auth" label="Auth Provider" icon="🔑"></div>
              <div id="app" label="Application Core" icon="⚙️" badge="Warning"></div>
              <div id="db" label="Database Primary" icon="🗄️" badge="primary"></div>
            </uibit-isometric-cluster>
          </div>

          <div className="text-xs text-gray-400 text-center font-mono mt-2">
            Click layer to select • Hover to explode • Drag to rotate
          </div>
        </div>

        {/* Right Side: Monitor Panel */}
        <div className="lg:col-span-7 flex flex-col bg-gray-950 text-gray-200 border border-gray-900 rounded-lg p-6 font-mono text-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">{activeNode.icon}</span>
              <div>
                <h5 className="text-sm font-semibold text-white tracking-tight leading-none">
                  {activeNode.name}
                </h5>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 inline-block">
                  Node Telemetry ID: {activeNode.id}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  activeNode.status === 'healthy'
                    ? 'bg-emerald-500'
                    : activeNode.status === 'warning'
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-red-500 animate-ping'
                }`}
              ></span>
              <span className="text-[10px] uppercase text-gray-400 tracking-wider">
                {activeNode.status}
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(activeNode.metrics).map(([key, val]) => {
              // Add a bit of live fluctuation to numeric values
              let displayVal = val;
              if (typeof val === 'string' && val.endsWith('%')) {
                const numeric = parseFloat(val);
                displayVal = `${(numeric + (metricNoise % 3 - 1) * 0.1).toFixed(1)}%`;
              } else if (typeof val === 'string' && val.endsWith('ms')) {
                const numeric = parseFloat(val);
                displayVal = `${(numeric + (metricNoise % 5 - 2)).toFixed(0)}ms`;
              }

              return (
                <div key={key} className="bg-gray-900/50 border border-gray-800 rounded p-3">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                    {key}
                  </div>
                  <div className="text-sm font-bold text-white font-mono">{displayVal}</div>
                </div>
              );
            })}
          </div>

          {/* Logs Terminal */}
          <div className="flex-1 flex flex-col min-h-[8rem] bg-black/50 border border-gray-900 rounded p-4 overflow-hidden">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider border-b border-gray-900 pb-2 mb-2 flex items-center justify-between">
              <span>Node Logs (Live Feed)</span>
              <span className="text-gray-600">STDOUT / STDERR</span>
            </div>
            <div className="flex-1 flex flex-col justify-end gap-1.5 font-mono text-[11px] leading-relaxed text-gray-400">
              {liveLogs.map((log, index) => {
                const isWarning = log.includes('Warning') || log.includes('exceeded') || log.includes('MISS');
                return (
                  <div
                    key={index}
                    className={`truncate ${
                      isWarning ? 'text-amber-400' : index === 0 ? 'text-emerald-400' : 'text-gray-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cloudConsole: UsageExample = {
  title: 'Production Infrastructure Console',
  description:
    'An interactive infrastructure stack dashboard simulator. Click on nodes in the 3D representation to dynamically isolate service metrics and stream real-time logs in the telemetry console.',
  code: {
    html: `<uibit-isometric-cluster id="infra-cluster" layer-gap="64" tilt-x="45" tilt-y="-20" style="height:22rem">
  <div id="cdn"   label="Edge CDN"         icon="🌐" badge="32 POPs"></div>
  <div id="lb"    label="Load Balancer"     icon="⚖️" badge="active"></div>
  <div id="api"   label="API Gateway"       icon="🔀" badge="18 services"></div>
  <div id="auth"  label="Auth Provider"      icon="🔑"></div>
  <div id="app"   label="Application Core"  icon="⚙️" badge="Warning"></div>
  <div id="db"    label="Database Primary"  icon="🗄️" badge="primary"></div>
</uibit-isometric-cluster>`,
    react: `import '@uibit/isometric-cluster';
import { useEffect, useRef, useState } from 'react';

function Dashboard() {
  const clusterRef = useRef(null);
  const [selected, setSelected] = useState('cdn');

  useEffect(() => {
    const el = clusterRef.current;
    if (!el) return;
    const onSelect = (e) => setSelected(e.detail.node.id);
    el.addEventListener('node-select', onSelect);
    return () => el.removeEventListener('node-select', onSelect);
  }, []);

  return (
    <div className="dashboard">
      <uibit-isometric-cluster ref={clusterRef} layer-gap="64" tilt-x="45" tilt-y="-20">
        <div id="cdn"   label="Edge CDN"         icon="🌐" badge="32 POPs"></div>
        <div id="lb"    label="Load Balancer"     icon="⚖️" badge="active"></div>
        <div id="api"   label="API Gateway"       icon="🔀" badge="18 services"></div>
        <div id="auth"  label="Auth Provider"      icon="🔑"></div>
        <div id="app"   label="Application Core"  icon="⚙️" badge="Warning"></div>
        <div id="db"    label="Database Primary"  icon="🗄️" badge="primary"></div>
      </uibit-isometric-cluster>
      
      <div className="telemetry-panel">
        Active Node: {selected}
      </div>
    </div>
  );
}`,
  },
  Demo: CloudConsoleDemo,
};

export default cloudConsole;
