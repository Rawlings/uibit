import { useEffect, useRef } from 'react';
import '@uibit/consent-guard';
import manifest from '@uibit/consent-guard/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function ConsentGuardDemo() {
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
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Iframe Example
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This example shows a consent guard wrapping an external iframe. Click "Accept Cookies" to
          load the content.
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

      <div className="border-t border-gray-200 pt-12">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Script Placeholder
        </h3>
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
  );
}

const data: ComponentDocData = {
  id: 'consent-guard',
  title: 'Consent Guard',
  description:
    'Asset-level consent wrapper for privacy-invasive third-party scripts and iframes. Instead of a generic cookie banner, wrap specific heavy assets with a clean placeholder and only load them after explicit user consent.',
  packageName: '@uibit/consent-guard',
  tagName: 'uibit-consent-guard',
  manifest,
  Demo: ConsentGuardDemo,
  usages: [
    {
      title: 'Basic Iframe',
      code: `<uibit-consent-guard
  title="YouTube Video"
  description="This video is hosted on YouTube."
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  content-type="iframe"
  height="400"
></uibit-consent-guard>`,
    },
    {
      title: 'Script Example',
      code: `<uibit-consent-guard
  title="Analytics"
  description="Enable analytics to help us improve."
  src="https://cdn.example.com/analytics.js"
  content-type="script"
></uibit-consent-guard>`,
    },
    {
      title: 'With Event Listeners',
      code: `const guard = document.getElementById('my-guard');

guard.addEventListener('consent-accepted', (e) => {
  console.log('User accepted consent for:', e.detail.title);
  // Track analytics, fire pixel, etc.
});

guard.addEventListener('consent-declined', (e) => {
  console.log('User declined consent for:', e.detail.title);
});`,
    },
    {
      title: 'React Implementation',
      code: `import { useEffect, useRef } from 'react';
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
}`,
    },
  ],
  features: [
    'Granular per-asset consent management (not global)',
    'localStorage persistence of user choices',
    'Clean, minimal placeholder UI with optional custom images',
    'Supports both iframes and external scripts',
    'Full keyboard navigation and WCAG accessibility',
    'Custom button labels for localization',
    'Event-based integration for analytics tracking',
    'Zero dependencies — pure Lit web component',
  ],
};

export default data;
