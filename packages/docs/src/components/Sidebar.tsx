import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { componentRegistry } from '../pages/components';

const FOUNDATIONS = [
  { id: 'getting-started', title: 'Installation & Setup', to: '/foundations/getting-started' },
  { id: 'accessibility', title: 'Accessibility', to: '/foundations/accessibility' },
  { id: 'styling', title: 'Styling & Theming', to: '/foundations/styling' },
  { id: 'localization', title: 'Localization', to: '/foundations/localization' },
  { id: 'icons', title: 'Icons', to: '/foundations/icons' },
  { id: 'frameworks', title: 'Framework Integrations', to: '/foundations/frameworks' },
  { id: 'browser-support', title: 'Browser Support', to: '/foundations/browser-support' },
  { id: 'troubleshooting', title: 'Troubleshooting & FAQ', to: '/foundations/troubleshooting' },
];

const RESOURCES = [
  { id: 'changelog', title: 'Changelog', to: '/resources/changelog' },
  { id: 'contributing', title: 'Contributing', to: '/resources/contributing' },
  { id: 'security', title: 'Security', to: '/resources/security' },
  { id: 'coc', title: 'Code of Conduct', to: '/resources/coc' },
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
    if (currentPath === '/foundations/getting-started') resolvedActiveId = 'getting-started';
    else if (currentPath === '/foundations/accessibility') resolvedActiveId = 'accessibility';
    else if (currentPath === '/foundations/styling') resolvedActiveId = 'styling';
    else if (currentPath === '/foundations/localization') resolvedActiveId = 'localization';
    else if (currentPath === '/foundations/icons') resolvedActiveId = 'icons';
    else if (currentPath === '/foundations/frameworks') resolvedActiveId = 'frameworks';
    else if (currentPath === '/foundations/browser-support') resolvedActiveId = 'browser-support';
    else if (currentPath === '/foundations/troubleshooting') resolvedActiveId = 'troubleshooting';
    else if (currentPath === '/resources/changelog') resolvedActiveId = 'changelog';
    else if (currentPath === '/resources/contributing') resolvedActiveId = 'contributing';
    else if (currentPath === '/resources/security') resolvedActiveId = 'security';
    else if (currentPath === '/resources/coc') resolvedActiveId = 'coc';
    else if (currentPath.startsWith('/components/')) {
      resolvedActiveId = currentPath.substring('/components/'.length);
    } else {
      resolvedActiveId = currentPath.substring(1);
    }
  }

  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.toLowerCase();

  const filteredFoundations = searchQuery
    ? FOUNDATIONS.filter((g) => g.title.toLowerCase().includes(q))
    : FOUNDATIONS;

  const filteredResources = searchQuery
    ? RESOURCES.filter((g) => g.title.toLowerCase().includes(q))
    : RESOURCES;

  const isSearching = searchQuery.length > 0;

  const activeStyle = 'text-gray-950 dark:text-white font-medium transition-all duration-150';
  const inactiveStyle = 'text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white transition-all duration-150';

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

  const hasResults = filteredFoundations.length > 0 || categoriesWithMatches.length > 0 || filteredResources.length > 0;

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

        {filteredResources.length > 0 && (
          <div className="space-y-1.5 mt-6 border-t border-gray-100 dark:border-gray-800 pt-4">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
              Resources
            </p>
            {filteredResources.map((guide) => (
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
      </nav>
    </aside>
  );
}
