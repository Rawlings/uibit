import '@uibit/sentiment-selector';
import type { UsageExample } from '../../../../types/docs';

function DefaultDemo() {
  return <uibit-sentiment-selector show-label></uibit-sentiment-selector>;
}

const example: UsageExample = {
  title: 'Default',
  description:
    'A five-emoji bar with labels. Selecting an option highlights it and dims the rest; re-tapping the same option fires the submit event.',
  Demo: DefaultDemo,
};

export default example;
