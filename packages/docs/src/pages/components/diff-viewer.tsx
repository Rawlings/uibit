import '@uibit/diff-viewer';
import manifest from '@uibit/diff-viewer/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const OLD = `function greet(name) {
  var msg = "Hello, " + name;
  console.log(msg);
  return msg;
}`;

const NEW = `function greet(name: string): string {
  const msg = \`Hello, \${name}\`;
  return msg;
}`;

function DiffViewerDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Side-by-side diff computed internally — no external library required:
      </p>
      <uibit-diff-viewer mode="split">
        <pre slot="old">{OLD}</pre>
        <pre slot="new">{NEW}</pre>
        <span slot="old-label">before.js</span>
        <span slot="new-label">after.ts</span>
      </uibit-diff-viewer>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'diff-viewer',
  title: 'Diff Viewer',
  description:
    'Encapsulated side-by-side or inline comparison block for two text or code snippets. Computes a line-level diff internally using LCS and renders color-coded deleted/inserted/unchanged lines with optional line numbers.',
  packageName: '@uibit/diff-viewer',
  tagName: 'uibit-diff-viewer',
  manifest,
  Demo: DiffViewerDemo,
  usages: [
    {
      title: 'Side-by-side (default)',
      code: `<uibit-diff-viewer>
  <pre slot="old">const x = 1;</pre>
  <pre slot="new">const x = 2;</pre>
  <span slot="old-label">Before</span>
  <span slot="new-label">After</span>
</uibit-diff-viewer>`,
    },
    {
      title: 'Inline / unified view',
      code: `<uibit-diff-viewer mode="inline">
  <pre slot="old">const x = 1;</pre>
  <pre slot="new">const x = 2;</pre>
</uibit-diff-viewer>`,
    },
    {
      title: 'Without line numbers',
      code: `<uibit-diff-viewer show-line-numbers="false">
  <pre slot="old">foo</pre>
  <pre slot="new">bar</pre>
</uibit-diff-viewer>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/diff-viewer';

function Review({ before, after }) {
  return (
    <uibit-diff-viewer>
      <pre slot="old">{before}</pre>
      <pre slot="new">{after}</pre>
      <span slot="old-label">v1.2</span>
      <span slot="new-label">v1.3</span>
    </uibit-diff-viewer>
  );
}`,
    },
  ],
  features: [
    'Pure LCS diff engine — no external dependency, computes in-component',
    'Side-by-side split mode shows old and new panes with aligned blank-line padding',
    'Inline unified mode interleaves deletions and insertions in a single column',
    'Line-number gutter toggleable via show-line-numbers attribute',
    'All colors are CSS custom properties — adapts to any design system',
    'Scrollable panes contain overflow without breaking layout',
  ],
};

export default data;
