import type React from 'react';
import { useState } from 'react';
import '@uibit/effect-trigger';
import type { UsageExample } from '../../../../types/docs';

function NewsletterSignupDemo() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle',
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      const trigger = document.getElementById(
        'newsletter-confetti-trigger',
      ) as any;
      if (trigger) trigger.ignite();
    }, 600);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-sm mx-auto shadow-sm relative">
      <uibit-effect-trigger
        id="newsletter-confetti-trigger"
        trigger="custom"
        behavior="fountain-burst"
        density={14}
        stagger="18ms"
        velocity="1.5s"
        randomize
      >
        <div slot="trigger" style={{ display: 'none' }}></div>
        <span slot="asset">
          <svg
            aria-hidden="true"
            viewBox="0 0 6 6"
            width="5"
            height="5"
            fill="#111827"
            style={{ display: 'block' }}
          >
            <circle cx="3" cy="3" r="3" />
          </svg>
        </span>
      </uibit-effect-trigger>

      <h4 className="text-sm font-bold text-gray-900 mb-1">
        Weekly Design Digest
      </h4>
      <p className="text-xs text-gray-500 mb-6">
        Clean ideas, tools, and updates from our team.
      </p>

      {status === 'success' ? (
        <div className="text-center py-4">
          <div className="text-xs font-semibold text-gray-900 mb-1">
            Thank you for subscribing!
          </div>
          <p className="text-xs text-gray-500">
            We've added you to our mailing list.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setEmail('');
            }}
            className="mt-4 text-xs font-semibold text-gray-400 hover:text-black transition-colors"
          >
            Reset Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            placeholder="Enter your email (optional)"
            className="w-full text-xs border border-gray-200 rounded p-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium text-xs py-2.5 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}

const newsletterSignupExample: UsageExample = {
  title: 'Newsletter Signup Success',
  description:
    'Fires a burst of tiny dot particles when a subscription form successfully submits. Demonstrates programmatic trigger igniting.',
  Demo: NewsletterSignupDemo,
};

export default newsletterSignupExample;
