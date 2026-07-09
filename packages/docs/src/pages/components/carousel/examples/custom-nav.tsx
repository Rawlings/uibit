import '@uibit/carousel';
import { UsageExample } from '../../../../types/docs';

function Demo() {
  return (
    <uibit-carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
      <button slot="prev">Custom Back</button>
      <button slot="next">Custom Next</button>
    </uibit-carousel>
  );
}

const customNavExample: UsageExample = {
  title: 'Custom Navigation Buttons',
  description: 'Replace the default prev/next controls by slotting your own buttons into the "prev" and "next" slots.',
  code: {
    html: `<uibit-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <button slot="prev">Custom Back</button>
  <button slot="next">Custom Next</button>
</uibit-carousel>`,
    react: `import '@uibit/carousel';

function CustomNavCarousel() {
  return (
    <uibit-carousel>
      <div>Slide 1</div>
      <div>Slide 2</div>
      <button slot="prev">Custom Back</button>
      <button slot="next">Custom Next</button>
    </uibit-carousel>
  );
}`,
  },
  Demo,
};

export default customNavExample;
