import { Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import { CommandPalette } from './components/CommandPalette';
import { NavigationDock } from './components/NavigationDock';
import { TOOLING } from './config/navigation';

const Home = lazy(() => import('./pages/Home'));
const Components = lazy(() => import('./pages/ComponentGallery'));
const Tooling = lazy(() => import('./pages/Tooling'));
const ComponentDocs = lazy(() => import('./pages/component'));
const MarkdownPage = lazy(() => import('./pages/MarkdownPage'));
const ToolingDocs = lazy(() => import('./pages/ToolingDocs'));

function renderLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group transition-opacity hover:opacity-90"
    >
      {/* Cyber Helix Logo Mark (Style 9) */}
      <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
        <div className="w-2 h-6 bg-gradient-to-t from-gray-900 to-gray-400 dark:from-white dark:to-gray-600 rounded-full" />
        <div className="absolute w-6 h-2 bg-gradient-to-r from-gray-950 to-gray-440 dark:from-white dark:to-gray-650 rounded-full rotate-45 animate-pulse" />
      </div>
      {/* Mix of 7 & 17 Text Style (0xuibit) */}
      <span className="text-base font-mono text-gray-900 dark:text-white tracking-tight">
        uibit
      </span>
    </Link>
  );
}

function LegacyPackageRedirect() {
  const { packageId } = useParams<{ packageId: string }>();
  return <Navigate to={`/tooling/${packageId}`} replace />;
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSearchOpen(false);
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

  // Global keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/') {
        const active = document.activeElement;
        if (
          active &&
          (active.tagName === 'INPUT' ||
            active.tagName === 'TEXTAREA' ||
            active.getAttribute('contenteditable') === 'true')
        ) {
          return;
        }
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 relative">
      <ScrollToTop />
      {/* Header */}
      <header className="relative z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            {renderLogo()}

            {/* Primary nav */}
            <nav className="hidden sm:flex items-center gap-1">
              {[
                { to: '/components', label: 'Components' },
                { to: '/tooling', label: 'Tooling' },
              ].map(({ to, label }) => {
                const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-900'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all cursor-pointer flex items-center gap-2 text-sm"
            aria-label="Open search dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-80">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="hidden sm:inline text-xs font-semibold px-1.5 py-0.5 border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded text-gray-400 dark:text-gray-500">⌘K</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent dark:border-white rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages/frameworks" element={<Navigate to="/foundations/frameworks" replace />} />
            <Route path="/foundations/:pageId" element={<MarkdownPage />} />
            <Route path="/resources/:pageId" element={<MarkdownPage />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/:componentId" element={<ComponentDocs />} />
            <Route path="/tooling" element={<Tooling />} />
            <Route path="/tooling/:packageId" element={<ToolingDocs />} />
            <Route path="/packages/:packageId" element={<LegacyPackageRedirect />} />
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
        </Suspense>
      </main>

      {/* Navigation Dock */}
      <NavigationDock
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        density={density}
        onChangeDensity={setDensity}
      />

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-24 bg-gray-50/10 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
            {/* Branding */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="text-base font-bold text-gray-900 dark:text-white">
                UIBit
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                Accessible, lightweight, and framework-agnostic web components built with Lit — and the tooling used
                to build them. Elevate your interface experience with native performance.
              </p>
            </div>

            {/* Components */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500">Components</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/components" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    All Components
                  </Link>
                </li>
                <li>
                  <Link to="/foundations/getting-started" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Installation & Setup
                  </Link>
                </li>
                <li>
                  <Link to="/foundations/accessibility" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link to="/foundations/styling" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Styling & Theming
                  </Link>
                </li>
                <li>
                  <Link to="/foundations/localization" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Localization
                  </Link>
                </li>
                <li>
                  <Link to="/foundations/frameworks" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Framework Integrations
                  </Link>
                </li>
                <li>
                  <Link to="/foundations/browser-support" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Browser Support
                  </Link>
                </li>
                <li>
                  <Link to="/foundations/troubleshooting" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Troubleshooting & FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tooling */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500">Tooling</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/tooling" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    All Tooling
                  </Link>
                </li>
                {TOOLING.map((item) => (
                  <li key={item.id}>
                    <Link to={item.to} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/resources/contributing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Contributing
                  </Link>
                </li>
                <li>
                  <Link to="/resources/security" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link to="/resources/coc" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Code of Conduct
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-400 dark:text-gray-500">Project</h4>
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
                  <a
                    href="https://www.npmjs.com/org/uibit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    npm Registry
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
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
