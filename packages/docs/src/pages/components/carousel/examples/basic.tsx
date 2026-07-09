import '@uibit/carousel';
import { UsageExample } from '../../../../types/docs';

function Demo() {
  return (
    <uibit-carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </uibit-carousel>
  );
}

const basicExample: UsageExample = {
  title: 'Basic Slides',
  description: 'A minimal carousel with three slides. Any block-level content can be a slide.',
  Demo,
};

export default basicExample;
