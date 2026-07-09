import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ComponentDocs from './pages/component';
import StylingGuide from './pages/Styling';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 sm:py-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            UIBit
          </Link>
          <Link
            to="/styling"
            className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors"
          >
            Styling & Theming
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styling" element={<StylingGuide />} />
          <Route path="/:componentId" element={<ComponentDocs />} />
          <Route
            path="*"
            element={
              <div className="max-w-6xl mx-auto px-4 py-24 text-center bg-white">
                <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">404</h1>
                <p className="text-gray-600 mb-8 text-lg">Page not found. The page you are looking for does not exist.</p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 UIBit. Built with Lit and React.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
