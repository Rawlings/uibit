import '@uibit/consent-guard';
import { UsageExample } from '../../../../types/docs';

function YoutubeEmbedDemo() {
  return (
    <uibit-consent-guard>
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
            Accept &amp; play
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
  );
}

const youtubeEmbed: UsageExample = {
  title: 'YouTube embed',
  description: 'Gate a YouTube iframe behind a consent placeholder. Buttons with data-consent-accept and data-consent-decline trigger the component\'s built-in state.',
  code: {
    html: `<uibit-consent-guard>
  <div slot="placeholder" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;min-height:23.75rem;background:#f9fafb;border:0.0625rem solid #e5e7eb;border-radius:0.5rem;padding:2rem;text-align:center;">
    <p style="margin:0 0 0.25rem;font-weight:600;color:#111827;">YouTube video</p>
    <p style="margin:0;font-size:0.875rem;color:#6b7280;max-width:20rem;">
      Loading this video will connect to YouTube and may set cookies on your device.
    </p>
    <div style="display:flex;gap:0.75rem;">
      <button data-consent-accept style="padding:0.5rem 1.25rem;background:#111827;color:#fff;border:none;border-radius:0.375rem;font-size:0.875rem;font-weight:500;cursor:pointer;">
        Accept &amp; play
      </button>
      <button data-consent-decline style="padding:0.5rem 1.25rem;background:#fff;color:#374151;border:0.0625rem solid #e5e7eb;border-radius:0.375rem;font-size:0.875rem;font-weight:500;cursor:pointer;">
        Decline
      </button>
    </div>
  </div>

  <iframe
    src="https://www.youtube-nocookie.com/embed/jNQXAC9IVRw"
    loading="lazy"
    allowfullscreen
    style="width:100%;height:23.75rem;border:none;border-radius:0.5rem;display:block;"
  ></iframe>
</uibit-consent-guard>`,
    react: `import '@uibit/consent-guard';

function YoutubeEmbed() {
  return (
    <uibit-consent-guard>
      <div
        slot="placeholder"
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '1rem', minHeight: '23.75rem',
          background: '#f9fafb', border: '0.0625rem solid #e5e7eb',
          borderRadius: '0.5rem', padding: '2rem', textAlign: 'center',
        }}
      >
        <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: '#111827' }}>YouTube video</p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', maxWidth: '20rem' }}>
          Loading this video will connect to YouTube and may set cookies on your device.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button data-consent-accept style={{ padding: '0.5rem 1.25rem', background: '#111827', color: '#fff', border: 'none', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
            Accept &amp; play
          </button>
          <button data-consent-decline style={{ padding: '0.5rem 1.25rem', background: '#fff', color: '#374151', border: '0.0625rem solid #e5e7eb', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
            Decline
          </button>
        </div>
      </div>
      <iframe
        src="https://www.youtube-nocookie.com/embed/jNQXAC9IVRw"
        loading="lazy"
        allowFullScreen
        style={{ width: '100%', height: '23.75rem', border: 'none', borderRadius: '0.5rem', display: 'block' }}
      />
    </uibit-consent-guard>
  );
}`,
  },
  Demo: YoutubeEmbedDemo,
};

export default youtubeEmbed;
