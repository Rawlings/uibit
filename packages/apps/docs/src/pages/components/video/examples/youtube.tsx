import '@uibit/video';
import type { UsageExample } from '../../../../types/docs';

function YouTubeDemo() {
  return (
    <uibit-video
      poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
      className="block w-full max-w-2xl border border-gray-200 dark:border-gray-800"
    >
      <iframe
        title="Video Player"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        allowFullScreen
      ></iframe>
    </uibit-video>
  );
}

const youtube: UsageExample = {
  title: 'YouTube Embed',
  description:
    'Custom play button and poster overlay wrapping a YouTube iframe player.',
  Demo: YouTubeDemo,
};

export default youtube;
