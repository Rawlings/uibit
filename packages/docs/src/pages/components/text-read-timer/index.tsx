import '@uibit/text-read-timer';
import manifest from '@uibit/text-read-timer/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import articleByline from './examples/article-byline';
import articleBylineRaw from './examples/article-byline?raw';
import customWpm from './examples/custom-wpm';
import customWpmRaw from './examples/custom-wpm?raw';

function TextReadTimerDemo() {
  const sampleContent = `
    The practice of estimating reading time has roots in early publishing where editors would
    calculate how long a piece would take to read before assigning it to a slot in a printed
    magazine. Today, the same signal travels with users across infinite scroll feeds and
    long-form editorial platforms. Research consistently shows that displaying a reading time
    estimate reduces bounce rate on articles longer than 500 words, because readers self-select
    based on their available time rather than abandoning mid-article when they realise the piece
    is longer than expected. The calculation is straightforward: count the words, divide by
    average reading speed. Adults typically read prose at between 200 and 250 words per minute,
    though this varies significantly by domain and content density. Technical documentation skews
    slower; narrative fiction skews faster. The default of 238 words per minute used here reflects
    a commonly cited midpoint from reading research, and can be overridden with the wpm attribute
    to suit your specific audience.
  `;

  return (
    <uibit-text-read-timer show-icon>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">By UIBit Editors</span>
        <span className="text-gray-300">·</span>
        <span slot="timer" className="text-xs text-gray-500 font-medium"></span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Why Reading Time Estimates Work</h2>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{sampleContent.trim()}</p>
    </uibit-text-read-timer>
  );
}

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...articleByline, code: { react: articleBylineRaw } },
  { ...customWpm, code: { react: customWpmRaw } },
];

const data: ComponentDocData = {
  id: 'text-read-timer',
  title: 'Text Read Timer',
  description:
    'Text-analyzer badge that scans the word count of its slotted content and outputs an estimated reading time string. No backend metadata required — works directly in any CMS template.',
  packageName: '@uibit/text-read-timer',
  tagName: 'uibit-text-read-timer',
  manifest,
  Demo: TextReadTimerDemo,
  demoCode: {
    html: `<uibit-text-read-timer show-icon>
  <div class="byline">
    <span>By UIBit Editors</span>
    <span>·</span>
    <span slot="timer"></span>
  </div>
  <h2>Why Reading Time Estimates Work</h2>
  <p>The practice of estimating reading time has roots...</p>
</uibit-text-read-timer>`,
    react: `<uibit-text-read-timer show-icon>
  <div className="byline">
    <span>By UIBit Editors</span>
    <span>·</span>
    <span slot="timer"></span>
  </div>
  <h2>Why Reading Time Estimates Work</h2>
  <p>{sampleContent}</p>
</uibit-text-read-timer>`,
  },
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'The reading time estimate is rendered as inline text and is read by screen readers without any special markup.',
      'The SVG clock icon is marked aria-hidden so it is not narrated separately from the time label.',
      'Slotted content is fully visible to the user and screen readers, ensuring zero content duplication.',
    ],
  },
  features: [
    'SlotChange observer re-calculates automatically when content updates',
    'Walks the full DOM tree of slotted content, skipping hidden elements and the timer slot itself',
    'Configurable WPM rate for different audience reading speeds',
    'Customizable label template with {time} placeholder',
    'Built-in SVG clock icon, independently toggleable',
    'Fires read-time-change with word count and minute estimate for analytics',
  ],
};

export default data;
