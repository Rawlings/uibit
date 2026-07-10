import { Link } from 'react-router-dom';
import { useState } from 'react';
import { componentRegistry } from '../pages/components';

const GUIDES = [
  { id: 'styling', title: 'Styling & Theming', to: '/styling' },
  { id: 'localization', title: 'Localization', to: '/localization' },
  { id: 'icons', title: 'Icons', to: '/icons' },
  { id: 'frameworks', title: 'Framework Integrations', to: '/foundations' },
];

const allComponents = Object.values(componentRegistry).sort((a, b) =>
  a.title.localeCompare(b.title)
);

export function Sidebar({ activeId }: { activeId?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const q = searchQuery.toLowerCase();

  const filteredGuides = searchQuery
    ? GUIDES.filter((g) => g.title.toLowerCase().includes(q))
    : GUIDES;

  const filteredComponents = allComponents.filter(
    (c) =>
      !searchQuery ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  );

  const activeStyle = 'bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white font-semibold';
  const inactiveStyle = 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white';

  return (
    <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 pb-6 md:pb-0 md:pr-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-md text-sm focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 font-sans dark:text-gray-100"
        />
      </div>

      <nav className="space-y-1 pr-2">
        {filteredGuides.length === 0 && filteredComponents.length === 0 && (
          <p className="text-xs text-gray-600 dark:text-gray-400 italic px-3 py-2">No results</p>
        )}

        {filteredGuides.length > 0 && (
          <>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 pt-1 pb-1">
              Foundations
            </p>
            {filteredGuides.map((guide) => (
              <Link
                key={guide.id}
                to={guide.to}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeId === guide.id ? activeStyle : inactiveStyle
                }`}
              >
                {guide.title}
              </Link>
            ))}
          </>
        )}

        {filteredComponents.length > 0 && (
          <p className={`text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 pb-1 ${filteredGuides.length > 0 ? 'pt-4' : 'pt-1'}`}>
            Components
          </p>
        )}
        {filteredComponents.map((item) => (
          <Link
            key={item.id}
            to={`/${item.id}`}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${
              activeId === item.id ? activeStyle : inactiveStyle
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
