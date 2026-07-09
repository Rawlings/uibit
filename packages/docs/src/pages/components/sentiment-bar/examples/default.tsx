import '@uibit/sentiment-bar';
import { UsageExample } from '../../../../types/docs';

function DefaultDemo() {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center w-full max-w-sm">
        <p className="text-sm font-medium text-gray-700 mb-4">How was your experience?</p>
        <uibit-sentiment-bar show-label></uibit-sentiment-bar>
      </div>
    </div>
  );
}

const example: UsageExample = {
  title: 'Default',
  description: 'A five-emoji bar with labels. Selecting an option highlights it and dims the rest; re-tapping the same option fires the submit event.',
  code: {
    html: `<uibit-sentiment-bar show-label></uibit-sentiment-bar>`,
    react: `import '@uibit/sentiment-bar';

function Feedback() {
  return <uibit-sentiment-bar show-label />;
}`,
  },
  Demo: DefaultDemo,
};

export default example;
