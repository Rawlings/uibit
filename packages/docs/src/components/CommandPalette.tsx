import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { componentRegistry } from '../pages/components';

const FOUNDATIONS = [
  { id: 'getting-started', title: 'Installation & Setup', to: '/foundations/getting-started', category: 'Foundations' },
  { id: 'accessibility', title: 'Accessibility', to: '/foundations/accessibility', category: 'Foundations' },
  { id: 'styling', title: 'Styling & Theming', to: '/foundations/styling', category: 'Foundations' },
  { id: 'localization', title: 'Localization', to: '/foundations/localization', category: 'Foundations' },
  { id: 'icons', title: 'Icons', to: '/foundations/icons', category: 'Foundations' },
  { id: 'frameworks', title: 'Framework Integrations', to: '/foundations/frameworks', category: 'Foundations' },
  { id: 'browser-support', title: 'Browser Support', to: '/foundations/browser-support', category: 'Foundations' },
  { id: 'troubleshooting', title: 'Troubleshooting & FAQ', to: '/foundations/troubleshooting', category: 'Foundations' },
];

const RESOURCES = [
  { id: 'changelog', title: 'Changelog', to: '/resources/changelog', category: 'Resources' },
  { id: 'contributing', title: 'Contributing', to: '/resources/contributing', category: 'Resources' },
  { id: 'security', title: 'Security', to: '/resources/security', category: 'Resources' },
  { id: 'coc', title: 'Code of Conduct', to: '/resources/coc', category: 'Resources' },
];

const COMPONENT_CATEGORIES = [
  { label: 'Media', ids: ['360-viewer', 'image-comparison', 'hotspot', 'image-reveal', 'particles', 'effect-trigger', 'scratch-reveal', 'consent-guard'] },
  { label: 'Forms', ids: ['signature', 'sentiment-selector'] },
  { label: 'Text', ids: ['text-typing', 'text-rotator', 'read-time', 'text-clamp'] },
  { label: 'Data', ids: ['table', 'diff-viewer', 'countdown', 'number-increment', 'scroll-progress'] },
  { label: 'Layout', ids: ['carousel'] }
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  to: string;
  category: string;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Compile all search items
  const items: CommandItem[] = [];

  // Add foundations
  FOUNDATIONS.forEach(g => {
    items.push({
      id: g.id,
      title: g.title,
      to: g.to,
      category: 'Foundations'
    });
  });

  // Add resources
  RESOURCES.forEach(g => {
    items.push({
      id: g.id,
      title: g.title,
      to: g.to,
      category: 'Resources'
    });
  });

  // Add components
  COMPONENT_CATEGORIES.forEach(cat => {
    cat.ids.forEach(id => {
      const comp = componentRegistry[id];
      if (comp) {
        items.push({
          id: comp.id,
          title: comp.title,
          description: comp.description,
          to: `/components/${comp.id}`,
          category: cat.label
        });
      }
    });
  });

  // Filter items
  const q = search.toLowerCase().trim();
  const filteredItems = q
    ? items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      )
    : items;

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      // Small timeout to ensure input is mounted
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const listHeight = listRef.current.clientHeight;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.clientHeight;

        if (activeTop + activeHeight > listRef.current.scrollTop + listHeight) {
          listRef.current.scrollTop = activeTop + activeHeight - listHeight;
        } else if (activeTop < listRef.current.scrollTop) {
          listRef.current.scrollTop = activeTop;
        }
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          navigate(filteredItems[selectedIndex].to);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Main Palette Modal */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh] transition-all transform scale-100"
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400 dark:text-gray-500 shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search guides and components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3.5 bg-transparent border-0 text-gray-950 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-sm font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded text-[10px] font-mono text-gray-400 dark:text-gray-500 shadow-xs shrink-0 select-none">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-0.5 max-h-[350px]"
        >
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-500">
              No results found for "<span className="font-semibold">{search}</span>"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => {
                    navigate(item.to);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected 
                      ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-900/50 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200/50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-mono tracking-wide scale-90">
                        {item.category}
                      </span>
                      <span className="font-medium text-sm truncate">
                        {item.title}
                      </span>
                    </div>
                    {item.description && (
                      <p className={`text-xs mt-1 truncate ${isSelected ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center">
                    {isSelected ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-900 dark:text-white">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 dark:text-gray-700">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
