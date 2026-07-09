import '@uibit/image-xray';
import { UsageExample } from '../../../../types/docs';

function BasicDemo() {
  return (
    <uibit-image-xray>
        <img
          src="https://picsum.photos/seed/architecture42/800/450"
          alt="Building exterior"
          style={{ display: 'block', width: '100%' }}
        />
        <img
          slot="xray"
          src="https://picsum.photos/seed/blueprint42/800/450"
          alt="Building interior"
          style={{ display: 'block', width: '100%' }}
        />
    </uibit-image-xray>
  );
}

const basic: UsageExample = {
  title: 'Basic Usage',
  description: 'Move your cursor over the image to reveal the hidden layer beneath using the default lens size.',
  Demo: BasicDemo,
};

export default basic;
