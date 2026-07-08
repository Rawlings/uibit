import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '@uibit/consent-guard';

function ConsentGuardDocs() {
  const guardRef1 = useRef<any>(null);
  const guardRef2 = useRef<any>(null);

  useEffect(() => {
    const handleAccepted = (e: any) => {
      console.log('Consent accepted for:', e.detail.title);
    };

    const handleDeclined = (e: any) => {
      console.log('Consent declined for:', e.detail.title);
    };

    const guard1 = guardRef1.current;
    const guard2 = guardRef2.current;

    if (guard1) {
      guard1.addEventListener('consent-accepted', handleAccepted);
      guard1.addEventListener('consent-declined', handleDeclined);
    }

    if (guard2) {
      guard2.addEventListener('consent-accepted', handleAccepted);
      guard2.addEventListener('consent-declined', handleDeclined);
    }

    return () => {
      if (guard1) {
        guard1.removeEventListener('consent-accepted', handleAccepted);
        guard1.removeEventListener('consent-declined', handleDeclined);
      }
      if (guard2) {
        guard2.removeEventListener('consent-accepted', handleAccepted);
        guard2.removeEventListener('consent-declined', handleDeclined);
      }
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Consent Guard</span>
        </p>
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
          Consent Guard
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-3xl">
          Asset-level consent wrapper for privacy-invasive third-party scripts and iframes. Instead of a generic cookie banner, wrap specific heavy assets with a clean placeholder and only load them after explicit user consent.
        </p>
        <code className="inline-block bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-700">
          pnpm add @uibit/consent-guard
        </code>
      </section>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo</h2>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <div className="space-y-12">
            {/* Iframe Example */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Iframe Example</h3>
              <p className="text-sm text-gray-600 mb-4">
                This example shows a consent guard wrapping an external iframe. Click "Accept Cookies" to load the content.
              </p>
              <uibit-consent-guard
                ref={guardRef1}
                title="External Embed"
                description="This iframe requires your consent to load third-party content."
                src="https://www.youtube.com/embed/jNQXAC9IVRw"
                content-type="iframe"
                height="380"
              ></uibit-consent-guard>
            </div>

            {/* Script Example with Custom Placeholder */}
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Script Placeholder</h3>
              <p className="text-sm text-gray-600 mb-4">
                This example demonstrates a script-based consent guard with a custom placeholder image.
              </p>
              <uibit-consent-guard
                ref={guardRef2}
                title="Analytics Script"
                description="Enable analytics to help us understand how you use our service."
                src="https://cdn.example.com/analytics.js"
                content-type="script"
                placeholder-image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop"
                accept-label="Accept & Load"
                decline-label="Decline"
              ></uibit-consent-guard>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">API</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Properties</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Property</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Default</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: 'title', type: 'string', default: '"Third-party Content"', desc: 'Title displayed in the placeholder' },
                    { prop: 'description', type: 'string', default: '"This content requires your consent..."', desc: 'Description text in the placeholder' },
                    { prop: 'placeholderImage', type: 'string', default: 'undefined', desc: 'Optional custom image URL for the placeholder' },
                    { prop: 'src', type: 'string', default: 'undefined', desc: 'Source URL for the iframe or script' },
                    { prop: 'contentType', type: '"iframe" | "script"', default: '"iframe"', desc: 'Type of content to load' },
                    { prop: 'height', type: 'number | string', default: '400', desc: 'Height of the iframe or loaded content' },
                    { prop: 'acceptLabel', type: 'string', default: '"Accept Cookies"', desc: 'Text for the accept button' },
                    { prop: 'declineLabel', type: 'string', default: '"Decline"', desc: 'Text for the decline button' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="px-4 py-3">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{row.prop}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <code className="text-xs font-mono">{row.type}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <code className="text-xs font-mono">{row.default}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Slots</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Slot</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { slot: 'title', desc: 'Custom markup for the placeholder title (falls back to title property)' },
                    { slot: 'description', desc: 'Custom markup for the placeholder description (falls back to description property)' },
                    { slot: 'actions', desc: 'Custom markup to replace the action buttons block entirely' },
                    { slot: 'accept-label', desc: 'Custom markup for the accept button label (falls back to acceptLabel property)' },
                    { slot: 'decline-label', desc: 'Custom markup for the decline button label (falls back to declineLabel property)' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="px-4 py-3 font-mono text-gray-900">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{row.slot}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">CSS Custom Properties</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Variable</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Default</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prop: '--uibit-consent-guard-primary-color', type: 'color', default: '#000000', desc: 'Primary color used for action buttons and focus indicators' },
                    { prop: '--uibit-consent-guard-primary-hover-bg', type: 'color', default: '#333333', desc: 'Hover background color of primary action button' },
                    { prop: '--uibit-consent-guard-text-color', type: 'color', default: '#1f2937', desc: 'Main text color inside placeholder' },
                    { prop: '--uibit-consent-guard-muted-color', type: 'color', default: '#6b7280', desc: 'Muted text color for description and default icon' },
                    { prop: '--uibit-consent-guard-border-color', type: 'color', default: '#d1d5db', desc: 'Border color for placeholder and secondary button' },
                    { prop: '--uibit-consent-guard-bg', type: 'image | color', default: 'linear-gradient(...)', desc: 'Background gradient/color for placeholder' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="px-4 py-3 font-mono text-gray-900">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{row.prop}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <code className="text-xs font-mono">{row.type}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <code className="text-xs font-mono">{row.default}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">CSS Shadow Parts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Part</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { part: 'placeholder', desc: 'The main placeholder wrapper card' },
                    { part: 'placeholder-image', desc: 'The thumbnail image container' },
                    { part: 'placeholder-content', desc: 'The textual content block containing title and description' },
                    { part: 'placeholder-title', desc: 'The header title element' },
                    { part: 'placeholder-description', desc: 'The paragraph description element' },
                    { part: 'consent-actions', desc: 'The actions wrapper containing buttons' },
                    { part: 'accept-button', desc: 'The primary acceptance button' },
                    { part: 'decline-button', desc: 'The secondary declination button' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="px-4 py-3 font-mono text-gray-900">::part({row.part})</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Events</h3>
            <div className="space-y-3">
              {[
                { event: 'consent-accepted', desc: 'Fired when the user clicks the accept button. Detail contains the title.' },
                { event: 'consent-declined', desc: 'Fired when the user clicks the decline button. Detail contains the title.' },
              ].map((row, i) => (
                <div key={i} className="border border-gray-200 rounded p-4">
                  <code className="font-mono text-sm text-gray-900">{row.event}</code>
                  <p className="text-gray-600 text-sm mt-2">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Usage</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Basic Iframe</h3>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`<uibit-consent-guard
  title="YouTube Video"
  description="This video is hosted on YouTube."
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  content-type="iframe"
  height="400"
></uibit-consent-guard>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Script Example</h3>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`<uibit-consent-guard
  title="Analytics"
  description="Enable analytics to help us improve."
  src="https://cdn.example.com/analytics.js"
  content-type="script"
></uibit-consent-guard>`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">With Event Listeners</h3>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`const guard = document.getElementById('my-guard');

guard.addEventListener('consent-accepted', (e) => {
  console.log('User accepted consent for:', e.detail.title);
  // Track analytics, fire pixel, etc.
});

guard.addEventListener('consent-declined', (e) => {
  console.log('User declined consent for:', e.detail.title);
});`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">React Implementation</h3>
            <pre className="code-block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
              <code>{`import { useEffect, useRef } from 'react';
import '@uibit/consent-guard';

export function EmbeddedForm() {
  const guardRef = useRef(null);

  useEffect(() => {
    const el = guardRef.current;

    const handleAccepted = (e) => {
      console.log('Form consent given');
    };

    el?.addEventListener('consent-accepted', handleAccepted);
    return () => el?.removeEventListener('consent-accepted', handleAccepted);
  }, []);

  return (
    <uibit-consent-guard
      ref={guardRef}
      title="Embedded Form"
      src="https://api.hubspot.com/form"
      content-type="iframe"
      height="600"
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Granular per-asset consent management (not global)',
            'localStorage persistence of user choices',
            'Clean, minimal placeholder UI with optional custom images',
            'Supports both iframes and external scripts',
            'Full keyboard navigation and WCAG accessibility',
            'Custom button labels for localization',
            'Event-based integration for analytics tracking',
            'Zero dependencies — pure Lit web component'
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gray-900 font-semibold mt-0.5">✓</span>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ConsentGuardDocs;
