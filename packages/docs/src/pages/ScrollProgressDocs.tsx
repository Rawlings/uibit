import { Link } from 'react-router-dom';
import '@uibit/scroll-progress';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/scroll-progress/custom-elements.json';

function ScrollProgressDocs() {

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Scroll Progress</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Scroll Progress
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          Lightweight, accessible scroll progress indicator. Tracks viewport scrolling by default, or can be targeting a specific scrollable element using selectors.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/scroll-progress
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Scroll inside the container below to see the local progress bar update at the top of the box:</p>
          
          <div 
            id="demo-scroll-box" 
            className="relative border border-gray-300 rounded-lg h-60 overflow-y-scroll bg-white shadow-inner"
            style={{ scrollbarWidth: 'thin' }}
          >
            {/* Scroll Progress Component anchored inside this container */}
            <uibit-scroll-progress 
              target="#demo-scroll-box" 
              style={{
                '--uibit-scroll-progress-color': '#000000',
                '--uibit-scroll-progress-height': '4px',
              } as React.CSSProperties}
              class="sticky top-0 z-10 block"
            ></uibit-scroll-progress>
            
            <div className="p-6 space-y-4">
              <img src="https://picsum.photos/seed/nordic/720/300" alt="Nordic landscape" className="w-full rounded-lg object-cover" style={{ height: '160px' }} />
              <h3 className="text-base font-semibold text-gray-900">Designing for the Long Read</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reading progress indicators reduce uncertainty for long-form content — users know how far they've come and how much remains. A well-placed progress bar can meaningfully reduce drop-off rates on editorial pages and documentation.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                The key is restraint: the bar should be visible without demanding attention. A 3–4px height, neutral color, and fixed position at the top of the container or viewport tends to work across most layouts.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                When targeting a scrollable container rather than the full window, the component tracks scroll position relative to that element's scrollable height — useful for sidebars, modals, or card-based reading views.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pair it with a sticky table of contents or section anchors for a complete reading experience that respects users' time and orientation.
              </p>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-2">— End of article</p>
            </div>
          </div>
        </div>
      </section>

      <ApiDocs manifest={manifest as any} tagName="uibit-scroll-progress" />
      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic Window Scrolling</h3>
            <pre className="code-block"><code>{`<uibit-scroll-progress style="--uibit-scroll-progress-color: #000000; --uibit-scroll-progress-height: 5px;"></uibit-scroll-progress>`}</code></pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Custom Element Container Scrolling</h3>
            <pre className="code-block"><code>{`<!-- HTML container with overflow-y -->
<div id="scrollable-block" style="height: 300px; overflow-y: scroll; position: relative;">
  <uibit-scroll-progress 
    target="#scrollable-block" 
    style="--uibit-scroll-progress-color: #000000;"
  ></uibit-scroll-progress>
  <div style="height: 1000px;">
    Lots of scrollable content...
  </div>
</div>`}</code></pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Tracks standard window viewport scrolling by default',
            'Fully supports tracking custom scroll containers via CSS selectors',
            'Correctly handles component attachment/removal, preventing scroll listener leaks',
            'GPU-accelerated reactive layout renders',
            'Full progressbar ARIA semantics for screen readers',
            'Supports dynamic customization using CSS custom properties'
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gray-900 font-semibold mt-0.5">—</span>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ScrollProgressDocs;
