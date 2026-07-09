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
  code: {
    html: `<uibit-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</uibit-carousel>`,
    react: `import '@uibit/carousel';

function BasicCarousel() {
  return (
    <uibit-carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </uibit-carousel>
  );
}`,
  },
  Demo,
};

export default basicExample;
