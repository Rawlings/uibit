import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ApiDocs } from '../components/ApiDocs';
import { Sidebar } from '../components/Sidebar';
import { componentRegistry } from './components';
import { useHead } from '../hooks/useHead';
import { DualCode } from '../types/docs';

type CodeTab = 'html' | 'react';

function CodePanel({ code }: { code: DualCode }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<CodeTab>('react');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-b-lg overflow-hidden -mt-px transition-colors duration-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900 transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
      >
        <span className="font-medium">{open ? 'Hide code' : 'Show code'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="bg-gray-900 relative group">
          <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-gray-800/60">
            <div className="flex items-center gap-1">
              {(['react', 'html'] as CodeTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    tab === t
                      ? 'bg-white/15 text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {t === 'html' ? 'HTML' : 'React'}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-green-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed !bg-transparent !rounded-none">
            <code>{code[tab]}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

function formatHTML(html: string): string {
  let cleaned = html.replace(/<!--.*?-->/g, '').trim();
  let result = '';
  let indent = 0;
  const tokens = cleaned.split(/(<\/?[a-zA-Z0-9\-]+(?:\s+[^>]*?)?>)/g).filter(Boolean);
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    if (!token) continue;
    
    if (token.startsWith('</')) {
      indent--;
      result += '\n' + '  '.repeat(Math.max(0, indent)) + token;
    } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<!') && !token.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/)) {
      result += '\n' + '  '.repeat(Math.max(0, indent)) + token;
      indent++;
    } else {
      result += '\n' + '  '.repeat(Math.max(0, indent)) + token;
    }
  }
  
  return result.trim();
}

function ExampleBlock({ example }: { example: any }) {
  const [htmlCode, setHtmlCode] = useState(example.code?.html || '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setHtmlCode(formatHTML(ref.current.innerHTML));
    }
  }, [example.Demo]);

  const code = {
    html: htmlCode || example.code?.html || '',
    react: example.code?.react || ''
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{example.title}</h3>
      {example.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{example.description}</p>
      )}
      <div ref={ref} className="bg-white dark:bg-gray-950 rounded-t-lg p-6 border border-gray-200 dark:border-gray-800 border-b-0">
        <example.Demo />
      </div>
      <CodePanel code={code} />
    </div>
  );
}

export default function ComponentDocs() {
  const { componentId } = useParams<{ componentId: string }>();
  const comp = componentId ? componentRegistry[componentId] : undefined;

  useHead({
    title: comp ? `${comp.title} – UIBit` : 'UIBit – Web Components Library',
    description: comp
      ? comp.description
      : 'A collection of accessible, production-ready web components built with Lit.js.',
  });

  if (!componentId || !comp) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Component Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested component documentation does not exist.</p>
        <Link to="/" className="text-gray-900 dark:text-white underline font-medium hover:text-gray-600 dark:hover:text-gray-300">
          Return Home
        </Link>
      </div>
    );
  }

  const { title, description, packageName, tagName, manifest, Demo, demoCode, examples, usages, features } = comp;

  const [activeSection, setActiveSection] = useState<string>('');

  const tocItems = [
    { id: 'demo', label: 'Demo', show: !!Demo },
    { id: 'api-reference', label: 'API Reference', show: !!manifest },
    { id: 'examples', label: 'Examples', show: !!(examples && examples.length > 0) },
    { id: 'usage', label: 'Usage', show: !examples && !!(usages && usages.length > 0) },
    { id: 'accessibility', label: 'Accessibility', show: !!comp.a11y },
    { id: 'features', label: 'Features', show: !!(features && features.length > 0) },
  ].filter(item => item.show);

  useEffect(() => {
    const sections = tocItems.map(item => item.id);
    const elements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const closest = visibleEntries.reduce((prev, curr) => {
            return Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev;
          });
          setActiveSection(closest.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [componentId, tocItems.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId={componentId} />

        {/* Main Documentation Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium">{title}</span>
            </p>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-450 mb-6 leading-relaxed max-w-3xl">
              {description}
            </p>
            <div className="flex items-center gap-4">
              <code className="inline-block bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
                npm install {packageName}
              </code>
              <code className="text-sm font-mono text-gray-400 dark:text-gray-500">
                {'<'}{tagName}{'>'}
              </code>
            </div>
          </header>

          {/* Live Demo */}
          <section id="demo" className="mb-12 scroll-mt-20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo</h2>
            <div className={`bg-white dark:bg-gray-950 p-6 border border-gray-200 dark:border-gray-800 ${demoCode ? 'rounded-t-lg' : 'rounded-lg mb-4'}`}>
              <Demo />
            </div>
            {demoCode && <CodePanel code={demoCode} />}
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mb-12 scroll-mt-20">
            <ApiDocs manifest={manifest} tagName={tagName} />
          </section>

          {/* Rich examples (new format) */}
          {examples && examples.length > 0 && (
            <section id="examples" className="mb-12 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">Examples</h2>
              <div className="space-y-12">
                {examples.map((example, index) => (
                  <ExampleBlock key={index} example={example} />
                ))}
              </div>
            </section>
          )}

          {/* Legacy usage snippets (old format fallback) */}
          {!examples && usages && usages.length > 0 && (
            <section id="usage" className="mb-12 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage</h2>
              <div className="space-y-8">
                {usages.map((usage, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                      {usage.title}
                    </h3>
                    {usage.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-450 mb-3">{usage.description}</p>
                    )}
                    <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                      <code>{usage.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accessibility (A11y) Guide */}
          {comp.a11y && (
            <section id="accessibility" className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accessibility & WCAG Compliance</h2>
              <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black rounded text-xs font-bold uppercase tracking-wider">
                    WCAG {comp.a11y.wcagLevel} Compliance
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-750 dark:text-gray-300 mb-5">
                  {comp.a11y.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                {comp.a11y.keyboardNav && comp.a11y.keyboardNav.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Keyboard Interaction:</h3>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden bg-white dark:bg-gray-950">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400">Key</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400">Function</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          {comp.a11y.keyboardNav.map((kb, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 font-mono text-xs font-bold text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-900/20">{kb.key}</td>
                              <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{kb.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {/* Key Features */}
          {features && features.length > 0 && (
            <section id="features" className="mb-12 border-t border-gray-200 dark:border-gray-800 pt-8 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gray-900 dark:text-white font-semibold mt-0.5">—</span>
                    <span className="text-gray-750 dark:text-gray-350 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar (Table of Contents) */}
        {tocItems.length > 0 && (
          <aside className="hidden lg:block w-48 shrink-0 pl-6 border-l border-gray-200 dark:border-gray-800 sticky top-24 self-start">
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              On this page
            </h2>
            <nav className="space-y-2">
              {tocItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block text-sm font-medium transition-all ${
                      isActive
                        ? 'text-gray-950 dark:text-white font-semibold border-l-2 border-gray-900 dark:border-white pl-2 -ml-2'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
