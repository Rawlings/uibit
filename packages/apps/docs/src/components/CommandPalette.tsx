import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { componentRegistry } from '../pages/components';
import { FOUNDATIONS, TOOLING } from '../config/navigation';
import { slugify } from '../utils/markdown';

// Raw imports of markdown content files for indexing
import gettingStartedMd from '../../content/getting-started.md?raw';
import accessibilityMd from '../../content/accessibility.md?raw';
import stylingMd from '../../content/styling.md?raw';
import localizationMd from '../../content/localization.md?raw';
import iconsMd from '../../content/icons.md?raw';
import browserSupportMd from '../../content/browser-support.md?raw';
import troubleshootingMd from '../../content/troubleshooting.md?raw';

const markdownGuides: Record<string, string> = {
  '/foundations/getting-started': gettingStartedMd,
  '/foundations/accessibility': accessibilityMd,
  '/foundations/styling': stylingMd,
  '/foundations/localization': localizationMd,
  '/foundations/icons': iconsMd,
  '/foundations/browser-support': browserSupportMd,
  '/foundations/troubleshooting': troubleshootingMd,
};

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
  FOUNDATIONS.forEach((g) => {
    items.push({
      id: g.id,
      title: g.title,
      to: g.to,
      category: 'Foundations',
    });
  });

  // Add tooling
  TOOLING.forEach((g) => {
    items.push({
      id: g.id,
      title: g.title,
      to: g.to,
      category: 'Tooling',
    });
  });

  // Add components and their sub-headings (Demo, API Reference, etc.)
  Object.values(componentRegistry).forEach((comp) => {
    items.push({
      id: comp.id,
      title: comp.title,
      description: comp.description,
      to: `/components/${comp.id}`,
      category: comp.category || 'Other',
    });

    const subheadings = [
      { subId: 'demo', label: 'Demo' },
      { subId: 'api-reference', label: 'API Reference' },
      { subId: 'accessibility', label: 'Accessibility' },
      { subId: 'features', label: 'Features' },
      { subId: 'changelog', label: 'Changelog' },
    ];

    subheadings.forEach((sub) => {
      items.push({
        id: `${comp.id}#${sub.subId}`,
        title: `${comp.title} — ${sub.label}`,
        description: `Section in ${comp.title} documentation`,
        to: `/components/${comp.id}#${sub.subId}`,
        category: 'Section',
      });
    });
  });

  // Add sub-headings from guides
  Object.entries(markdownGuides).forEach(([route, content]) => {
    const lines = content.split('\n');
    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const title = line.substring(3).trim();
        const headingId = slugify(title);
        items.push({
          id: `${route}#${headingId}`,
          title: title,
          description: `Section in ${route.split('/').pop()?.replace('-', ' ')}`,
          to: `${route}#${headingId}`,
          category: 'Section',
        });
      }
    });
  });

  // Filter and rank items based on search query
  const q = search.toLowerCase().trim();
  let filteredItems = items;
  if (q) {
    const scored = items
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const descLower = item.description?.toLowerCase() || '';

        if (titleLower === q) {
          score += 100;
        } else if (titleLower.startsWith(q)) {
          score += 50;
        } else if (titleLower.includes(q)) {
          score += 30;
        }

        if (descLower.includes(q)) {
          score += 10;
        }

        // Penalize subheadings slightly if search is not a direct match to keep main pages ranked higher
        if (item.category === 'Section') {
          score -= 5;
        }

        return { item, score };
      })
      .filter((x) => x.score > 0);

    // Sort by score descending, then by title alphabetically
    scored.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.item.title.localeCompare(b.item.title);
    });

    filteredItems = scored.map((x) => x.item);
  }

  // Reset selected index when search changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: search is intentionally unused in the body — it re-triggers this effect when the query changes
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
        setSelectedIndex(
          (prev) => (prev + 1) % Math.max(1, filteredItems.length),
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredItems.length) %
            Math.max(1, filteredItems.length),
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          navigate(filteredItems[selectedIndex].to);
          onClose();
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        // Cycle focus between input and the active list item to trap focus within modal
        if (document.activeElement === inputRef.current) {
          const activeEl = listRef.current?.children[
            selectedIndex
          ] as HTMLElement;
          activeEl?.focus();
        } else {
          inputRef.current?.focus();
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
      {/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop */}
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
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-gray-400 dark:text-gray-500 shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="command-palette-listbox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-activedescendant={
              filteredItems[selectedIndex]
                ? `item-${filteredItems[selectedIndex].id.replace(/[#:]/g, '-')}`
                : undefined
            }
            placeholder="Search guides and components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3.5 bg-transparent border-0 text-gray-950 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-sm font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded text-[10px] font-mono text-gray-400 dark:text-gray-550 shadow-xs shrink-0 select-none">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          role="listbox"
          id="command-palette-listbox"
          aria-label="Search results"
          className="flex-1 overflow-y-auto p-2 space-y-0.5 max-h-[350px]"
        >
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-500">
              No results found for "
              <span className="font-semibold">{search}</span>"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  type="button"
                  key={`${item.category}-${item.id}`}
                  role="option"
                  id={`item-${item.id.replace(/[#:]/g, '-')}`}
                  aria-selected={isSelected}
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
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono tracking-wide scale-90 ${
                          item.category === 'Section'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="font-medium text-sm truncate">
                        {item.title}
                      </span>
                    </div>
                    {item.description && (
                      <p
                        className={`text-xs mt-1 truncate ${isSelected ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center">
                    {isSelected ? (
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-gray-900 dark:text-white"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-300 dark:text-gray-700"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-405 dark:text-gray-500 select-none font-sans">
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 rounded font-mono shadow-2xs text-[9px] font-bold">
                ↑↓
              </kbd>{' '}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 rounded font-mono shadow-2xs text-[9px] font-bold">
                ↵
              </kbd>{' '}
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 rounded font-mono shadow-2xs text-[9px] font-bold">
                Tab
              </kbd>{' '}
              Cycle Focus
            </span>
          </div>
          <span>
            <kbd className="px-1.5 py-0.5 border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 rounded font-mono shadow-2xs text-[9px] font-bold">
              ESC
            </kbd>{' '}
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
