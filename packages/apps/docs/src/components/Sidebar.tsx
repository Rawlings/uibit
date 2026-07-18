import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { componentRegistry } from '../pages/components';
import { FOUNDATIONS, TOOLING, TOOLING_CATEGORY_ORDER, CATEGORY_ORDER } from '../config/navigation';

export function Sidebar({ activeId, className = '' }: { activeId?: string; className?: string }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isTooling = currentPath.startsWith('/tooling');

  let resolvedActiveId = activeId;
  if (!resolvedActiveId) {
    if (currentPath === '/foundations/getting-started') resolvedActiveId = 'getting-started';
    else if (currentPath === '/foundations/accessibility') resolvedActiveId = 'accessibility';
    else if (currentPath === '/foundations/styling') resolvedActiveId = 'styling';
    else if (currentPath === '/foundations/localization') resolvedActiveId = 'localization';
    else if (currentPath === '/foundations/icons') resolvedActiveId = 'icons';
    else if (currentPath === '/foundations/frameworks') resolvedActiveId = 'frameworks';
    else if (currentPath === '/foundations/browser-support') resolvedActiveId = 'browser-support';
    else if (currentPath === '/foundations/troubleshooting') resolvedActiveId = 'troubleshooting';
    else if (currentPath.startsWith('/components/')) {
      resolvedActiveId = currentPath.substring('/components/'.length);
    } else if (currentPath.startsWith('/tooling/')) {
      resolvedActiveId = currentPath.substring('/tooling/'.length);
    } else {
      resolvedActiveId = currentPath.substring(1);
    }
  }

  const [searchQuery] = useState('');
  const q = searchQuery.toLowerCase();

  const filteredFoundations = searchQuery
    ? FOUNDATIONS.filter((g) => g.title.toLowerCase().includes(q))
    : FOUNDATIONS;

  const isSearching = searchQuery.length > 0;

  const activeStyle = 'text-gray-950 dark:text-white font-medium transition-all duration-150';
  const inactiveStyle = 'text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-all duration-150';

  // Tooling, grouped by category
  const toolingGrouped = TOOLING.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, typeof TOOLING>);

  const toolingCategoriesWithMatches = TOOLING_CATEGORY_ORDER.map((label) => {
    const items = (toolingGrouped[label] || []).filter(
      (item) => !isSearching || item.title.toLowerCase().includes(q)
    );
    return { label, items };
  }).filter((cat) => cat.items.length > 0);

  // Components, grouped by category
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

  const hasResults = isTooling
    ? toolingCategoriesWithMatches.length > 0
    : filteredFoundations.length > 0 || categoriesWithMatches.length > 0;

  return (
    <aside className={`w-full md:w-56 shrink-0 md:pr-6 ${className}`}>
      {/* Sleek Search Launcher */}
      <div className="mb-6">
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-lg text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-all cursor-pointer font-sans"
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

      <nav className="space-y-4">
        {!hasResults && (
          <p className="text-xs text-gray-400 dark:text-gray-550 italic py-2">No results</p>
        )}

        {isTooling ? (
          toolingCategoriesWithMatches.length > 0 && (
            <div className="space-y-4">
              <p className="text-[11px] font-semibold text-gray-900 dark:text-white mb-1 tracking-wide uppercase">
                Tooling
              </p>
              {toolingCategoriesWithMatches.map((cat) => (
                <div key={cat.label} className="space-y-1.5 border-l-2 border-gray-100 dark:border-gray-800 pl-3 ml-[3px]">
                  <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-2.5 mt-2 uppercase tracking-wider">
                    {cat.label}
                  </p>
                  {cat.items.map((item) => (
                    <Link
                      key={item.id}
                      to={item.to}
                      className={`block text-sm ${
                        resolvedActiveId === item.id ? activeStyle : inactiveStyle
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )
        ) : (
          <>
            {filteredFoundations.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
                  Foundations
                </p>
                {filteredFoundations.map((guide) => (
                  <Link
                    key={guide.id}
                    to={guide.to}
                    className={`block text-sm ${
                      resolvedActiveId === guide.id ? activeStyle : inactiveStyle
                    }`}
                  >
                    {guide.title}
                  </Link>
                ))}
              </div>
            )}

            {categoriesWithMatches.length > 0 && (
              <div className="space-y-4 mt-6">
                <p className="text-[11px] font-semibold text-gray-900 dark:text-white mb-1 tracking-wide uppercase">
                  Components
                </p>
                {categoriesWithMatches.map((cat) => (
                  <div key={cat.label} className="space-y-1.5 border-l-2 border-gray-100 dark:border-gray-800 pl-3 ml-[3px]">
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-2.5 mt-2 uppercase tracking-wider">
                      {cat.label}
                    </p>
                    {cat.components.map((item) => (
                      <Link
                        key={item.id}
                        to={`/components/${item.id}`}
                        className={`block text-sm ${
                          resolvedActiveId === item.id ? activeStyle : inactiveStyle
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </nav>
    </aside>
  );
}
