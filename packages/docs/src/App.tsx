import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ComponentDocs from './pages/component';
import StylingGuide from './pages/Styling';
import LocalizationGuide from './pages/Localization';
import IconsGuide from './pages/Icons';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('uibit-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [density, setDensity] = useState<'compact' | 'default' | 'spacious'>(() => {
    return (localStorage.getItem('uibit-density') as any) || 'default';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('uibit-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-density', density);
    localStorage.setItem('uibit-density', density);
  }, [density]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <ScrollToTop />
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-lg font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            UIBit
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Density Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Density:</span>
              <select
                value={density}
                onChange={(e) => setDensity(e.target.value as any)}
                className="text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1.5 font-medium focus:outline-none focus:border-gray-900 dark:focus:border-gray-100 cursor-pointer"
              >
                <option value="compact">Compact</option>
                <option value="default">Default</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styling" element={<StylingGuide />} />
          <Route path="/localization" element={<LocalizationGuide />} />
          <Route path="/icons" element={<IconsGuide />} />
          <Route path="/:componentId" element={<ComponentDocs />} />
          <Route
            path="*"
            element={
              <div className="max-w-7xl mx-auto px-4 py-24 text-center bg-white dark:bg-gray-950">
                <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">404</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Page not found. The page you are looking for does not exist.</p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2026 UIBit. Built with Lit and React.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

