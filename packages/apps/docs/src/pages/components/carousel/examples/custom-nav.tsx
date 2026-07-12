import '@uibit/carousel';
import { UsageExample } from '../../../../types/docs';

function Demo() {
  return (
    <uibit-carousel>
      <div className="bg-gray-100 dark:bg-gray-900/60 p-16 text-center rounded-xl font-medium text-gray-900 dark:text-white">
        Slide 1
      </div>
      <div className="bg-gray-100 dark:bg-gray-900/60 p-16 text-center rounded-xl font-medium text-gray-900 dark:text-white">
        Slide 2
      </div>
      <div className="bg-gray-100 dark:bg-gray-900/60 p-16 text-center rounded-xl font-medium text-gray-900 dark:text-white">
        Slide 3
      </div>
      <button
        slot="prev"
        className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer text-gray-900 dark:text-white"
      >
        Custom Back
      </button>
      <button
        slot="next"
        className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer text-gray-900 dark:text-white"
      >
        Custom Next
      </button>
    </uibit-carousel>
  );
}

const customNavExample: UsageExample = {
  title: 'Custom Navigation Buttons',
  description: 'Replace the default prev/next controls by slotting your own buttons into the "prev" and "next" slots.',
  Demo,
};

export default customNavExample;
