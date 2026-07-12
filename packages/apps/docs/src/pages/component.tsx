import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ApiDocs } from '../components/ApiDocs';
import { componentRegistry } from './components';
import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';
import { DualCode } from '../types/docs';
import { renderMarkdownInline, renderMarkdownBlocks } from '../utils/markdown';
import { parseChangelog } from '../utils/changelog';
import { ComponentPlayground } from '../components/ComponentPlayground';

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
    <div className="mt-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/30 dark:hover:bg-gray-900/60 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer font-medium"
      >
        <span>{open ? 'Hide code' : 'Show code'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="bg-gray-900 dark:bg-gray-900/60 rounded-xl mt-3 overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-gray-800/40">
            <div className="flex items-center gap-1">
              {(['react', 'html'] as CodeTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    tab === t
                      ? 'bg-white/10 text-white'
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
  const tokens = cleaned.split(/(<\/?[a-zA-Z0-9-]+(?:\s+[^>]*?)?>)/g).filter(Boolean);
  
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
      <div ref={ref}>
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

  const { title, description, packageName, tagName, manifest, Demo, examples, usages, features } = comp;

  const [activeSection, setActiveSection] = useState<string>('');

  const tocItems = [
    { id: 'demo', label: 'Demo', show: !!Demo },
    { id: 'readme', label: 'Readme', show: !Demo && !!comp.readme },
    { id: 'api-reference', label: 'API Reference', show: !!manifest },
    { id: 'examples', label: 'Examples', show: !!(examples && examples.length > 0) },
    { id: 'usage', label: 'Usage', show: !examples && !!(usages && usages.length > 0) },
    { id: 'accessibility', label: 'Accessibility', show: !!comp.a11y },
    { id: 'features', label: 'Features', show: !!(features && features.length > 0) },
    { id: 'changelog', label: 'Changelog', show: !!comp.changelog },
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
        <Sidebar activeId={componentId} className="hidden md:block" />

        {/* Main Documentation Area */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-3xl">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <code className="inline-block bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
                npm install {packageName}
              </code>
              <a
                href={`https://github.com/rawlings/uibit/tree/main/packages/components/${componentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>View Source</span>
              </a>
              <a
                href={`https://www.npmjs.com/package/${packageName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span>npm</span>
              </a>
            </div>
          </header>

          {/* Live Demo & Playground */}
          {Demo && manifest && (
            <section id="demo" className="py-10 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Demo & Playground</h2>
              <ComponentPlayground tagName={tagName} manifest={manifest} Demo={Demo} />
            </section>
          )}

          {/* Fallback Readme */}
          {!Demo && comp.readme && (
            <section id="readme" className="py-10 scroll-mt-20 prose dark:prose-invert max-w-none">
              {renderMarkdownBlocks(comp.readme)}
            </section>
          )}

          {/* API Reference */}
          {manifest && (
            <section id="api-reference" className="py-10 scroll-mt-20">
              <ApiDocs manifest={manifest} tagName={tagName} />
            </section>
          )}

          {/* Rich examples (new format) */}
          {examples && examples.length > 0 && (
            <section id="examples" className="py-10 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Examples</h2>
              <div className="space-y-12">
                {examples.map((example, index) => (
                  <ExampleBlock key={index} example={example} />
                ))}
              </div>
            </section>
          )}

          {/* Legacy usage snippets (old format fallback) */}
          {!examples && usages && usages.length > 0 && (
            <section id="usage" className="py-10 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage</h2>
              <div className="space-y-8">
                {usages.map((usage, index) => (
                  <div key={index}>
                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
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
            <section id="accessibility" className="py-10 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Accessibility</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
                    Key Requirements
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600 dark:text-gray-350">
                    {comp.a11y.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                {comp.a11y.keyboardNav && comp.a11y.keyboardNav.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
                      Keyboard Interaction
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th className="py-2.5 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Key</th>
                            <th className="py-2.5 text-left font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4 last:pr-0">Function</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
                          {comp.a11y.keyboardNav.map((kb, index) => (
                            <tr key={index} className="bg-transparent">
                              <td className="py-3 text-left align-top text-gray-600 dark:text-gray-350 text-xs pr-4 last:pr-0">
                                <code className="font-mono text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">
                                  {kb.key}
                                </code>
                              </td>
                              <td className="py-3 text-left align-top text-gray-600 dark:text-gray-350 text-sm pr-4 last:pr-0">{kb.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Key Features */}
          {features && features.length > 0 && (
            <section id="features" className="py-10 scroll-mt-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
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

          {/* Changelog */}
          {comp.changelog && (
            <section id="changelog" className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Changelog</h2>
              <div className="relative pl-6 border-l border-gray-200 dark:border-gray-800 space-y-8 ml-4 font-sans">
                {parseChangelog(comp.changelog).map((release, rIdx) => {
                  const categoryBadgeStyles: Record<string, string> = {
                    Added: 'bg-green-50 text-green-700 border-green-200/50 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30',
                    Fixed: 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
                    Security: 'bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
                    Changed: 'bg-gray-50 text-gray-700 border-gray-200/50 dark:bg-gray-900/30 dark:text-gray-305 dark:border-gray-805/50',
                    Deprecated: 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30',
                    Other: 'bg-gray-50 text-gray-600 border-gray-150 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800'
                  };

                  return (
                    <div key={rIdx} className="relative">
                      {/* Timeline Node */}
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-gray-950 bg-gray-900 dark:bg-white" />
                      
                      <div className="flex flex-wrap items-baseline gap-3 mb-3">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">v{release.version}</h3>
                        <span className="text-xs text-gray-400 dark:text-gray-550 font-mono">{release.date}</span>
                      </div>

                      <div className="space-y-5">
                        {release.sections.map((section, sIdx) => {
                          const badgeStyle = categoryBadgeStyles[section.category] || categoryBadgeStyles.Other;
                          return (
                            <div key={sIdx} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeStyle}`}>
                                  {section.category}
                                </span>
                                {section.title.toLowerCase() !== section.category.toLowerCase() && (
                                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-405">
                                    {section.title}
                                  </span>
                                )}
                              </div>
                              <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-650 dark:text-gray-400">
                                {section.items.map((item, iIdx) => (
                                  <li key={iIdx}>
                                    {renderMarkdownInline(item)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar (Table of Contents) */}
        {tocItems.length > 0 && (
          <aside className="hidden lg:block w-48 shrink-0 pl-6 sticky top-24 self-start">
            <h2 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 mb-2.5">
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
                    className={`block text-sm transition-all duration-150 ${
                      isActive
                        ? 'text-gray-950 dark:text-white font-medium'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white'
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
