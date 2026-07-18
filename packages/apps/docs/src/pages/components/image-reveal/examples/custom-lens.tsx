import '@uibit/image-reveal';
import type { UsageExample } from '../../../../types/docs';

function CustomLensDemo() {
  return (
    <uibit-image-reveal
      style={
        { '--uibit-image-reveal-lens-size': '18rem' } as React.CSSProperties
      }
    >
      <img
        src="https://picsum.photos/seed/watchface99/800/450"
        alt="Watch exterior"
        style={{ display: 'block', width: '100%' }}
      />
      <img
        slot="reveal"
        src="https://picsum.photos/seed/watchmovement99/800/450"
        alt="Watch movement and gears"
        style={{ display: 'block', width: '100%' }}
      />
    </uibit-image-reveal>
  );
}

const customLens: UsageExample = {
  title: 'Custom Lens Size',
  description:
    'Control the lens diameter with the --uibit-image-reveal-lens-size CSS custom property for a larger reveal area.',
  Demo: CustomLensDemo,
};

export default customLens;
