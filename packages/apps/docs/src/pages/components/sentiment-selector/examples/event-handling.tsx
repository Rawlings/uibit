import '@uibit/sentiment-selector';
import { useEffect, useRef, useState } from 'react';
import { UsageExample } from '../../../../types/docs';

function EventHandlingDemo() {
  const barRef = useRef<any>(null);
  const [lastEvent, setLastEvent] = useState<{ type: string; detail: { value: number; label: string } } | null>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const handleChange = (e: Event) => {
      setLastEvent({ type: 'sentiment-change', detail: (e as CustomEvent).detail });
    };
    const handleSubmit = (e: Event) => {
      setLastEvent({ type: 'sentiment-submit', detail: (e as CustomEvent).detail });
    };

    el.addEventListener('sentiment-change', handleChange);
    el.addEventListener('sentiment-submit', handleSubmit);

    return () => {
      el.removeEventListener('sentiment-change', handleChange);
      el.removeEventListener('sentiment-submit', handleSubmit);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <uibit-sentiment-selector show-label ref={barRef}></uibit-sentiment-selector>
      <pre className="bg-gray-50 rounded p-4 text-sm text-gray-700 min-h-16">
        {lastEvent
          ? JSON.stringify({ event: lastEvent.type, detail: lastEvent.detail }, null, 2)
          : 'No event fired yet.'}
      </pre>
    </div>
  );
}

const example: UsageExample = {
  title: 'Event Handling',
  description: 'sentiment-change fires on every selection; sentiment-submit fires on re-tap for explicit confirmation. Both carry { value, label } in event.detail.',
  Demo: EventHandlingDemo,
};

export default example;
