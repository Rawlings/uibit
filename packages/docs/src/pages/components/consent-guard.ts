import manifest from '@uibit/consent-guard/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'consent-guard',
  title: 'Consent Guard',
  description:
    'Asset-level consent wrapper for privacy-invasive third-party scripts and iframes. Instead of a generic cookie banner, wrap specific heavy assets with a clean placeholder and only load them after explicit user consent.',
  packageName: '@uibit/consent-guard',
  tagName: 'uibit-consent-guard',
  manifest,
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
