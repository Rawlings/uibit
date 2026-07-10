import { Link } from 'react-router-dom';
import { useState } from 'react';
import { componentRegistry } from '../pages/components';

const GUIDES = [
  { id: 'styling', title: 'Styling & Theming', to: '/styling' },
  { id: 'localization', title: 'Localization', to: '/localization' },
  { id: 'icons', title: 'Icons', to: '/icons' },
  { id: 'frameworks', title: 'Framework Integrations', to: '/foundations' },
];

const COMPONENT_CATEGORIES = [
  { label: 'Visual & Media', ids: ['carousel', 'viewer-360', 'hotspot', 'image-xray', 'isometric-cluster'] },
  { label: 'Forms & Input', ids: ['signature-pad', 'sentiment-bar', 'consent-guard'] },
  { label: 'Typography & Display', ids: ['text-typing', 'text-clamp', 'text-read-timer', 'text-rotator'] },
  { label: 'Data & Utilities', ids: ['table', 'scroll-progress', 'number-ticker', 'countdown', 'effect-trigger', 'scratch-reveal', 'diff-viewer'] },
  { label: 'A/B Testing', ids: ['ab-test'] },
];

export function Sidebar({ activeId }: { activeId?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.toLowerCase();

  const filteredGuides = searchQuery
    ? GUIDES.filter((g) => g.title.toLowerCase().includes(q))
    : GUIDES;

  const isSearching = searchQuery.length > 0;

  const activeStyle = 'bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white font-semibold';
  const inactiveStyle = 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white';

  const categoriesWithMatches = COMPONENT_CATEGORIES.map((cat) => ({
    ...cat,
    components: cat.ids
      .map((id) => componentRegistry[id])
      .filter((c): c is NonNullable<typeof c> => !!c)
      .filter((c) =>
        !isSearching ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      ),
  })).filter((cat) => cat.components.length > 0);

  const hasResults = filteredGuides.length > 0 || categoriesWithMatches.length > 0;

  return (
    <aside className="w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 pb-6 md:pb-0 md:pr-6">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-md text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 font-sans dark:text-gray-100"
        />
      </div>

      <nav className="space-y-0.5 pr-1">
        {!hasResults && (
          <p className="text-xs text-gray-500 dark:text-gray-500 italic px-3 py-2">No results</p>
        )}

        {filteredGuides.length > 0 && (
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 pb-2 pt-1">
              Guides
            </p>
            {filteredGuides.map((guide) => (
              <Link
                key={guide.id}
                to={guide.to}
                className={`block px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeId === guide.id ? activeStyle : inactiveStyle
                }`}
              >
                {guide.title}
              </Link>
            ))}
          </div>
        )}

        {categoriesWithMatches.map((cat) => (
          <div key={cat.label} className="mb-4">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 pb-2 pt-1">
              {cat.label}
            </p>
            {cat.components.map((item) => (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`block px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeId === item.id ? activeStyle : inactiveStyle
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
