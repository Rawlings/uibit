import '@uibit/sentiment-bar';
import manifest from '@uibit/sentiment-bar/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function SentimentBarDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Tap or click an emoji to rate. A second tap confirms and fires the submit event:
      </p>
      <div className="flex flex-col items-center gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center w-full max-w-sm">
          <p className="text-sm font-medium text-gray-700 mb-4">How was your experience?</p>
          <uibit-sentiment-bar show-label></uibit-sentiment-bar>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center w-full max-w-sm">
          <p className="text-sm font-medium text-gray-700 mb-4">Rate this article</p>
          <uibit-sentiment-bar
            options={JSON.stringify([
              { value: 1, emoji: '👎', label: 'Not helpful' },
              { value: 2, emoji: '😐', label: 'Okay' },
              { value: 3, emoji: '👍', label: 'Helpful' },
              { value: 4, emoji: '🙌', label: 'Very helpful' },
              { value: 5, emoji: '🔥', label: 'Essential' },
            ])}
            show-label
          ></uibit-sentiment-bar>
        </div>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'sentiment-bar',
  title: 'Sentiment Bar',
  description:
    'Micro-feedback widget with a sliding row of expressive emoji options. Selecting an option triggers a spring-curve scale animation, grays out alternatives, and fires scored events instantly on release.',
  packageName: '@uibit/sentiment-bar',
  tagName: 'uibit-sentiment-bar',
  manifest,
  Demo: SentimentBarDemo,
  usages: [
    {
      title: 'HTML Integration',
      code: `<uibit-sentiment-bar show-label></uibit-sentiment-bar>`,
    },
    {
      title: 'Custom Options',
      description: 'Replace the default emoji set with any Unicode characters or symbols.',
      code: `<uibit-sentiment-bar
  options='[
    {"value":1,"emoji":"👎","label":"Not helpful"},
    {"value":2,"emoji":"😐","label":"Okay"},
    {"value":3,"emoji":"👍","label":"Helpful"},
    {"value":4,"emoji":"🙌","label":"Very helpful"},
    {"value":5,"emoji":"🔥","label":"Essential"}
  ]'
  show-label
></uibit-sentiment-bar>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/sentiment-bar';

function Feedback() {
  const handleChange = (e) => {
    analytics.track('sentiment', e.detail);
  };

  return (
    <uibit-sentiment-bar
      show-label
      onsentiment-change={handleChange}
    />
  );
}`,
    },
    {
      title: 'Event Handling',
      description: 'sentiment-change fires on every selection; sentiment-submit fires on re-tap for explicit confirmation.',
      code: `const bar = document.querySelector('uibit-sentiment-bar');

bar.addEventListener('sentiment-change', e => {
  console.log('Selected:', e.detail); // { value: 4, label: 'Good' }
});

bar.addEventListener('sentiment-submit', e => {
  submitFeedback(e.detail.value);
});`,
    },
  ],
  features: [
    'Spring-curve CSS transform (cubic-bezier 0.34, 1.56) gives selected items a satisfying pop',
    'Grayscale + opacity filter dims unselected options to draw focus to the active choice',
    'Hover previews the label before committing to a selection',
    'sentiment-change fires immediately; sentiment-submit fires on re-tap for explicit confirmation flow',
    'value attribute is reflected — style against [value="5"] for conditional host styling',
    'Fully keyboard accessible with role="radiogroup" and aria-checked state',
  ],
};

export default data;
