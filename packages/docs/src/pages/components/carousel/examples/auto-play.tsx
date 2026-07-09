import '@uibit/carousel';
import { UsageExample } from '../../../../types/docs';

function Demo() {
  return (
    <uibit-carousel auto-play auto-play-interval="3000" loop>
      <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow" />
      <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline" />
      <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path" />
    </uibit-carousel>
  );
}

const autoPlayExample: UsageExample = {
  title: 'Auto-Play with Loop',
  description: 'Automatically advances slides every 3 seconds and loops back to the first slide after the last.',
  Demo,
};

export default autoPlayExample;
