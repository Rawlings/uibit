import type React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import type { CemManifest, CemMember } from '../types/docs';

interface ComponentPlaygroundProps {
  tagName: string;
  manifest: CemManifest;
  Demo: React.ComponentType;
}

export function ComponentPlayground({
  tagName,
  manifest,
  Demo,
}: ComponentPlaygroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [controls, setControls] = useState<Record<string, any>>({});
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get all configurable fields with associated attributes
  const configurableAttrs: CemMember[] = useMemo(() => {
    // Find declaration for this tag in CEM
    let declaration: any = null;
    for (const mod of manifest.modules) {
      for (const decl of mod.declarations ?? []) {
        if (decl.tagName === tagName) {
          declaration = decl;
          break;
        }
      }
      if (declaration) break;
    }

    return (declaration?.members ?? []).filter(
      (m: any) =>
        m.kind === 'field' &&
        m.attribute &&
        m.privacy !== 'private' &&
        m.privacy !== 'protected',
    );
  }, [manifest, tagName]);

  // Initialize controls state from the rendered DOM element's attributes/properties if available, falling back to CEM defaults
  useEffect(() => {
    const initial: Record<string, any> = {};
    const customElement = wrapperRef.current?.querySelector(tagName) as any;

    configurableAttrs.forEach((attr) => {
      const name = attr.attribute!;
      const isBool =
        attr.type?.text?.includes('boolean') ||
        attr.default === 'true' ||
        attr.default === 'false';
      const isNum =
        attr.type?.text?.includes('number') ||
        !Number.isNaN(Number(attr.default));

      let initialVal: any;
      if (customElement) {
        const propVal = customElement[name];
        const attrVal = customElement.getAttribute(name);

        if (
          propVal !== undefined &&
          propVal !== null &&
          typeof propVal === 'object'
        ) {
          initialVal = propVal;
        } else if (customElement.hasAttribute(name)) {
          initialVal = attrVal;
          if (
            typeof initialVal === 'string' &&
            initialVal.includes('[object Object]') &&
            propVal !== undefined &&
            propVal !== null
          ) {
            initialVal = propVal;
          }
        } else if (propVal !== undefined && propVal !== null) {
          initialVal = propVal;
        }
      }

      if (initialVal !== undefined && initialVal !== null) {
        if (isBool) {
          initial[name] = initialVal === 'true' || initialVal === true;
        } else if (isNum) {
          initial[name] = Number(initialVal);
        } else {
          initial[name] =
            typeof initialVal === 'object'
              ? JSON.stringify(initialVal)
              : String(initialVal);
        }
      } else {
        if (isBool) {
          initial[name] = attr.default === 'true';
        } else if (isNum) {
          initial[name] = attr.default !== undefined ? Number(attr.default) : 0;
        } else {
          initial[name] = attr.default ? attr.default.replace(/['"]/g, '') : '';
        }
      }
    });
    setControls(initial);
  }, [tagName, configurableAttrs]);

  // Synchronize controls state with the custom element in the DOM
  useEffect(() => {
    const customElement = wrapperRef.current?.querySelector(tagName);
    if (!customElement) return;

    Object.entries(controls).forEach(([name, value]) => {
      if (value === true) {
        customElement.setAttribute(name, 'true');
      } else if (value === false) {
        customElement.removeAttribute(name);
      } else if (value !== undefined && value !== '') {
        const isObject =
          typeof (customElement as any)[name] === 'object' ||
          String(value).trim().startsWith('[') ||
          String(value).trim().startsWith('{');

        if (isObject) {
          try {
            (customElement as any)[name] = JSON.parse(String(value));
            customElement.setAttribute(name, String(value));
          } catch {
            customElement.setAttribute(name, String(value));
          }
        } else {
          customElement.setAttribute(name, String(value));
        }
      } else {
        customElement.removeAttribute(name);
      }
    });

    // Generate HTML markup preview
    let attrsString = '';
    Object.entries(controls).forEach(([name, value]) => {
      if (value === true) {
        attrsString += ` ${name}`;
      } else if (value !== false && value !== undefined && value !== '') {
        attrsString += ` ${name}="${value}"`;
      }
    });

    const inner = customElement.innerHTML
      .split('\n')
      .map((line) => `  ${line.trim()}`)
      .filter((line) => line.trim())
      .join('\n');

    if (inner) {
      setGeneratedHtml(`<${tagName}${attrsString}>\n${inner}\n</${tagName}>`);
    } else {
      setGeneratedHtml(`<${tagName}${attrsString}></${tagName}>`);
    }
  }, [controls, tagName]);

  const handleToggle = (name: string) => {
    setControls((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleNumberChange = (name: string, val: string) => {
    setControls((prev) => ({ ...prev, [name]: val === '' ? '' : Number(val) }));
  };

  const handleTextChange = (name: string, val: string) => {
    setControls((prev) => ({ ...prev, [name]: val }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Centered preview block - no borders or backgrounds */}
      <div ref={wrapperRef} className="py-8 flex items-center justify-center">
        <Demo />
      </div>

      {/* Toggle buttons for Interactive Controls and HTML code */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        {configurableAttrs.length > 0 && (
          <button
            type="button"
            onClick={() => setShowControls(!showControls)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/30 dark:hover:bg-gray-900/60 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer font-medium"
          >
            <span>
              {showControls
                ? 'Hide Interactive Controls'
                : 'Show Interactive Controls'}
            </span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-150 ${showControls ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/30 dark:hover:bg-gray-900/60 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer font-medium"
        >
          <span>{showCode ? 'Hide HTML code' : 'Show HTML code'}</span>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-150 ${showCode ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Controls table below the preview */}
      {configurableAttrs.length > 0 && showControls && (
        <div className="pt-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-550 mb-3.5 block">
            Interactive Controls
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-0 py-2.5 font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4">
                    Attribute
                  </th>
                  <th className="px-0 py-2.5 font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4">
                    Description
                  </th>
                  <th className="px-0 py-2.5 font-semibold text-gray-400 dark:text-gray-500 text-xs pr-4">
                    Type
                  </th>
                  <th className="px-0 py-2.5 font-semibold text-gray-400 dark:text-gray-500 text-xs text-right last:pr-0">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
                {configurableAttrs.map((attr) => {
                  const name = attr.attribute!;
                  const isBool =
                    attr.type?.text?.includes('boolean') ||
                    attr.default === 'true' ||
                    attr.default === 'false';
                  const isNum =
                    attr.type?.text?.includes('number') ||
                    !Number.isNaN(Number(attr.default));
                  const value = controls[name];

                  return (
                    <tr key={name} className="bg-transparent">
                      {/* Name */}
                      <td className="px-0 py-3 pr-4 align-top">
                        <code className="font-mono text-xs bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">
                          {name}
                        </code>
                      </td>
                      {/* Description */}
                      <td className="px-0 py-3 text-gray-650 dark:text-gray-400 text-sm pr-4 max-w-sm align-top leading-relaxed">
                        {attr.description ?? (
                          <span className="text-gray-300 dark:text-gray-700">
                            —
                          </span>
                        )}
                      </td>
                      {/* Type */}
                      <td className="px-0 py-3 pr-4 align-top">
                        <code className="font-mono text-[10px] bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-450">
                          {attr.type?.text || 'string'}
                        </code>
                      </td>
                      {/* Control input aligned to the right */}
                      <td className="px-0 py-3 text-right align-top last:pr-0">
                        {isBool ? (
                          <input
                            type="checkbox"
                            checked={!!value}
                            onChange={() => handleToggle(name)}
                            className="w-4 h-4 text-gray-900 bg-transparent border-gray-300 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          />
                        ) : isNum ? (
                          <input
                            type="number"
                            value={value ?? ''}
                            onChange={(e) =>
                              handleNumberChange(name, e.target.value)
                            }
                            className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-800 bg-transparent text-gray-800 dark:text-gray-250 focus:outline-none focus:border-gray-400 dark:focus:border-gray-650 transition-colors font-mono text-right w-24"
                          />
                        ) : (
                          <input
                            type="text"
                            value={value ?? ''}
                            onChange={(e) =>
                              handleTextChange(name, e.target.value)
                            }
                            className="px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-800 bg-transparent text-gray-800 dark:text-gray-250 focus:outline-none focus:border-gray-400 dark:focus:border-gray-650 transition-colors font-mono text-right w-32"
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HTML code view toggle */}
      {showCode && (
        <div className="bg-gray-900 dark:bg-gray-900/60 rounded-xl mt-3 overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-3 pb-1 border-b border-gray-800/40">
            <span className="text-xs font-semibold text-gray-400">
              HTML Code
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-green-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="code-block text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed !bg-transparent !rounded-none">
            <code>{generatedHtml}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
