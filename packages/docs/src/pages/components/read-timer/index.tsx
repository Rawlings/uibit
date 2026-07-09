import '@uibit/read-timer';
import manifest from '@uibit/read-timer/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import articleByline from './examples/article-byline';
import customWpm from './examples/custom-wpm';

function ReadTimerDemo() {
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
    <div>
      <div className="max-w-2xl bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">By UIBit Editors</span>
          <span className="text-gray-200">·</span>
          <uibit-read-timer show-icon>
            <div style={{ display: 'none' }}>{sampleContent}</div>
          </uibit-read-timer>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Why Reading Time Estimates Work</h2>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{sampleContent.trim()}</p>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'read-timer',
  title: 'Read Timer',
  description:
    'Text-analyzer badge that scans the word count of its slotted content and outputs an estimated reading time string inline. No backend metadata required — works directly in any CMS template.',
  packageName: '@uibit/read-timer',
  tagName: 'uibit-read-timer',
  manifest,
  Demo: ReadTimerDemo,
  demoCode: {
    html: `<div class="byline">
  <span>By UIBit Editors</span>
  <span>·</span>
  <uibit-read-timer show-icon>
    <div style="display:none">
      <!-- article text -->
    </div>
  </uibit-read-timer>
</div>`,
    react: `<div className="byline">
  <span>By UIBit Editors</span>
  <span>·</span>
  <uibit-read-timer show-icon>
    <div style={{ display: 'none' }}>{sampleContent}</div>
  </uibit-read-timer>
</div>`,
  },
  examples: [articleByline, customWpm],
  features: [
    'SlotChange observer re-calculates automatically when content updates',
    'Walks the full DOM tree of slotted content, skipping hidden elements',
    'Configurable WPM rate for different audience reading speeds',
    'Customizable label template with {time} placeholder',
    'Built-in SVG clock icon, independently toggleable',
    'Fires read-time-change with word count and minute estimate for analytics',
  ],
};

export default data;
