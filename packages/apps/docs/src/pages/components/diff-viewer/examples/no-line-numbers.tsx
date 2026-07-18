import type { UsageExample } from '../../../../types/docs';

const OLD = `body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #fff;
  color: #000;
}`;

const NEW = `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f9f9f9;
  color: #111;
  line-height: 1.5;
}`;

function Demo() {
  return (
    <uibit-diff-viewer show-line-numbers="false">
      <pre slot="old">{OLD}</pre>
      <pre slot="new">{NEW}</pre>
      <span slot="old-label">styles.css</span>
      <span slot="new-label">styles.css</span>
    </uibit-diff-viewer>
  );
}

const noLineNumbersExample: UsageExample = {
  title: 'Without line numbers',
  description:
    'Set show-line-numbers="false" for a cleaner look when line references are not important — ideal for short snippets or config diffs.',
  Demo,
};

export default noLineNumbersExample;
