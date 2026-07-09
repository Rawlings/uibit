import '@uibit/sentiment-bar';
import { UsageExample } from '../../../../types/docs';

function DefaultDemo() {
  return (
    <uibit-sentiment-bar show-label></uibit-sentiment-bar>
  );
}

const example: UsageExample = {
  title: 'Default',
  description: 'A five-emoji bar with labels. Selecting an option highlights it and dims the rest; re-tapping the same option fires the submit event.',
  Demo: DefaultDemo,
};

export default example;
