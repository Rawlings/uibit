import '@uibit/sentiment-bar';
import { UsageExample } from '../../../../types/docs';

function CustomOptionsDemo() {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center w-full max-w-sm">
        <p className="text-sm font-medium text-gray-700 mb-4">Rate this article</p>
        <uibit-sentiment-bar show-label>
          <div value="1" icon="angry" label="Not helpful"></div>
          <div value="2" icon="frown" label="Okay"></div>
          <div value="3" icon="meh" label="Helpful"></div>
          <div value="4" icon="smile" label="Very helpful"></div>
          <div value="5" icon="laugh" label="Essential"></div>
        </uibit-sentiment-bar>
      </div>
    </div>
  );
}

const example: UsageExample = {
  title: 'Custom Options',
  description: 'Replace the default emoji set by nesting child elements with value, icon, and label attributes. Use any of the available icons: angry, frown, meh, smile, laugh.',
  code: {
    html: `<uibit-sentiment-bar show-label>
  <div value="1" icon="angry" label="Not helpful"></div>
  <div value="2" icon="frown" label="Okay"></div>
  <div value="3" icon="meh" label="Helpful"></div>
  <div value="4" icon="smile" label="Very helpful"></div>
  <div value="5" icon="laugh" label="Essential"></div>
</uibit-sentiment-bar>`,
    react: `import '@uibit/sentiment-bar';

function ArticleRating() {
  return (
    <uibit-sentiment-bar show-label>
      <div value="1" icon="angry" label="Not helpful" />
      <div value="2" icon="frown" label="Okay" />
      <div value="3" icon="meh" label="Helpful" />
      <div value="4" icon="smile" label="Very helpful" />
      <div value="5" icon="laugh" label="Essential" />
    </uibit-sentiment-bar>
  );
}`,
  },
  Demo: CustomOptionsDemo,
};

export default example;
