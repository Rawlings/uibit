import { Link } from 'react-router-dom';

interface NavigationDockProps {
  onOpenSearch: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  density: 'compact' | 'default' | 'spacious';
  onChangeDensity: (density: 'compact' | 'default' | 'spacious') => void;
}

export function NavigationDock({
  onOpenSearch,
  theme,
  onToggleTheme,
  density,
  onChangeDensity,
}: NavigationDockProps) {
  const densities: ('compact' | 'default' | 'spacious')[] = [
    'compact',
    'default',
    'spacious',
  ];
  const nextDensity =
    densities[(densities.indexOf(density) + 1) % densities.length];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-lg pointer-events-none">
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-800/80 shadow-xl rounded-full p-2 flex items-center justify-between gap-2 pointer-events-auto transition-all duration-300 hover:shadow-2xl">
        {/* Logo / Home Link */}
        <Link
          to="/"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-white transition-all flex items-center justify-center shrink-0"
          aria-label="Home"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="w-1 h-4 bg-gradient-to-t from-gray-900 to-gray-400 dark:from-white dark:to-gray-600 rounded-full" />
            <div className="absolute w-4 h-1 bg-gradient-to-r from-gray-950 to-gray-450 dark:from-white dark:to-gray-650 rounded-full rotate-45" />
          </div>
        </Link>

        <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />

        {/* Search trigger button (main pill) */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex-1 flex items-center justify-between gap-3 px-4 py-1.5 rounded-full bg-gray-50/50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all cursor-pointer text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search docs...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-950 rounded text-[9px] font-mono text-gray-400 dark:text-gray-500 shadow-xs">
            ⌘K
          </kbd>
        </button>

        <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Density Toggle */}
          <button
            type="button"
            onClick={() => onChangeDensity(nextDensity)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center relative group"
            aria-label={`Current density: ${density}. Click to switch to ${nextDensity}`}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 8h10" />
              <path d="M7 12h10" />
              <path d="M7 16h10" />
            </svg>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white dark:bg-white dark:text-gray-950 text-[10px] px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Density: {density}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle light/dark theme"
          >
            {theme === 'light' ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/rawlings/uibit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all flex items-center justify-center"
            aria-label="GitHub Repository"
          >
            <span className="sr-only">GitHub Repository</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
