import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function BrowserSupport() {
  useHead({
    title: 'Browser Support – UIBit',
    description: 'Reference detailing supported browser versions and graceful degradation strategies.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="browser-support" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Browser Support
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              UIBit targets modern browsers and relies on widespread web standards like Custom Elements, Shadow DOM, and modern CSS layout features.
            </p>
          </header>

          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Supported Environments</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-800">Browser</th>
                    <th className="px-6 py-4 font-semibold border-b border-gray-200 dark:border-gray-800">Minimum Version</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 font-medium">Chrome / Edge</td>
                    <td className="px-6 py-4">90+</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Firefox</td>
                    <td className="px-6 py-4">90+</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Safari (macOS/iOS)</td>
                    <td className="px-6 py-4">15+</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Opera</td>
                    <td className="px-6 py-4">80+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Graceful Degradation</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Some components utilize advanced CSS features (like Scroll-Driven Animations or <code className="text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded">@property</code>). When these are unsupported:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Visual effects may fall back to simpler CSS transitions or static states.</li>
              <li>Core functionality and accessibility remain intact.</li>
              <li>No JavaScript polyfills are required or loaded automatically.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
