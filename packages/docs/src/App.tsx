import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CarouselDocs from './pages/CarouselDocs';
import Viewer360Docs from './pages/Viewer360Docs';
import ScrollProgressDocs from './pages/ScrollProgressDocs';
import HotspotDocs from './pages/HotspotDocs';
import ConsentGuardDocs from './pages/ConsentGuardDocs';
import ABTestDocs from './pages/ABTestDocs';
import CountdownDocs from './pages/CountdownDocs';
import ScratchRevealDocs from './pages/ScratchRevealDocs';
import SignaturePadDocs from './pages/SignaturePadDocs';

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
          <Route path="/carousel" element={<CarouselDocs />} />
          <Route path="/viewer-360" element={<Viewer360Docs />} />
          <Route path="/scroll-progress" element={<ScrollProgressDocs />} />
          <Route path="/hotspot" element={<HotspotDocs />} />
          <Route path="/consent-guard" element={<ConsentGuardDocs />} />
          <Route path="/ab-test" element={<ABTestDocs />} />
          <Route path="/countdown" element={<CountdownDocs />} />
          <Route path="/scratch-reveal" element={<ScratchRevealDocs />} />
          <Route path="/signature-pad" element={<SignaturePadDocs />} />
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
