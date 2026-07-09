import '@uibit/scroll-progress';
import { UsageExample } from '../../../../types/docs';

function ScrollContainerDemo() {
  return (
    <div>
      <div
        id="demo-scroll-box"
        className="relative border border-gray-300 rounded-lg h-96 overflow-y-scroll bg-white shadow-inner"
        style={{ scrollbarWidth: 'thin' }}
      >
        <uibit-scroll-progress
          target="#demo-scroll-box"
          style={
            {
              '--uibit-scroll-progress-color': '#000000',
              '--uibit-scroll-progress-height': '4px',
            } as React.CSSProperties
          }
          class="sticky top-0 z-10 block"
        ></uibit-scroll-progress>

        <div className="p-6 space-y-6">
          <img
            src="https://picsum.photos/seed/nordic/720/300"
            alt="Nordic landscape"
            className="w-full rounded-lg object-cover"
            style={{ height: '180px' }}
          />

          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Technical Article
            </span>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              Designing High-Performance Web Components
            </h3>
            <p className="text-xs text-gray-500">Published on July 9, 2026 • 5 min read</p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Web Components represent a fundamental shift in how we build user interfaces. By leveraging
            browser-native technologies like Custom Elements, Shadow DOM, and ES Modules, we can create
            encapsulated, reusable UI building blocks that run efficiently without framework overhead.
          </p>

          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide pt-2">
            1. The Power of Encapsulation
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            One of the primary benefits of Web Components is the Shadow DOM. By isolating CSS and HTML
            within a shadow root, we eliminate the risk of style leakage. A component's internal
            design system remains entirely unaffected by external global CSS rules, and its private
            styles won't accidentally pollute the consumer application.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            This styling boundary is crucial for maintaining design consistency across multi-framework
            codebases. Whether the parent application is built in React, Angular, Vue, or vanilla
            JavaScript, the component renders and behaves exactly as designed.
          </p>

          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide pt-2">
            2. Performance Benefits
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Because Web Components are compiled into browser-native code, they load and execute with
            exceptional speed. Lit.js enhances this by using a tiny reactive layer that updates only
            the dynamic portions of the DOM, rather than rebuilding the entire tree.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            This results in highly responsive interfaces, optimal Core Web Vitals, and an overall
            premium feel that keeps users engaged. By avoiding bulky runtime dependencies, you keep
            bundles small and page loads fast.
          </p>

          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide pt-2">
            3. Accessibility First
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Truly great UI components are accessible to everyone. By utilizing semantic HTML tags,
            providing appropriate ARIA roles, managing focus programmatically, and ensuring keyboard
            navigability, we build inclusive user interfaces.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Scroll progress indicators, for instance, should always map to native ARIA progressbar
            rules, informing screen readers of the viewport progress dynamically without obstructing
            the visual viewport experience.
          </p>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              — End of article
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const scrollContainerExample: UsageExample = {
  title: 'Scroll Container',
  description:
    'Track scroll progress within a specific scrollable element by passing a CSS selector to the `target` attribute. Place the component as the first child of the container with `sticky top-0` so it stays pinned to the top as you scroll.',
  code: {
    html: `<div id="scrollable-block" style="height: 24rem; overflow-y: scroll; position: relative;">
  <uibit-scroll-progress
    target="#scrollable-block"
    style="--uibit-scroll-progress-color: #000000; --uibit-scroll-progress-height: 4px;"
    class="sticky top-0 z-10 block"
  ></uibit-scroll-progress>
  <div style="padding: 1.5rem;">
    <!-- scrollable content -->
  </div>
</div>`,
    react: `<div
  id="scrollable-block"
  className="relative h-96 overflow-y-scroll"
>
  <uibit-scroll-progress
    target="#scrollable-block"
    style={{
      '--uibit-scroll-progress-color': '#000000',
      '--uibit-scroll-progress-height': '4px',
    } as React.CSSProperties}
    class="sticky top-0 z-10 block"
  ></uibit-scroll-progress>
  <div className="p-6">
    {/* scrollable content */}
  </div>
</div>`,
  },
  Demo: ScrollContainerDemo,
};

export default scrollContainerExample;
