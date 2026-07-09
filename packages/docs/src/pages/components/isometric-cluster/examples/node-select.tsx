import '@uibit/isometric-cluster';
import { useEffect, useRef, useState } from 'react';
import { UsageExample } from '../../../../types/docs';

function NodeSelectDemo() {
  const clusterRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<{ id: string; label: string } | null>(null);

  useEffect(() => {
    const el = clusterRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const { node } = (e as CustomEvent).detail;
      setSelected({ id: node.id, label: node.label });
    };
    el.addEventListener('node-select', handler);
    return () => el.removeEventListener('node-select', handler);
  }, []);

  return (
    <div>
      <uibit-isometric-cluster
          ref={clusterRef}
          layer-gap="56"
          style={{ height: '18rem' }}
        >
          <div id="web" label="Web App" icon="🖥️" badge="v2.4"></div>
          <div id="api" label="API Server" icon="🔀" badge="8 routes"></div>
          <div id="queue" label="Job Queue" icon="📬" badge="14 pending"></div>
          <div id="db" label="Database" icon="🗄️" badge="primary"></div>
      </uibit-isometric-cluster>
      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
        {selected ? (
          <span className="text-gray-800">
            Selected: <span className="font-medium">{selected.label}</span>{' '}
            <span className="text-gray-400">({selected.id})</span>
          </span>
        ) : (
          <span className="text-gray-400">No node selected — click a layer above.</span>
        )}
      </div>
    </div>
  );
}

const nodeSelect: UsageExample = {
  title: 'Node Selection',
  description: 'Listen for the node-select event to drive a detail panel or side-sheet when the user clicks a layer.',
  Demo: NodeSelectDemo,
};

export default nodeSelect;
