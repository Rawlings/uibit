import '@uibit/sentiment-selector';
import manifest from '@uibit/sentiment-selector/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import defaultExample from './examples/default';
import defaultRaw from './examples/default?raw';
import customOptionsExample from './examples/custom-options';
import customOptionsRaw from './examples/custom-options?raw';
import eventHandlingExample from './examples/event-handling';
import eventHandlingRaw from './examples/event-handling?raw';

function SentimentBarDemo() {
  return <uibit-sentiment-selector show-label></uibit-sentiment-selector>;
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...defaultExample, code: { react: defaultRaw } },
  { ...customOptionsExample, code: { react: customOptionsRaw } },
  { ...eventHandlingExample, code: { react: eventHandlingRaw } },
];

const data: ComponentDocData = {
  manifest,
  Demo: SentimentBarDemo,
  demoCode: {
    html: `<uibit-sentiment-selector show-label></uibit-sentiment-selector>`,
    react: `import '@uibit/sentiment-selector';

function Feedback() {
  return <uibit-sentiment-selector show-label />;
}`,
  },
  examples: processedExamples,
  features: [
    'Spring-curve CSS transform (cubic-bezier 0.34, 1.56) gives selected items a satisfying pop',
    'Grayscale + opacity filter dims unselected options to draw focus to the active choice',
    'Hover previews the label before committing to a selection',
    'sentiment-change fires immediately; sentiment-submit fires on re-tap for explicit confirmation flow',
    'value attribute is reflected — style against [value="5"] for conditional host styling',
    'Fully keyboard accessible with role="radiogroup" and aria-checked state',
  ],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Track container functions as a radiogroup with role="radiogroup" and a descriptive aria-label.',
      'Individual sentiment buttons are marked with role="radio" and aria-checked to track selection.',
      'Active preview labels are placed inside an aria-live="polite" region so changes are announced immediately.'
    ],
    keyboardNav: [
      { key: 'ArrowLeft', description: 'Move selection to the previous rating option.' },
      { key: 'ArrowRight', description: 'Move selection to the next rating option.' },
      { key: 'Tab', description: 'Navigate focus onto and away from the sentiment rating group.' }
    ]
  }
};

export default data;
