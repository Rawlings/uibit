import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ComponentDocs from './pages/component';
import StylingGuide from './pages/Styling';
import LocalizationGuide from './pages/Localization';
import IconsGuide from './pages/Icons';
import FoundationsGuide from './pages/Foundations';
import ScrollToTop from './components/ScrollToTop';
import { Sidebar } from './components/Sidebar';

function renderLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group transition-opacity hover:opacity-90"
    >
      {/* Cyber Helix Logo Mark (Style 9) */}
      <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
        <div className="w-2 h-6 bg-gradient-to-t from-gray-900 to-gray-400 dark:from-white dark:to-gray-600 rounded-full" />
        <div className="absolute w-6 h-2 bg-gradient-to-r from-gray-950 to-gray-450 dark:from-white dark:to-gray-650 rounded-full rotate-45 animate-pulse" />
      </div>
      {/* Mix of 7 & 17 Text Style (0xuibit) */}
      <span className="text-base font-mono text-gray-900 dark:text-white tracking-tight">
        uibit
      </span>
    </Link>
  );
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('uibit-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [density, setDensity] = useState<'compact' | 'default' | 'spacious'>(() => {
    return (localStorage.getItem('uibit-density') as any) || 'default';
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
      <header className="sticky top-0 z-50 transition-colors duration-200">
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md -z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {renderLogo()}

          {/* Sidebar toggle button (right-aligned) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-655 dark:text-gray-450 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu">
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Navigation Drawer (all viewports) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar container */}
          <div className="relative flex-1 flex flex-col max-w-[280px] w-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-6 shadow-2xl transition-transform duration-300 ease-in-out">
            <div className="flex-1 overflow-y-auto">
              <Sidebar />
            </div>

            {/* Density, Appearance & GitHub section */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-5 mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Density</span>
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

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-900/50 pt-4">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">App Controls</span>
                <div className="flex items-center gap-1.5">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-250 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
                    aria-label="Toggle theme"
                  >
                    {theme === 'light' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                    )}
                  </button>
                  {/* GitHub Link */}
                  <a
                    href="https://github.com/rawlings/uibit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-250 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
                    aria-label="GitHub Repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styling" element={<StylingGuide />} />
          <Route path="/localization" element={<LocalizationGuide />} />
          <Route path="/icons" element={<IconsGuide />} />
          <Route path="/foundations" element={<FoundationsGuide />} />
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
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-24 bg-gray-50/10 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Branding */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="text-base font-bold text-gray-900 dark:text-white">
                UIBit
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                Accessible, lightweight, and framework-agnostic web components built with Lit. Elevate your interface experience with native performance.
              </p>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Guides</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/styling" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Styling
                  </Link>
                </li>
                <li>
                  <Link to="/localization" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Localization
                  </Link>
                </li>
                <li>
                  <Link to="/icons" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Icons
                  </Link>
                </li>
                <li>
                  <Link to="/foundations" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Framework Integrations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/rawlings/uibit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    MIT License
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © 2026 UIBit. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Built with Lit and React.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
