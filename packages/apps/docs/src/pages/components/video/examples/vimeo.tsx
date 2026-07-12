import '@uibit/video';
import { UsageExample } from '../../../../types/docs';

function VimeoDemo() {
  return (
    <uibit-video 
      poster="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop"
      class="block w-full max-w-2xl border border-gray-200 dark:border-gray-800"
    >
      <iframe src="https://player.vimeo.com/video/76979871" allowfullscreen></iframe>
    </uibit-video>
  );
}

const vimeo: UsageExample = {
  title: 'Vimeo Embed',
  description: 'Custom play button and poster overlay wrapping a Vimeo iframe player.',
  Demo: VimeoDemo,
};

export default vimeo;
