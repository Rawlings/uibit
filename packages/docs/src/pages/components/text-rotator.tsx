import '@uibit/text-rotator';
import manifest from '@uibit/text-rotator/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function TextRotatorDemo() {
  const words = JSON.stringify(['faster', 'better', 'smarter', 'together']);

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        The word below rotates through a list with a vertical slide transition:
      </p>
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm text-center">
        <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Build websites{' '}
          <uibit-text-rotator
            words={words}
            interval="2000"
            transition="slide"
            style={{ color: '#111827' }}
          ></uibit-text-rotator>
        </h2>
        <p className="text-gray-500 mt-6 text-sm">
          Switch to <code>transition="flip"</code> for a 3D perspective flip.
        </p>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'text-rotator',
  title: 'Text Rotator',
  description:
    'Rotates a single word inside a static sentence block with smooth vertical slide or 3D flip transitions. Designed to pull attention to changing value propositions.',
  packageName: '@uibit/text-rotator',
  tagName: 'uibit-text-rotator',
  manifest,
  Demo: TextRotatorDemo,
  usages: [
    {
      title: 'Slide transition (default)',
      code: `<h1>
  Build websites
  <uibit-text-rotator
    words='["faster", "better", "smarter"]'
    interval="2000"
  ></uibit-text-rotator>
</h1>`,
    },
    {
      title: 'Flip transition',
      code: `<uibit-text-rotator
  words='["faster", "better", "smarter"]'
  transition="flip"
  interval="2500"
></uibit-text-rotator>`,
    },
    {
      title: 'React Integration',
      code: `import '@uibit/text-rotator';

const words = JSON.stringify(['faster', 'better', 'smarter']);

function Hero() {
  return (
    <h1>
      Build websites <uibit-text-rotator words={words} transition="slide" />
    </h1>
  );
}`,
    },
    {
      title: 'Word Change Event',
      description: 'React to the active word changing.',
      code: `document.querySelector('uibit-text-rotator').addEventListener('word-change', e => {
  console.log(e.detail.word, e.detail.index);
});`,
    },
  ],
  features: [
    'Vertical slide and 3D CSS flip transitions selectable via the transition attribute',
    'Overflow-hidden host clips motion to a single-line boundary — no layout shift',
    'Automatic stage width tracking keeps the host fitted to the active word',
    'loop=false stops after the last word for one-shot hero reveals',
    'word-change event synchronises sibling elements to the active index',
  ],
};

export default data;
