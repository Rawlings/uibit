import '@uibit/read-timer';
import { UsageExample } from '../../../../types/docs';

const technicalText = `
  A binary search tree is a rooted binary tree data structure with the key of each internal
  node being greater than all the keys in the respective node's left subtree and less than
  the ones in its right subtree. The time complexity of operations on a binary search tree
  is linear with respect to the height of the tree. Binary search trees allow binary search
  for fast lookup, addition, and removal of data items. Since the nodes in a BST are laid
  out so that each comparison skips about half of the remaining tree, the lookup performance
  is proportional to that of binary logarithm. However, BSTs are not guaranteed to be
  randomly distributed, and the worst-case lookup time degrades to O(n) for a degenerate
  tree. Balancing algorithms such as AVL trees or red-black trees restructure the tree on
  insertion and deletion to keep height logarithmic in the number of nodes, restoring the
  performance guarantee. Choosing between these variants requires understanding the ratio of
  reads to writes and the acceptable overhead per mutation. For write-heavy workloads with
  frequent rebalancing, a skip list may outperform a balanced BST in practice.
`;

function Demo() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Technical Documentation</span>
          <uibit-read-timer wpm="180" template="{time} to read" show-icon>
            <div style={{ display: 'none' }}>{technicalText}</div>
          </uibit-read-timer>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Binary Search Trees</h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{technicalText.trim()}</p>
      </div>
    </div>
  );
}

const example: UsageExample = {
  title: 'Custom WPM for technical content',
  description: 'Override the default 238 WPM for audiences reading dense documentation. The template attribute customises the label string using the {time} placeholder.',
  code: {
    html: `<uibit-read-timer wpm="180" template="{time} to read" show-icon>
  <div style="display:none">
    <!-- technical article content -->
  </div>
</uibit-read-timer>`,
    react: `<uibit-read-timer wpm="180" template="{time} to read" show-icon>
  <div style={{ display: 'none' }}>{technicalText}</div>
</uibit-read-timer>`,
  },
  Demo,
};

export default example;
