import { useEffect, useRef, useState } from 'react';
import '@uibit/ab-test';
import { UsageExample } from '../../../../types/docs';

function EventTrackingDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handle = (e: any) => {
      setLog((prev) => [
        ...prev,
        `variant-rendered: "${e.detail.variant}" at ${new Date().toLocaleTimeString()}`,
      ]);
    };
    container.addEventListener('variant-rendered', handle);
    return () => container.removeEventListener('variant-rendered', handle);
  }, []);

  return (
    <div>
      <div className="max-w-md mb-4" ref={containerRef}>
        <uibit-ab-test storage-key="event-tracking-demo">
          <div slot="variant-a" className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Variant A</h3>
            <p className="text-gray-500 text-sm">Standard call to action.</p>
          </div>
          <div slot="variant-b" className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Variant B</h3>
            <p className="text-gray-500 text-sm">Urgency-driven call to action.</p>
          </div>
        </uibit-ab-test>
      </div>
      {log.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs text-gray-600 font-mono space-y-1">
          {log.map((entry, i) => (
            <div key={i}>{entry}</div>
          ))}
        </div>
      )}
    </div>
  );
}

const eventTrackingExample: UsageExample = {
  title: 'Event Tracking',
  description: 'Listen to the variant-rendered event to track which variant a user was assigned. Useful for logging to analytics on mount.',
  Demo: EventTrackingDemo,
};

export default eventTrackingExample;
