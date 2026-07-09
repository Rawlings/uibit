import '@uibit/text-clamp';
import { UsageExample } from '../../../../types/docs';

function BasicDemo() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm max-w-xl">
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
      </uibit-text-clamp>
    </div>
  );
}

const basic: UsageExample = {
  title: 'Basic',
  description: 'Clamps content to 3 lines. A More/Less toggle appears inline when the text overflows.',
  code: {
    html: `<uibit-text-clamp lines="3">
  Scandinavian design is defined by simplicity, minimalism, and functionality.
  Its roots trace back to the 1950s when Nordic designers began blending fine
  art with everyday utility. The movement prioritises clean lines, natural
  materials, and a restrained palette — resulting in objects that feel both
  timeless and deeply human. In a world of visual noise, the quiet confidence
  of this aesthetic continues to resonate.
</uibit-text-clamp>`,
    react: `import '@uibit/text-clamp';

function Example() {
  return (
    <uibit-text-clamp lines={3}>
      Scandinavian design is defined by simplicity, minimalism, and functionality.
      Its roots trace back to the 1950s when Nordic designers began blending fine
      art with everyday utility. The movement prioritises clean lines, natural
      materials, and a restrained palette — resulting in objects that feel both
      timeless and deeply human. In a world of visual noise, the quiet confidence
      of this aesthetic continues to resonate.
    </uibit-text-clamp>
  );
}`,
  },
  Demo: BasicDemo,
};

export default basic;
