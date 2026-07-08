import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '@uibit/consent-guard';
import { ApiDocs } from '../components/ApiDocs';
import manifest from '@uibit/consent-guard/custom-elements.json';

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
                placeholder-image="https://picsum.photos/seed/analytics/600/200"
                accept-label="Accept & Load"
                decline-label="Decline"
              ></uibit-consent-guard>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
      <ApiDocs manifest={manifest as any} tagName="uibit-consent-guard" />
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
