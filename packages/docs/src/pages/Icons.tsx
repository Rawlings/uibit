import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

const ICONS = [
  { name: 'chevron-left', label: 'Chevron Left' },
  { name: 'chevron-right', label: 'Chevron Right' },
  { name: 'x', label: 'X (Close)' },
  { name: 'plus', label: 'Plus' },
  { name: 'move', label: 'Move' },
  { name: 'eraser', label: 'Eraser' },
  { name: 'rotate-ccw', label: 'Rotate CCW' },
  { name: 'angry', label: 'Angry' },
  { name: 'frown', label: 'Frown' },
  { name: 'meh', label: 'Meh' },
  { name: 'smile', label: 'Smile' },
  { name: 'laugh', label: 'Laugh' },
];

function IconPreview({ name }: { name: string }) {
  const svgMap: Record<string, string> = {
    'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
    'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'move': '<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>',
    'eraser': '<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'angry': '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><path d="M7.5 8 10 9"/><path d="m14 9 2.5-1"/><path d="M9 10h0"/><path d="M15 10h0"/>',
    'frown': '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    'meh': '<circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    'smile': '<circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
    'laugh': '<circle cx="12" cy="12" r="10"/><path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svgMap[name] ?? '' }} />
  );
}

export default function IconsGuide() {
  const [copied, setCopied] = useState<string | null>(null);

  useHead({
    title: 'Icons – UIBit',
    description: 'Built-in icons included with UIBit, powered by Lucide, with support for custom icon registration.',
  });

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="icons" className="hidden md:block" />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Icons
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl">
              UIBit ships a small set of built-in icons from <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-900 dark:hover:text-white transition-colors">Lucide</a> used internally by components. You can override any of these or add new ones using <code>registerIcons</code> from <code>@uibit/core</code>.
            </p>
          </header>

          {/* Built-in icons */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Built-in Icons</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Click any icon name to copy it to your clipboard.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {ICONS.map(({ name, label }) => (
                <button
                  key={name}
                  onClick={() => copyToClipboard(name, name)}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-all cursor-pointer group text-left"
                  title={`Copy "${name}"`}
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    <IconPreview name={name} />
                  </span>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors leading-snug text-center break-all">
                    {copied === name ? <span className="text-gray-900 dark:text-white font-semibold">Copied!</span> : name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Custom icons */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Custom Icons</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Call <code>registerIcons</code> once at application startup to override built-in icons or add your own. Each value is either a raw SVG string or a function that receives a <code>size</code> number and returns an SVG string.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Static SVG string</h3>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`import { registerIcons } from '@uibit/core';

registerIcons({
  'chevron-left': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
});`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Size-aware function</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  Use a function when the icon should scale to match the component's requested size.
                </p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`import { registerIcons } from '@uibit/core';

registerIcons({
  'x': (size) =>
    \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>\`,
});`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Using with Lucide</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  If your project already uses Lucide, you can easily register additional icons from it using the built-in <code>fromLucide</code> helper.
                </p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`import { registerIcons, fromLucide } from '@uibit/core';
import { Star, Heart } from 'lucide';

registerIcons({
  'star': fromLucide(Star),
  'heart': fromLucide(Heart),
});`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Using with FontAwesome</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  To register FontAwesome icons, you can extract the SVG path data from FontAwesome's SVG package (e.g. <code>@fortawesome/free-solid-svg-icons</code>) and return an SVG string.
                </p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`import { registerIcons } from '@uibit/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

registerIcons({
  'star': (size) => {
    const [width, height, , , pathData] = faStar.icon;
    return \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${width} \${height}" width="\${size}" height="\${size}" fill="currentColor">
      <path d="\${pathData}" />
    </svg>\`;
  }
});`}</code>
                </pre>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-3 leading-relaxed">
                  Alternatively, if you load the FontAwesome webfont stylesheet, you can register a function that returns an icon element with FontAwesome classes:
                </p>
                <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                  <code>{`import { registerIcons } from '@uibit/core';

registerIcons({
  'star': (size) => \`<i class="fa-solid fa-star" style="font-size: \${size}px; line-height: 1;"></i>\`,
});`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* API */}
          <section className="py-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="py-2 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Export</th>
                    <th className="py-2 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Signature</th>
                    <th className="py-2 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr className="bg-transparent">
                    <td className="py-3 font-mono text-xs text-gray-700 dark:text-gray-300 align-top pr-4 last:pr-0">registerIcons</td>
                    <td className="py-3 font-mono text-xs text-gray-650 dark:text-gray-400 align-top whitespace-nowrap pr-4 last:pr-0">(icons: Record&lt;string, IconDefinition&gt;) =&gt; void</td>
                    <td className="py-3 text-gray-600 dark:text-gray-350 text-sm align-top pr-4 last:pr-0">Registers one or more icons by name. Call once before components mount. Overrides existing entries.</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="py-3 font-mono text-xs text-gray-700 dark:text-gray-300 align-top pr-4 last:pr-0">getIcon</td>
                    <td className="py-3 font-mono text-xs text-gray-650 dark:text-gray-400 align-top whitespace-nowrap pr-4 last:pr-0">(name: string, size?: number) =&gt; TemplateResult | string</td>
                    <td className="py-3 text-gray-600 dark:text-gray-350 text-sm align-top pr-4 last:pr-0">Returns a Lit <code>unsafeHTML</code> template result for use in Lit components. Falls back to built-in Lucide set, then an empty string.</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="py-3 font-mono text-xs text-gray-700 dark:text-gray-300 align-top pr-4 last:pr-0">IconDefinition</td>
                    <td className="py-3 font-mono text-xs text-gray-650 dark:text-gray-400 align-top whitespace-nowrap pr-4 last:pr-0">string | ((size: number) =&gt; string)</td>
                    <td className="py-3 text-gray-600 dark:text-gray-350 text-sm align-top pr-4 last:pr-0">An icon is either a static SVG string or a size-aware factory function.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
