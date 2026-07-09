import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function NewsletterSignupDemo() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleParticleCreate = (e: any) => {
    const clone = e.detail.particle;
    const width = 6 + Math.random() * 8;
    const height = 4 + Math.random() * 6;
    const colors = ['#000000', '#4b5563', '#9ca3af', '#e5e7eb'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.background = randomColor;
    clone.style.borderRadius = '1px';
    clone.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      const trigger = document.getElementById('newsletter-confetti-trigger') as any;
      if (trigger) trigger.ignite();
    }, 600);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-sm mx-auto shadow-sm relative">
      <uibit-effect-trigger
        id="newsletter-confetti-trigger"
        trigger="custom"
        behavior="fountain-burst"
        density={24}
        stagger="15ms"
        velocity="1.8s"
        randomize
        onUibitParticleCreate={handleParticleCreate}
      >
        <div slot="trigger" style={{ display: 'none' }}></div>
        <span slot="asset"></span>
      </uibit-effect-trigger>

      <h4 className="text-sm font-bold text-gray-900 mb-1">Weekly Design Digest</h4>
      <p className="text-xs text-gray-500 mb-6">Clean ideas, tools, and updates from our team.</p>

      {status === 'success' ? (
        <div className="text-center py-4">
          <div className="text-xs font-semibold text-gray-900 mb-1">Thank you for subscribing!</div>
          <p className="text-xs text-gray-500">We've added you to our mailing list.</p>
          <button
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
    'Fires a burst of tiny, floating minimalist paper confetti strips when a subscription form successfully submits. Demonstrates programmatic trigger igniting.',
  code: {
    html: `<uibit-effect-trigger id="confetti" trigger="custom" behavior="fountain-burst" density="24">
  <button slot="trigger" style="display:none"></button>
</uibit-effect-trigger>`,
    react: '',
  },
  Demo: NewsletterSignupDemo,
};

export default newsletterSignupExample;
