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
    </uibit-carousel>
  );
}

const basicExample: UsageExample = {
  title: 'Basic Slides',
  description: 'A minimal carousel with three slides. Any block-level content can be a slide.',
  Demo,
};

export default basicExample;
