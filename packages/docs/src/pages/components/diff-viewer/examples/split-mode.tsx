import { UsageExample } from '../../../../types/docs';

const OLD = `function greet(name) {
  var msg = "Hello, " + name;
  console.log(msg);
  return msg;
}`;

const NEW = `function greet(name: string): string {
  const msg = \`Hello, \${name}\`;
  return msg;
}`;

function Demo() {
  return (
    <uibit-diff-viewer mode="split">
      <pre slot="old">{OLD}</pre>
      <pre slot="new">{NEW}</pre>
      <span slot="old-label">before.js</span>
      <span slot="new-label">after.ts</span>
    </uibit-diff-viewer>
  );
}

const splitModeExample: UsageExample = {
  title: 'Split mode',
  description:
    'The default split view places the old and new versions side-by-side with aligned line padding for easy comparison.',
  Demo,
  code: {
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

function CodeReview() {
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
};

export default splitModeExample;
