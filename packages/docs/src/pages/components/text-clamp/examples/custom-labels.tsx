import '@uibit/text-clamp';
import { UsageExample } from '../../../../types/docs';

function CustomLabelsDemo() {
  return (
    <uibit-text-clamp lines={3} style={{ fontSize: '1rem', lineHeight: '1.625' }}>
      Scandinavian design is defined by simplicity, minimalism, and functionality.
      Its roots trace back to the 1950s when Nordic designers began blending fine
      art with everyday utility. The movement prioritises clean lines, natural
      materials, and a restrained palette — resulting in objects that feel both
      timeless and deeply human. In a world of visual noise, the quiet confidence
      of this aesthetic continues to resonate. Furniture, typography, and
      architecture from this tradition share a common thread: nothing is added
      that does not serve a purpose, and nothing that serves a purpose is left
      without care.
      <button slot="more">Read more</button>
      <button slot="less">Show less</button>
    </uibit-text-clamp>
  );
}

const customLabels: UsageExample = {
  title: 'Custom Labels',
  description: 'Override the default More/Less toggles with your own slotted elements.',
  Demo: CustomLabelsDemo,
};

export default customLabels;
