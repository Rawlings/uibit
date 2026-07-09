import { UsageExample } from '../../../../types/docs';

const OLD = `import React from 'react';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`;

const NEW = `import { useState, useCallback } from 'react';

export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  return (
    <button onClick={increment} type="button">
      Count: {count}
    </button>
  );
}`;

function Demo() {
  return (
    <uibit-diff-viewer mode="inline">
      <pre slot="old">{OLD}</pre>
      <pre slot="new">{NEW}</pre>
      <span slot="old-label">Counter.tsx v1</span>
      <span slot="new-label">Counter.tsx v2</span>
    </uibit-diff-viewer>
  );
}

const inlineModeExample: UsageExample = {
  title: 'Inline mode',
  description:
    'Inline (unified) view interleaves deletions and insertions in a single column — useful when horizontal space is limited or the diff is dense.',
  Demo,
  code: {
    html: `<uibit-diff-viewer mode="inline">
  <pre slot="old"><!-- old content --></pre>
  <pre slot="new"><!-- new content --></pre>
  <span slot="old-label">v1</span>
  <span slot="new-label">v2</span>
</uibit-diff-viewer>`,
    react: `import '@uibit/diff-viewer';

function PatchView({ oldCode, newCode }) {
  return (
    <uibit-diff-viewer mode="inline">
      <pre slot="old">{oldCode}</pre>
      <pre slot="new">{newCode}</pre>
      <span slot="old-label">Before</span>
      <span slot="new-label">After</span>
    </uibit-diff-viewer>
  );
}`,
  },
};

export default inlineModeExample;
