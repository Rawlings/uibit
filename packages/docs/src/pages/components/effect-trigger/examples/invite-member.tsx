import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function InviteMemberDemo() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      const trigger = document.getElementById('invite-member-trigger') as any;
      if (trigger) trigger.ignite();
    }, 1000);
  };

  const handleParticleCreate = (e: any) => {
    const clone = e.detail.particle;
    clone.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" class="bg-white rounded-full p-0.5 border border-gray-200">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    `;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-sm mx-auto shadow-sm relative">
      <uibit-effect-trigger
        id="invite-member-trigger"
        trigger="custom"
        behavior="ambient-drift"
        density={4}
        stagger="120ms"
        velocity="1.8s"
        randomize
        onUibitParticleCreate={handleParticleCreate}
      >
        <div slot="trigger" style={{ display: 'none' }}></div>
        <span slot="asset"></span>
      </uibit-effect-trigger>

      <h4 className="text-sm font-bold text-gray-900 mb-1">Invite Collaborators</h4>
      <p className="text-xs text-gray-500 mb-6">Add members to start workspace collaboration.</p>

      {status === 'sent' ? (
        <div className="text-center py-4">
          <div className="text-xs font-semibold text-gray-900 mb-1">Invitations dispatched</div>
          <p className="text-xs text-gray-500">Links have been sent to team members.</p>
          <button
            onClick={() => {
              setStatus('idle');
              setEmail('');
            }}
            className="mt-4 text-xs font-semibold text-gray-400 hover:text-black transition-colors"
          >
            Add More
          </button>
        </div>
      ) : (
        <form onSubmit={handleSend} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'sending'}
            placeholder="member@workspace.com"
            className="w-full text-xs border border-gray-200 rounded p-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
            required
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium text-xs py-2 px-4 rounded transition-colors focus:outline-none"
          >
            {status === 'sending' ? 'Sending invites...' : 'Send Invitations'}
          </button>
        </form>
      )}
    </div>
  );
}

const inviteMemberExample: UsageExample = {
  title: 'Workspace Member Invite',
  description:
    'Launches a staggered stream of team member profile vector shapes gently rising and dispersing when email invitations are sent.',
  code: {
    html: `<uibit-effect-trigger trigger="custom" behavior="ambient-drift" density="4" stagger="120ms">
  <button slot="trigger" style="display:none"></button>
</uibit-effect-trigger>`,
    react: '',
  },
  Demo: InviteMemberDemo,
};

export default inviteMemberExample;
