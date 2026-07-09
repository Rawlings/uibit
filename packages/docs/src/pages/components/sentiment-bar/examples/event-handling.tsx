import '@uibit/sentiment-bar';
import { useEffect, useRef, useState } from 'react';
import { UsageExample } from '../../../../types/docs';

function EventHandlingDemo() {
  const barRef = useRef<HTMLElement>(null);
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
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center w-full max-w-sm">
        <p className="text-sm font-medium text-gray-700 mb-4">Select a rating</p>
        <uibit-sentiment-bar show-label ref={barRef}></uibit-sentiment-bar>
      </div>
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Last event</p>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 min-h-16">
          {lastEvent
            ? JSON.stringify({ event: lastEvent.type, detail: lastEvent.detail }, null, 2)
            : 'No event fired yet.'}
        </pre>
      </div>
    </div>
  );
}

const example: UsageExample = {
  title: 'Event Handling',
  description: 'sentiment-change fires on every selection; sentiment-submit fires on re-tap for explicit confirmation. Both carry { value, label } in event.detail.',
  code: {
    html: `<uibit-sentiment-bar id="bar" show-label></uibit-sentiment-bar>
<pre id="output">No event fired yet.</pre>

<script>
  const bar = document.querySelector('#bar');
  const output = document.querySelector('#output');

  bar.addEventListener('sentiment-change', e => {
    output.textContent = JSON.stringify(
      { event: 'sentiment-change', detail: e.detail },
      null, 2
    );
  });

  bar.addEventListener('sentiment-submit', e => {
    output.textContent = JSON.stringify(
      { event: 'sentiment-submit', detail: e.detail },
      null, 2
    );
  });
</script>`,
    react: `import '@uibit/sentiment-bar';
import { useEffect, useRef, useState } from 'react';

function FeedbackWidget() {
  const barRef = useRef(null);
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const handleChange = (e) => setLastEvent({ type: 'sentiment-change', detail: e.detail });
    const handleSubmit = (e) => setLastEvent({ type: 'sentiment-submit', detail: e.detail });

    el.addEventListener('sentiment-change', handleChange);
    el.addEventListener('sentiment-submit', handleSubmit);

    return () => {
      el.removeEventListener('sentiment-change', handleChange);
      el.removeEventListener('sentiment-submit', handleSubmit);
    };
  }, []);

  return (
    <div>
      <uibit-sentiment-bar show-label ref={barRef} />
      <pre>{lastEvent ? JSON.stringify(lastEvent, null, 2) : 'No event fired yet.'}</pre>
    </div>
  );
}`,
  },
  Demo: EventHandlingDemo,
};

export default example;
