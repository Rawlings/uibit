import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ComponentDocs from './pages/component';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 sm:py-6">
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            UIBit
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:componentId" element={<ComponentDocs />} />
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
