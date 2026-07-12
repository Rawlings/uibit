import '@uibit/sentiment-selector';
import { UsageExample } from '../../../../types/docs';

function CustomOptionsDemo() {
  return (
    <uibit-sentiment-selector show-label>
      <div data-value="1" data-icon="angry" data-label="Not helpful"></div>
      <div data-value="2" data-icon="frown" data-label="Okay"></div>
      <div data-value="3" data-icon="meh" data-label="Helpful"></div>
      <div data-value="4" data-icon="smile" data-label="Very helpful"></div>
      <div data-value="5" data-icon="laugh" data-label="Essential"></div>
    </uibit-sentiment-selector>
  );
}

const example: UsageExample = {
  title: 'Custom Options',
  description: 'Replace the default emoji set by nesting child elements with value, icon, and label attributes. Use any of the available icons: angry, frown, meh, smile, laugh.',
  Demo: CustomOptionsDemo,
};

export default example;
