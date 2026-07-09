import { useRef } from 'react';
import '@uibit/consent-guard';
import { UsageExample } from '../../../../types/docs';

function ProgrammaticDemo() {
  const guardRef = useRef<any>(null);

  return (
    <div className="space-y-6">
      <uibit-consent-guard ref={guardRef}>
        <div
          slot="placeholder"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            minHeight: '12rem',
            background: '#f9fafb',
            border: '0.0625rem solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            Consent pending — use the buttons below to accept or decline programmatically.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '12rem',
            background: '#f0fdf4',
            border: '0.0625rem solid #bbf7d0',
            borderRadius: '0.5rem',
            color: '#15803d',
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          Content revealed after consent
        </div>
      </uibit-consent-guard>

      <div className="flex gap-3">
        <button
          className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-md cursor-pointer border-none"
          onClick={() => guardRef.current?.accept()}
        >
          accept()
        </button>
        <button
          className="px-5 py-2 bg-white text-gray-700 text-sm font-medium rounded-md cursor-pointer border border-gray-200"
          onClick={() => guardRef.current?.decline()}
        >
          decline()
        </button>
      </div>
    </div>
  );
}

const programmatic: UsageExample = {
  title: 'Programmatic control',
  description: 'Use the accept() and decline() methods to control consent state from JavaScript — useful for restoring a previously stored choice.',
  code: {
    html: `<uibit-consent-guard id="guard">
  <div slot="placeholder">
    <p>Consent pending.</p>
  </div>

  <iframe
    src="https://example.com/embed"
    loading="lazy"
    style="width:100%;height:20rem;border:none;"
  ></iframe>
</uibit-consent-guard>

<script>
  const guard = document.getElementById('guard');

  // Restore a previously stored choice
  const stored = localStorage.getItem('embed-consent');
  if (stored === 'accepted') guard.accept();
  if (stored === 'declined') guard.decline();

  guard.addEventListener('consent-accepted', () => {
    localStorage.setItem('embed-consent', 'accepted');
  });

  guard.addEventListener('consent-declined', () => {
    localStorage.setItem('embed-consent', 'declined');
  });
</script>`,
    react: `import { useRef, useEffect } from 'react';
import '@uibit/consent-guard';

function EmbedWithConsent() {
  const guardRef = useRef(null);

  useEffect(() => {
    const guard = guardRef.current;
    if (!guard) return;

    // Restore a previously stored choice
    const stored = localStorage.getItem('embed-consent');
    if (stored === 'accepted') guard.accept();
    if (stored === 'declined') guard.decline();

    const onAccepted = () => localStorage.setItem('embed-consent', 'accepted');
    const onDeclined = () => localStorage.setItem('embed-consent', 'declined');

    guard.addEventListener('consent-accepted', onAccepted);
    guard.addEventListener('consent-declined', onDeclined);
    return () => {
      guard.removeEventListener('consent-accepted', onAccepted);
      guard.removeEventListener('consent-declined', onDeclined);
    };
  }, []);

  return (
    <uibit-consent-guard ref={guardRef}>
      <div slot="placeholder">
        <p>Consent pending.</p>
      </div>
      <iframe
        src="https://example.com/embed"
        loading="lazy"
        style={{ width: '100%', height: '20rem', border: 'none' }}
      />
    </uibit-consent-guard>
  );
}`,
  },
  Demo: ProgrammaticDemo,
};

export default programmatic;
