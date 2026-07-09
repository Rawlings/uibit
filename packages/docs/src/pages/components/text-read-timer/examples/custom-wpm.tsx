import '@uibit/text-read-timer';
import { UsageExample } from '../../../../types/docs';

const technicalText = `
  A binary search tree (BST) is a rooted binary tree data structure where the key of each internal node is greater than all the keys in its left subtree and less than those in its right subtree. The time complexity of search, insertion, and deletion operations on a BST is proportional to the height of the tree. Under balanced conditions, these operations run in logarithmic time O(log n), making lookup, addition, and removal highly efficient.

  However, if nodes are inserted in sorted order, the tree can degenerate into a linear structure similar to a linked list, degrading worst-case performance to O(n). To prevent this degradation, self-balancing search trees—such as AVL trees or red-black trees—automatically restructure themselves during mutations to keep their height strictly logarithmic.

  When choosing a data structure for a production system, engineers must analyze the read-to-write ratio of the workload. Write-heavy applications might benefit from skip lists or B-trees, which offer different trade-offs in terms of cache locality, concurrency, and serialization overhead compared to memory-bound BSTs.
`;

function Demo() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
        <uibit-text-read-timer wpm="100" template="{time} to read" show-icon>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Technical Documentation</span>
            {/* The component automatically injects the calculated time into slot="timer" */}
            <span slot="timer" className="text-xs text-gray-500 dark:text-gray-400 font-medium"></span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Binary Search Trees</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{technicalText.trim()}</p>
        </uibit-text-read-timer>
      </div>
    </div>
  );
}

const example: UsageExample = {
  title: 'Custom WPM for technical content',
  description: 'Override the default 238 WPM for audiences reading dense documentation. The template attribute customises the label string using the {time} placeholder.',
  Demo,
};

export default example;
