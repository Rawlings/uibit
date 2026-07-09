import '@uibit/ab-test';
import { UsageExample } from '../../../../types/docs';

function BasicDemo() {
  return (
    <div class="max-w-md">
      <uibit-ab-test storage-key="basic-ab-test">
        <div slot="variant-a" className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Variant A</h3>
          <p className="text-gray-500 text-sm">This is the control layout.</p>
          <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-700 transition cursor-pointer">
            Get Started
          </button>
        </div>
        <div slot="variant-b" className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Variant B</h3>
          <p className="text-gray-500 text-sm">This is the challenger layout.</p>
          <button className="mt-4 border border-gray-900 text-gray-900 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-900 hover:text-white transition cursor-pointer">
            Try It Free
          </button>
        </div>
      </uibit-ab-test>
    </div>
  );
}

const basicExample: UsageExample = {
  title: 'Basic Variant Slots',
  description: 'Define two variants using named slots. The component automatically assigns a variant on first load and persists the choice via storage-key.',
  Demo: BasicDemo,
  code: {
    html: `<uibit-ab-test storage-key="basic-ab-test">
  <div slot="variant-a">
    <h3>Variant A</h3>
    <p>This is the control layout.</p>
    <button>Get Started</button>
  </div>
  <div slot="variant-b">
    <h3>Variant B</h3>
    <p>This is the challenger layout.</p>
    <button>Try It Free</button>
  </div>
</uibit-ab-test>`,
    react: `import '@uibit/ab-test';

function BasicDemo() {
  return (
    <uibit-ab-test storage-key="basic-ab-test">
      <div slot="variant-a" className="p-5 border rounded-lg">
        <h3>Variant A</h3>
        <p>This is the control layout.</p>
        <button>Get Started</button>
      </div>
      <div slot="variant-b" className="p-5 border rounded-lg">
        <h3>Variant B</h3>
        <p>This is the challenger layout.</p>
        <button>Try It Free</button>
      </div>
    </uibit-ab-test>
  );
}`,
  },
};

export default basicExample;
