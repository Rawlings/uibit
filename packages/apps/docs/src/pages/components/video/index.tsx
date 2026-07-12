import '@uibit/video';
import manifest from '@uibit/video/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import youtube from './examples/youtube';
import youtubeRaw from './examples/youtube?raw';
import vimeo from './examples/vimeo';
import vimeoRaw from './examples/vimeo?raw';

function VideoDemo() {
  return (
    <uibit-video 
      className="block w-full max-w-2xl border border-gray-200 dark:border-gray-800"
    >
      <video 
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" 
        poster="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" 
        loop 
        playsInline
      ></video>
    </uibit-video>
  );
}

const processedExamples = [
  { ...youtube, code: { react: youtubeRaw } },
  { ...vimeo, code: { react: vimeoRaw } },
];

const data: ComponentDocData = {
  id: 'video',
  title: 'Video',
  description:
    'A customizable video player wrapper that replaces standard native HTML5 video player UI with a premium, responsive, and accessible Scandinavian-style design. Also supports iframe embeds (YouTube, Vimeo) with custom poster images and click-to-play activation.',
  packageName: '@uibit/video',
  tagName: 'uibit-video',
  manifest,
  Demo: VideoDemo,
  demoCode: {
    html: `<uibit-video>
  <video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" poster="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" loop playsinline></video>
</uibit-video>`,
    react: `import '@uibit/video';

function VideoDemo() {
  return (
    <uibit-video 
      class="block w-full max-w-2xl border border-gray-200 dark:border-gray-800"
    >
      <video 
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" 
        poster="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" 
        loop 
        playsinline
      ></video>
    </uibit-video>
  );
}`
  },
  examples: processedExamples,
  features: [
    'Grayscale minimal design matching the Scandinavian Greyscale palette',
    'Custom timeline scrubbing with click-and-drag support',
    'Custom interactive volume controls with slider',
    'Fullscreen support with native API bindings',
    'Full keyboard controls (Space, Left/Right arrows, Up/Down arrows, M, F)',
    'Handles iframes with placeholder poster and play button to avoid early loading and slow page speed',
  ],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Focus rings are clearly visible on keyboard focus',
      'All controls have explicit aria-label tags',
      'Screen-readers can read current state and track playback position',
      'Uses relative units (rem) only for text size and layout proportions',
    ],
    keyboardNav: [
      { key: 'Space / K', description: 'Toggle play and pause' },
      { key: 'M', description: 'Toggle audio mute' },
      { key: 'F', description: 'Toggle fullscreen mode' },
      { key: 'ArrowLeft / ArrowRight', description: 'Seek backward / forward by 5 seconds' },
      { key: 'ArrowUp / ArrowDown', description: 'Increase / decrease playback volume' },
    ],
  },
};

export default data;
