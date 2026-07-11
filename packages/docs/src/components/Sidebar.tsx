import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { componentRegistry } from '../pages/components';

const GUIDES = [
  { id: 'styling', title: 'Styling & Theming', to: '/styling' },
  { id: 'localization', title: 'Localization', to: '/localization' },
  { id: 'icons', title: 'Icons', to: '/icons' },
  { id: 'frameworks', title: 'Framework Integrations', to: '/foundations' },
];

const CATEGORY_ORDER = [
  'Layout',
  'Media',
  'Text',
  'Data',
  'Forms'
];

export function Sidebar({ activeId, className = '' }: { activeId?: string; className?: string }) {
  const location = useLocation();
  const currentPath = location.pathname;

  let resolvedActiveId = activeId;
  if (!resolvedActiveId) {
    if (currentPath === '/styling') resolvedActiveId = 'styling';
    else if (currentPath === '/localization') resolvedActiveId = 'localization';
    else if (currentPath === '/icons') resolvedActiveId = 'icons';
    else if (currentPath === '/foundations') resolvedActiveId = 'frameworks';
    else {
      resolvedActiveId = currentPath.substring(1);
    }
  }

  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.toLowerCase();

  const filteredGuides = searchQuery
    ? GUIDES.filter((g) => g.title.toLowerCase().includes(q))
    : GUIDES;

  const isSearching = searchQuery.length > 0;

  const activeStyle = 'border-l-2 border-black dark:border-white pl-4 -ml-[17px] text-gray-950 dark:text-white font-normal transition-all duration-150';
  const inactiveStyle = 'border-l border-transparent pl-4 -ml-[16px] text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-150';

  const grouped = Object.values(componentRegistry).reduce((acc, comp) => {
    const cat = comp.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(comp);
    return acc;
  }, {} as Record<string, typeof componentRegistry[string][]>);

  const categoriesWithMatches = CATEGORY_ORDER.map((label) => {
    const comps = (grouped[label] || [])
      .filter((c) =>
        !isSearching ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      )
      .sort((a, b) => a.title.localeCompare(b.title));
    return {
      label,
      components: comps,
    };
  }).filter((cat) => cat.components.length > 0);

  const hasResults = filteredGuides.length > 0 || categoriesWithMatches.length > 0;

  return (
    <aside className={`w-full md:w-56 shrink-0 md:pr-6 ${className}`}>
      {/* Sleek Search Launcher */}
      <div className="mb-6">
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-350 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-lg text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-all cursor-pointer font-sans"
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search docs...</span>
          </span>
          <kbd className="font-mono text-[10px] scale-90 opacity-60">⌘K</kbd>
        </button>
      </div>

      <nav className="relative space-y-4 pl-[16px]">
        {/* Vertical trace timeline line */}
        <div className="absolute left-0 top-1 bottom-1 w-px bg-gray-150 dark:bg-gray-850" />

        {!hasResults && (
          <p className="text-xs text-gray-400 dark:text-gray-550 italic py-2">No results</p>
        )}

        {filteredGuides.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-1">
              Guides
            </p>
            {filteredGuides.map((guide) => (
              <Link
                key={guide.id}
                to={guide.to}
                className={`block text-sm font-normal ${
                  resolvedActiveId === guide.id ? activeStyle : inactiveStyle
                }`}
              >
                {guide.title}
              </Link>
            ))}
          </div>
        )}

        {categoriesWithMatches.map((cat) => (
          <div key={cat.label} className="space-y-1.5">
            <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-1">
              {cat.label}
            </p>
            {cat.components.map((item) => (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className={`block text-sm font-normal ${
                  resolvedActiveId === item.id ? activeStyle : inactiveStyle
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
