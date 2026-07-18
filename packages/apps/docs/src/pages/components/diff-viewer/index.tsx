import '@uibit/diff-viewer';
import manifest from '@uibit/diff-viewer/custom-elements.json';
import type { ComponentDocData } from '../../../types/docs';
import splitModeExample from './examples/split-mode';
import splitModeRaw from './examples/split-mode?raw';
import inlineModeExample from './examples/inline-mode';
import inlineModeRaw from './examples/inline-mode?raw';
import noLineNumbersExample from './examples/no-line-numbers';
import noLineNumbersRaw from './examples/no-line-numbers?raw';

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
    <uibit-diff-viewer mode="split">
      <pre slot="old">{OLD}</pre>
      <pre slot="new">{NEW}</pre>
      <span slot="old-label">before.js</span>
      <span slot="new-label">after.ts</span>
    </uibit-diff-viewer>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...splitModeExample, code: { react: splitModeRaw } },
  { ...inlineModeExample, code: { react: inlineModeRaw } },
  { ...noLineNumbersExample, code: { react: noLineNumbersRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: DiffViewerDemo,
  demoCode: {
    html: `<uibit-diff-viewer mode="split">
  <pre slot="old">function greet(name) {
  var msg = "Hello, " + name;
  console.log(msg);
  return msg;
}</pre>
  <pre slot="new">function greet(name: string): string {
  const msg = \`Hello, \${name}\`;
  return msg;
}</pre>
  <span slot="old-label">before.js</span>
  <span slot="new-label">after.ts</span>
</uibit-diff-viewer>`,
    react: `import '@uibit/diff-viewer';

const OLD = \`function greet(name) {
  var msg = "Hello, " + name;
  console.log(msg);
  return msg;
}\`;

const NEW = \`function greet(name: string): string {
  const msg = \\\`Hello, \\\${name}\\\`;
  return msg;
}\`;

function App() {
  return (
    <uibit-diff-viewer mode="split">
      <pre slot="old">{OLD}</pre>
      <pre slot="new">{NEW}</pre>
      <span slot="old-label">before.js</span>
      <span slot="new-label">after.ts</span>
    </uibit-diff-viewer>
  );
}`,
  },
  examples: processedExamples,
  features: [
    'Pure LCS diff engine — no external dependency, computes in-component',
    'Side-by-side split mode shows old and new panes with aligned blank-line padding',
    'Inline unified mode interleaves deletions and insertions in a single column',
    'Line-number gutter toggleable via show-line-numbers attribute',
    'All colors are CSS custom properties — adapts to any design system',
    'Scrollable panes contain overflow without breaking layout',
  ],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Host element functions as an accessible comparison region with role="region" and descriptive label.',
      'Delete (-) and Insert (+) operators are clearly demarcated in the DOM for screen readers.',
      'High-contrast, accessible red/green highlight background colors are tailored to exceed 4.5:1 text contrast ratios.',
    ],
    keyboardNav: [
      {
        key: 'Tab',
        description:
          'Navigate focus to the diff viewer scrollable pane regions.',
      },
      {
        key: 'Arrow Keys',
        description:
          'Scroll through the code content when the pane is focused.',
      },
    ],
  },
};

export default data;
