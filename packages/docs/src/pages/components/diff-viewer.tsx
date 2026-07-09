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
      <uibit-diff-viewer
        old-text={OLD}
        new-text={NEW}
        old-label="before.js"
        new-label="after.ts"
        mode="split"
      ></uibit-diff-viewer>
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
      code: `<uibit-diff-viewer
  old-text="const x = 1;"
  new-text="const x = 2;"
  old-label="Before"
  new-label="After"
></uibit-diff-viewer>`,
    },
    {
      title: 'Inline / unified view',
      code: `<uibit-diff-viewer
  old-text="const x = 1;"
  new-text="const x = 2;"
  mode="inline"
></uibit-diff-viewer>`,
    },
    {
      title: 'Without line numbers',
      code: `<uibit-diff-viewer
  old-text="foo"
  new-text="bar"
  show-line-numbers="false"
></uibit-diff-viewer>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/diff-viewer';

function Review({ before, after }) {
  return (
    <uibit-diff-viewer
      old-text={before}
      new-text={after}
      old-label="v1.2"
      new-label="v1.3"
    />
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
