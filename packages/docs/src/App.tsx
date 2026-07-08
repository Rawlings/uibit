import { useState } from 'react';
import Home from './pages/Home';
import CarouselDocs from './pages/CarouselDocs';

type Page = 'home' | 'carousel' | 'viewer-360' | 'scroll-progress' | 'hotspot' | 'ab-test' | 'countdown';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-700 to-primary-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold hover:opacity-90 transition-opacity"
            >
              UIBit
            </button>
            <nav className="flex gap-2 flex-wrap">
              {['home', 'carousel', 'viewer-360', 'scroll-progress', 'hotspot', 'ab-test', 'countdown'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as Page)}
                  className={`py-2 px-3 text-sm rounded transition-colors ${
                    currentPage === page
                      ? 'bg-white text-primary-700'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {page === 'home' && 'Home'}
                  {page === 'carousel' && 'Carousel'}
                  {page === 'viewer-360' && '360-Viewer'}
                  {page === 'scroll-progress' && 'Scroll Progress'}
                  {page === 'hotspot' && 'Hotspot'}
                  {page === 'ab-test' && 'A/B Test'}
                  {page === 'countdown' && 'Countdown'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        {currentPage === 'carousel' && <CarouselDocs />}
        {currentPage !== 'home' && currentPage !== 'carousel' && (
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">
              {currentPage === 'viewer-360' && '360-Viewer Component'}
              {currentPage === 'scroll-progress' && 'Scroll-Progress Component'}
              {currentPage === 'hotspot' && 'Hotspot Component'}
              {currentPage === 'ab-test' && 'A/B Test Component'}
              {currentPage === 'countdown' && 'Countdown Component'}
            </h1>
            <p className="text-gray-600 mb-6">
              Coming soon. Documentation and live demos for this component are being prepared.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <p className="text-sm text-gray-700">
                In the meantime, check the component's README in the repository:
              </p>
              <code className="block bg-white p-3 rounded mt-3 text-sm font-mono">
                packages/uibit-{currentPage === 'viewer-360' ? '360-viewer' : currentPage === 'ab-test' ? 'ab-test' : currentPage}/README.md
              </code>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 UIBit. Built with{' '}
            <a
              href="https://lit.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Lit
            </a>
            {' '}and{' '}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              React
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
