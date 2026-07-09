import { useRef } from 'react';
import '@uibit/consent-guard';
import manifest from '@uibit/consent-guard/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

function ConsentGuardDemo() {
  const youtubeRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          YouTube Embed
        </h3>
        <uibit-consent-guard ref={youtubeRef}>
          <div
            slot="placeholder"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              minHeight: '23.75rem',
              background: '#f9fafb',
              border: '0.0625rem solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
            <div>
              <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: '#111827' }}>YouTube video</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', maxWidth: '20rem' }}>
                Loading this video will connect to YouTube and may set cookies on your device.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                data-consent-accept
                style={{
                  padding: '0.5rem 1.25rem',
                  background: '#111827',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Accept & play
              </button>
              <button
                data-consent-decline
                style={{
                  padding: '0.5rem 1.25rem',
                  background: '#fff',
                  color: '#374151',
                  border: '0.0625rem solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Decline
              </button>
            </div>
          </div>
          <iframe
            src="https://www.youtube-nocookie.com/embed/jNQXAC9IVRw"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '23.75rem', border: 'none', borderRadius: '0.5rem', display: 'block' }}
          />
        </uibit-consent-guard>
      </div>

      <div className="border-t border-gray-200 pt-12">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          OpenStreetMap Embed
        </h3>
        <uibit-consent-guard ref={mapRef}>
          <div
            slot="placeholder"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              minHeight: '20rem',
              background: '#f9fafb',
              border: '0.0625rem solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <circle cx="12" cy="10" r="3"/>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
            <div>
              <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: '#111827' }}>Interactive map</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', maxWidth: '20rem' }}>
                This map is served by OpenStreetMap. Loading it may set cookies and log your IP address.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                data-consent-accept
                style={{
                  padding: '0.5rem 1.25rem',
                  background: '#111827',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Load map
              </button>
              <button
                data-consent-decline
                style={{
                  padding: '0.5rem 1.25rem',
                  background: '#fff',
                  color: '#374151',
                  border: '0.0625rem solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Decline
              </button>
            </div>
          </div>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1276%2C51.5074%2C-0.1176%2C51.5124&layer=mapnik"
            loading="lazy"
            style={{ width: '100%', height: '20rem', border: 'none', borderRadius: '0.5rem', display: 'block' }}
          />
        </uibit-consent-guard>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'consent-guard',
  title: 'Consent Guard',
  description:
    'Gate any third-party content behind a consent prompt. The component manages show/hide state only — you provide both the placeholder UI and the content, keeping it composable and unbiased.',
  packageName: '@uibit/consent-guard',
  tagName: 'uibit-consent-guard',
  manifest,
  Demo: ConsentGuardDemo,
  usages: [
    {
      title: 'YouTube embed',
      code: `<uibit-consent-guard>
  <div slot="placeholder">
    <p>Loading this video connects to YouTube and may set cookies.</p>
    <button data-consent-accept>Accept & play</button>
    <button data-consent-decline>Decline</button>
  </div>

  <iframe
    src="https://www.youtube-nocookie.com/embed/jNQXAC9IVRw"
    loading="lazy"
    allowfullscreen
    style="width:100%;height:380px;border:none;"
  ></iframe>
</uibit-consent-guard>`,
    },
    {
      title: 'Generic iframe',
      code: `<uibit-consent-guard>
  <div slot="placeholder">
    <p>This content is served by a third party.</p>
    <button data-consent-accept>Accept</button>
    <button data-consent-decline>Decline</button>
  </div>

  <iframe
    src="https://example.com/embed"
    loading="lazy"
    style="width:100%;height:400px;border:none;"
  ></iframe>
</uibit-consent-guard>`,
    },
    {
      title: 'Programmatic consent (e.g. restore from localStorage)',
      code: `const guard = document.querySelector('uibit-consent-guard');

// Restore a previously stored choice
if (localStorage.getItem('youtube-consent') === 'accepted') {
  guard.accept();
}

guard.addEventListener('consent-accepted', () => {
  localStorage.setItem('youtube-consent', 'accepted');
});

guard.addEventListener('consent-declined', () => {
  localStorage.setItem('youtube-consent', 'declined');
});`,
    },
  ],
  features: [
    'Two slots: placeholder (your prompt UI) and default (your content)',
    'Content stays display:none until consent — iframes with loading="lazy" won\'t make network requests',
    'Trigger consent via data-consent-accept / data-consent-decline attributes on any element',
    'Public accept() and decline() methods for programmatic control',
    'No opinions on styling, copy, storage, or content type',
    'Zero dependencies — pure Lit web component',
  ],
};

export default data;
